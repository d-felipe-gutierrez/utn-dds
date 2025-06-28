import React from 'react';
import moment from 'moment';

function ContactosListado({ contactos, onConsultar, onModificar, onEliminar }) {
    const formatMoneda = (x) => `$${parseFloat(x).toFixed(2)}`;

    return (
        <div className='table-responsive'>
            <table className='table table-striped table-bordered table-hover'>
                <thead className='table-dark text-center'>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Fecha de nacimiento</th>
                        <th>Teléfono</th>
                        <th>Id categoria</th>
                        <th>Importe contribución</th>
                    </tr>
                </thead>
                <tbody>
                    {contactos && contactos.length > 0 ? (
                        <>
                            {contactos.map(contacto => (
                                <tr key={contacto.IdContacto}>
                                    <th>{contacto.Nombre}</th>
                                    <td>{moment(contacto.FechaNacimiento).format('DD/MM/YYYY')}</td>
                                    <th>{contacto.Telefono}</th>
                                    <th>{contacto.IdCategoria}</th>
                                    <td className="text-end">{formatMoneda(contacto.ImporteContribucion)}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => onConsultar(contacto)}>Ver</button>
                                        <button className="btn btn-sm btn-outline-warning me-1" onClick={() => onModificar(contacto)}>Editar</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(contacto.IdContacto)}>Borrar</button>
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td>No hay elementos</td>
                        </tr>
                    )
                    }

                </tbody>
            </table>
        </div>
    )
};

export { ContactosListado };