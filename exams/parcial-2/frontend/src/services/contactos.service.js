// src/api/contactoService.js
import axios from 'axios';
const URL = 'http://localhost:3000/api/contactos';

export const listarContactos = () => axios.get(URL);
export const obtenerContacto = (id) => axios.get(`${URL}/${id}`);
export const crearContacto = (c) => axios.post(URL, c);
export const actualizarContacto = (id, c) => axios.put(`${URL}/${id}`, c);
export const eliminarContacto = (id) => axios.delete(`${URL}/${id}`);
