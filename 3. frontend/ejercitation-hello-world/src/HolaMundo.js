import React from 'react';

function HolaMundo(props) {

    return (
        <h1>{props.mensaje}</h1>
    );
}

HolaMundo.defaultProps = {
  mensaje: 'HOLA MUNDO - Desarrollo de Software en la UTN-FRC con ReactJS'
};

export default HolaMundo;