import React from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'

const Profile = ({ user }) => {
    const storedUser = user || localStorage.getItem('user')

    if (!storedUser) {
        return (
            <div className="profile-container">
                <h1>Mi Perfil</h1>
                <p id="no-session">No has iniciado sesión.</p>
                <Link to="/login" id="login-link">Iniciar sesión</Link>
            </div>
        )
    }

    return (
        <div className="profile-container">
            <h1>Mi Perfil</h1>
            <div id="user-info">
                <p id="username">Usuario: <strong>{storedUser}</strong></p>
                <p id="status">Sesión activa</p>
            </div>
            <Link to="/" id="home-link">Volver al inicio</Link>
        </div>
    )
}

export default Profile
