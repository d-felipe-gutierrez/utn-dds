import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to='/'>Inicio</Link> || <Link to='/listado'>Listado de prodcutos</Link>
        </nav>
    );
}

export default Navbar;