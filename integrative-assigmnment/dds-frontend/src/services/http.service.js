import axios from "axios";
import modalService from "./modalDialog.service";

const httpService = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

httpService.interceptors.request.use(
  (request) => {
    modalService.BloquearPantalla(true);
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = "Bearer " + accessToken;
    }
    return request;
  },
  (error) => {
    console.log("error en axios request", error);
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  (response) => {
    modalService.BloquearPantalla(false);
    return response;
  },
  async (error) => {
    console.log("error en axios response ", error);
    modalService.BloquearPantalla(false);

    // Detectar error 401 (token expirado)
    if (error.response && error.response.status === 401) {
      try {
        // Llamar al backend para refrescar token (ejemplo, puede cambiar según tu backend)
        const refreshToken = sessionStorage.getItem("refreshToken");
        const resp = await axios.post(
          "https://tu-api.com/api/auth/refresh-token",
          { refreshToken }
        );

        const nuevoAccessToken = resp.data.accessToken;
        sessionStorage.setItem("accessToken", nuevoAccessToken);

        // Reintentar la petición original con el nuevo token
        error.config.headers["Authorization"] = "Bearer " + nuevoAccessToken;
        return httpService.request(error.config);
      } catch (refreshError) {
        console.error("Error al refrescar el token:", refreshError);
        modalService.Alert(
          "Sesión expirada, por favor vuelva a iniciar sesión."
        );
        sessionStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    } else if (error.response && error.response.status === 403) {
      error.message = "Usuario no autorizado para acceder a esta funcionalidad";
    } else {
      error.message =
        error?.response?.data?.message ??
        "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde";
    }

    modalService.Alert(error.message);
    return Promise.reject(error);
  }
);

export default httpService;
