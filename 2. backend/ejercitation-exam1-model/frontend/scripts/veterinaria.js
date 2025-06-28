document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/api/pacientes";
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");
  const form = document.getElementById("pacienteForm");
  const nombreMascotaInput = document.getElementById("nombreMascota");
  const propietarioInput = document.getElementById("propietario");
  const telefonoInput = document.getElementById("telefono");
  const pacienteIdInput = document.getElementById("pacienteId");
  const submitButton = document.getElementById("guardarPaciente");

  async function fetchPacientes(propietario = "") {
    let url = API_URL;
    if (propietario) {
      url += `?propietario=${encodeURIComponent(propietario)}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener datos del servidor");
      const pacientes = await response.json();

      const patientsTableBody = document.getElementById("patientsTableBody");
      patientsTableBody.innerHTML = "";

      if (pacientes.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="6" class="text-center text-muted">No se encontraron pacientes.</td>`;
        patientsTableBody.appendChild(row);
        return;
      }

      pacientes.forEach((paciente) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${paciente.IdPaciente}</td>
          <td>${paciente.NombreMascota}</td>
          <td>${paciente.Propietario}</td>
          <td>${paciente.Telefono}</td>
          <td>
            <button class="btn btn-primary btn-sm editar-btn" data-id="${paciente.IdPaciente}" data-nombre="${paciente.NombreMascota}" data-propietario="${paciente.Propietario}" data-telefono="${paciente.Telefono}">Editar</button>
            <button class="btn btn-danger btn-sm eliminar-btn" data-id="${paciente.IdPaciente}">Eliminar</button>
          </td>`;
        patientsTableBody.appendChild(row);
      });

      document.querySelectorAll(".eliminar-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;
          if (confirm("¿Deseás eliminar este paciente?")) {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (res.ok) {
              alert("Paciente eliminado");
              fetchPacientes();
            } else {
              alert("Error al eliminar paciente");
            }
          }
        });
      });

      document.querySelectorAll(".editar-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          pacienteIdInput.value = btn.dataset.id;
          nombreMascotaInput.value = btn.dataset.nombre;
          propietarioInput.value = btn.dataset.propietario;
          telefonoInput.value = btn.dataset.telefono;
          submitButton.textContent = "Guardar Cambios";
        });
      });
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar los pacientes.");
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = pacienteIdInput.value.trim();
    const paciente = {
      NombreMascota: nombreMascotaInput.value.trim(),
      Propietario: propietarioInput.value.trim(),
      Telefono: telefonoInput.value.trim(),
    };

    const url = id ? `${API_URL}/${id}` : API_URL;
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente),
      });

      if (!res.ok) throw new Error("Error al guardar cambios");

      alert(id ? "Paciente modificado" : "Paciente agregado");
      form.reset();
      pacienteIdInput.value = "";
      submitButton.textContent = "Agregar Paciente";
      fetchPacientes();
    } catch (error) {
      console.error("Error al guardar paciente:", error);
      alert("Error al guardar paciente");
    }
  });

  searchButton.addEventListener("click", () => {
    const buscarPaciente = searchInput.value.trim();
    fetchPacientes(buscarPaciente);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchButton.click();
  });

  fetchPacientes();
});
