import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { contratosService } from '../../services/contratos.service';

function ContratosRegistro({ onGuardar, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const enviar = async (data) => {
    try {
      await contratosService.Grabar(data);
      alert('Contrato agregado correctamente');
      reset();
      if (typeof onGuardar === 'function') onGuardar();
      if (typeof onCancel === 'function') onCancel();
    } catch (error) {
      console.error('Error al guardar el contrato:', error);
      alert('Error al guardar el contrato');
    }
  };

  return (
    <form className="card card-body mb-4" onSubmit={handleSubmit(enviar)}>
      <h4>Nuevo Contrato</h4>

      <div className="mb-3">
        <label>Nombre del Contrato</label>
        <input
          type="text"
          className="form-control"
          {...register('NombreContrato', { required: true, minLength: 5, maxLength: 70 })}
        />
        {errors.NombreContrato && <small className="text-danger">Debe tener entre 5 y 70 caracteres.</small>}
      </div>

      <div className="mb-3">
        <label>Fecha de Inicio</label>
        <input type="date" className="form-control" {...register('FechaInicio', { required: true })} />
        {errors.FechaInicio && <small className="text-danger">Este campo es obligatorio.</small>}
      </div>

      <div className="mb-3">
        <label>Fecha de Fin</label>
        <input type="date" className="form-control" {...register('FechaFin', { required: true })} />
        {errors.FechaFin && <small className="text-danger">Este campo es obligatorio.</small>}
      </div>

      <div className="mb-3">
        <label>Importe Mensual</label>
        <input
          type="number"
          className="form-control"
          {...register('ImporteMensual', { required: 'Este campo es obligatorio.', min: { value: 0, message: 'Debe ser un número mayor o igual a 0.' }, valueAsNumber: true })}
        />
        {errors.ImporteMensual && <small className="text-danger">{errors.ImporteMensual.message || 'Debe ser un número válido.'}</small>}
      </div>

      <div className="mb-3">
        <label>Teléfono de Contacto</label>
        <input type="text" className="form-control" {...register('TelefonoContacto', { required: 'Este campo es obligatorio.' })} />
        {errors.TelefonoContacto && <small className="text-danger">{errors.TelefonoContacto.message}</small>}
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={(e) => {
            e.preventDefault();
            if (typeof onCancel === 'function') onCancel();
            reset();
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

ContratosRegistro.propTypes = {
  onGuardar: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export { ContratosRegistro };
