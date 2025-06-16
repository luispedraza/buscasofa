import { useEffect, useState } from 'react';
import './Comments.css';
import { userStore } from '@/store';


interface IComments {
  id: number,
  username: string,
  created_at: string,
  comment: string
}
function Comments({ stationId, user }) {
  const [comments, setComments] = useState<IComments[] | undefined>();
  const [comment, setComment] = useState('');
  const [msg, setMsg] = useState('');

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:4000/api/comments/${stationId}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [stationId]);

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:4000/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, station_id: stationId, comment })
    });
    const data = await res.json();
    if (res.ok) {
      setComment('');
      setMsg('¡Comentario enviado!');
      fetchComments();
    } else {
      setMsg(data.message);
    }
  };

  const onDelete = async (idComment: number) => {
    setMsg('');
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:4000/api/comments/${idComment}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, commentId: idComment })
    });
    const data = await res.json();
    if (res.ok) {
      setComment('');
      setMsg('¡Comentario eliminado!');
      fetchComments();
    } else {
      setMsg(data.message);
    }
  }


  return (
    <div className="comments-section">
      <h3>Comentarios de los usuarios</h3>
      {
        !user && (
          <p>Inicia sesión para dejar un comentario.</p>
        )
      }
      {user && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Escribe tu comentario..."
            required
          />
          <button type="submit">Enviar</button>
        </form>
      )}
      {msg && <p>{msg}</p>}
      <ul className="comments-list">
        {comments?.map((c, idx) => (
          <li key={idx}>
            <strong>{c.username}</strong> <em>({new Date(c.created_at).toLocaleString()})</em>
            <div className='flex items-center'>
              <p className='grow'>{c.comment}</p>
              {userStore.value?.role == "admin" && <img src="https://www.iconpacks.net/icons/1/free-trash-icon-347-thumb.png" alt="" onClick={() => onDelete(c.id)} className='w-5 h-5 cursor-pointer' />}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;