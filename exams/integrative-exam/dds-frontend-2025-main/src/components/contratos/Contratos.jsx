import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { contratosService } from "../../services/contratos.service";
import { ContratosListado } from "./ContratosListados";
import { ContratosRegistro } from "./ContratosRegistro";

function Contratos() {
  const tituloPagina = "Gestión de Contratos";
  const [contratos, setContratos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const { register, handleSubmit } = useForm();

  // 🟡 Al montar el componente, buscar todos los contratos
  useEffect(() => {
    BuscarContratos();
  }, []);

  async function BuscarContratos(filtros = {}) {
    try {
      const data = await contratosService.Buscar(filtros.NombreContrato || "");
      setContratos(data);
    } catch (error) {
      console.error("Error al buscar contratos:", error);
    }
  }

  async function onSubmit(data) {
    await BuscarContratos(data);
  }

  function MostrarFormularioNuevo() {
    setMostrarFormulario(true);
  }

  function OcultarFormulario() {
    setMostrarFormulario(false);
    BuscarContratos(); // refresca la tabla al cerrar el formulario
  }

  return (
    <div>
      <h2 className="mb-4">{tituloPagina}</h2>

      {/* Formulario de búsqueda */}
      <form className="mb-4 row" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-6">
          <input
            type="text"
            {...register("NombreContrato")}
            placeholder="Buscar por nombre de contrato"
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary me-2 w-100">
            Buscar
          </button>
        </div>
        <div className="col-md-3">
          <button
            type="button"
            onClick={MostrarFormularioNuevo}
            className="btn btn-success w-100"
          >
            Agregar Contrato
          </button>
        </div>
      </form>

      {/* Formulario de Alta */}
      {mostrarFormulario && (
        <ContratosRegistro onContratoAgregado={OcultarFormulario} />
      )}

      {/* Listado */}
      <ContratosListado contratos={contratos} />
    </div>
  );
}

export { Contratos };
