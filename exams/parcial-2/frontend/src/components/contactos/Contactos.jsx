import React, {useState} from 'react';
import { ContactosBuscar } from './ContactosBuscar';
import { ContactosListado } from './ContactosListado';
import { listarContactos, eliminarContacto } from '../../services/contactos.service';

function Contactos() {
    const [contactos, setContactos] = useState([]);

    const buscar = (nombre) => {
    listarContactos()
        .then(resp => {
            const lista = resp.data.filter(c =>
            c.Nombre.toLowerCase().includes(nombre.trim().toLowerCase())
            );
        setContactos(lista);
        })
        .catch(err => alert('Error al buscar'));
  };

    const agregar = () => alert('Mostrar formulario de alta');
    const consultar = (c) => alert(`Ver contacto ${c.IdContacto}`);
    const modificar = (c) => alert(`Modificar contacto ${c.IdContacto}`);
    const eliminar = (id) => {
        if (!window.confirm('¿Confirma baja?')) return;
        eliminarContacto(id)
            .then(() => setContactos(contactos.filter(c => c.IdContacto !== id)))
            .catch(() => alert('Error al eliminar'));
    };

    return (
        <div className="container my-4">
            <h1>Gestión de Contactos</h1>
            <ContactosBuscar onBuscar={buscar} onAgregar={agregar} />
            <ContactosListado
                contactos={contactos}
                onConsultar={consultar}
                onModificar={modificar}
                onEliminar={eliminar}
            />
        </div>
    );
}

export { Contactos };