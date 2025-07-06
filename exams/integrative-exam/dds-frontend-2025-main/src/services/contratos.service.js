import httpService from "./http.service";

// URL base del recurso contratos (ajustá si usás otro backend)
const urlResource = "http://localhost:3000/api/contratos";

// Buscar contratos (con o sin filtro por NombreContrato)
async function Buscar(NombreContrato = "") {
  const params = {};
  if (NombreContrato) params.NombreContrato = NombreContrato;
  const resp = await httpService.get(urlResource, { params });
  return resp.data;
}

// Insertar nuevo contrato
async function Grabar(contrato) {
  // No hay edición en esta versión, solo alta (POST)
  await httpService.post(urlResource, contrato);
}

export const contratosService = {
  Buscar,
  Grabar,
};
