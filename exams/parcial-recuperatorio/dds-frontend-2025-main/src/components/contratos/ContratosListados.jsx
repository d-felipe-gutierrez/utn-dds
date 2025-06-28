import PropTypes from 'prop-types';

function formatearFecha(fecha) {
  const f = new Date(fecha);
  return f.toLocaleDateString('es-AR');
}

function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(valor);
}

function ContratosListado({ contratos }) {
  return (
    <div>
      <table className="table table-bordered table-striped mt-4">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre Contrato</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Importe Mensual</th>
            <th>Teléfono Contacto</th>
          </tr>
        </thead>
        <tbody>
          {contratos.length > 0 ? (
            contratos.map((c) => (
              <tr key={c.IdContrato}>
                <td>{c.IdContrato}</td>
                <td>{c.NombreContrato}</td>
                <td>{formatearFecha(c.FechaInicio)}</td>
                <td>{formatearFecha(c.FechaFin)}</td>
                <td>{formatearMoneda(c.ImporteMensual)}</td>
                <td>{c.TelefonoContacto}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">No se encontraron contratos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

ContratosListado.propTypes = {
  contratos: PropTypes.arrayOf(
    PropTypes.shape({
      IdContrato: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      NombreContrato: PropTypes.string.isRequired,
      FechaInicio: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      FechaFin: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      ImporteMensual: PropTypes.number.isRequired,
      TelefonoContacto: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export { ContratosListado };