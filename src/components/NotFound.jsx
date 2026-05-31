import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound(){
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Página no encontrada</h2>
            <p className="not-found-text">No hemos encontrado la página que buscas</p>

            <Link to="/" className="not-found-link">
                Volver al inicio
            </Link>
        </div>
        );
    }