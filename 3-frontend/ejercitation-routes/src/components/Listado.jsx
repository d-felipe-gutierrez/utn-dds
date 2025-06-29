import React from 'react';
import { Link } from 'react-router-dom';

const listado = [
  { id: 1, descripcion: 'Televisor LG', categoria: 'Electrodomésticos', precio: 599.99 },
  { id: 2, descripcion: 'Lavadora Samsung', categoria: 'Línea blanca', precio: 399.99 },
  { id: 3, descripcion: 'Frigorífico Bosch', categoria: 'Electrodomésticos', precio: 899.99 },
  { id: 4, descripcion: 'Robot de cocina Moulinex', categoria: 'Electrodomésticos', precio: 199.99 },
  { id: 5, descripcion: 'Cafetera Nespresso', categoria: 'Electrodomésticos', precio: 99.99 },
  { id: 6, descripcion: 'Batidora Philips', categoria: 'Electrodomésticos', precio: 49.99 },
  { id: 7, descripcion: 'Horno Teka', categoria: 'Electrodomésticos', precio: 599.99 },
  { id: 8, descripcion: 'Aspiradora Dyson', categoria: 'Electrodomésticos', precio: 349.99 },
  { id: 9, descripcion: 'Plancha de vapor Rowenta', categoria: 'Electrodomésticos', precio: 69.99 },
  { id: 10, descripcion: 'Aire acondicionado LG', categoria: 'Electrodomésticos', precio: 899.99 },
  { id: 11, descripcion: 'Secadora Siemens', categoria: 'Línea blanca', precio: 499.99 },
  { id: 12, descripcion: 'Máquina de hielo Klarstein', categoria: 'Electrodomésticos', precio: 179.99 },
  { id: 13, descripcion: 'Microondas Panasonic', categoria: 'Electrodomésticos', precio: 129.99 },
  { id: 14, descripcion: 'Lavavajillas Whirlpool', categoria: 'Línea blanca', precio: 599.99 },
  { id: 15, descripcion: 'Placa de inducción Balay', categoria: 'Electrodomésticos', precio: 349.99 },
  { id: 16, descripcion: 'Exprimidor Taurus', categoria: 'Electrodomésticos', precio: 24.99 },
  { id: 17, descripcion: 'Robot aspirador Xiaomi', categoria: 'Electrodomésticos', precio: 299.99 },
  { id: 18, descripcion: 'Cocina de gas Cata', categoria: 'Electrodomésticos', precio: 399.99 },
  { id: 19, descripcion: 'Hervidor Russell Hobbs', categoria: 'Electrodomésticos', precio: 34.99 },
  { id: 20, descripcion: 'Freidora sin aceite Aigostar', categoria: 'Electrodomésticos', precio: 69.99 },
  { id: 21, descripcion: 'Tostadora Moulinex', categoria: 'Electrodomésticos', precio: 29.99 }
  ];


function Listado(){
    return (
        <div>
            <h2>Listado de productos</h2>
            <ul>
                {listado.map(producto => (
                    <li key={producto.id.toString()}>
                        <Link to={`/producto/${producto.id}`}>{producto.descripcion}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Listado;