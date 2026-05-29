import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
  <div className="notfound-container">
    <h1>No hemos encontrado la página que buscas</h1>
    <p>La ruta a la que intentas acceder no existe.</p>
    <Link to="/">Volver al inicio</Link>
  </div>
);

export default NotFound;
