import React, {useState} from 'react';

function ContactosBuscar({ onBuscar, onAgregar}) {
    const [nombre, setNombre] = useState('');
    
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        onBuscar(nombre);
    }
    
    return (
        <form className='d-flex mb-3' onSubmit={handleSubmit}>
            <div className='input-group'>
                <input 
                type='text'
                className='form-control me-2'
                placeholder='Ingrese un nombre'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
                <button type='submit' className='btn btn-primary me-2'>
                    Buscar
                </button>
                <button type="button" onClick={onAgregar} className="btn btn-success">
                    Agregar
                </button>
            </div>
        </form>
    );
}

export  { ContactosBuscar };