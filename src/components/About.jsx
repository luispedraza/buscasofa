import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>Acerca de nosotros</h1>
            <h2>Esto es la entrega de la actividad grupal de Ingeniería del Software Avanzada</h2>

            <div className="emoji-list">
                <h3>Así nos hemos sentido durante el desarrollo:</h3>
                <ul>
                    <li>😵</li>
                    <li>😤</li>
                </ul>
            </div>

            <div className="feedback-form">
                <label htmlFor="opinion">¿Qué te ha parecido?</label>
                <input type="text" id="opinion" placeholder="Escribe aquí tu opinión" />
            </div>

            <div id="info">
                Somos el equipo nº 3
            </div>
        </div>
    );
};

export default About;
