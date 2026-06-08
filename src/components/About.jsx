import React from 'react'
import './About.css'

const members = [
    { name: 'Yaiza Fontanet Rubiño', contribution: 'Primeras pruebas de la aplicación' },
    { name: 'Alexander Humberto Acosta Chirinos', contribution: 'Prueba de selección' },
    { name: 'Enrique Madruga Ricardo', contribution: 'Prueba de la sección About' },
    { name: 'Alberto Sanchez Ruiz', contribution: 'Documentación del proyecto' },
]

const About = () => {
    return (
        <div className="about-container">
            <h1>Acerca de nosotros</h1>
            <div id="info">Somos el equipo nº 6</div>
            <ul id="members">
                {members.map((member, i) => (
                    <li key={i}>
                        <strong>{member.name}</strong>: {member.contribution}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default About