import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function UserProfile({ onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState('');

  // Guard: sin token no hay sesión activa, redirigimos al login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (onLogout) onLogout();
    navigate('/');
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres borrar tu cuenta? Esta acción es irreversible.')) return;
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:4000/api/account', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (onLogout) onLogout();
      navigate('/');
    } else {
      const data = await res.json();
      setMsg(data.message || 'No se pudo borrar la cuenta');
    }
  };

  if (!user) return null; // mientras carga o redirige

  return (
    <div className="profile">
      <h2>Mi perfil</h2>
      <p data-cy="perfil-username">Usuario: {user.username}</p>
      <p data-cy="perfil-email">Email: {user.email}</p>
      <button data-cy="perfil-logout" onClick={handleLogout}>Cerrar sesión</button>
      <button data-cy="perfil-delete" onClick={handleDelete}>Borrar cuenta</button>
      {msg && <p data-cy="perfil-msg">{msg}</p>}
    </div>
  );
}

export default UserProfile;
