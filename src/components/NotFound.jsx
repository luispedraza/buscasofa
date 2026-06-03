import React from 'react'
import { useLocation } from 'react-router-dom'

export const NotFound = () => {
  const location = useLocation();

  return (
    <div>
        <h1>404 - Not Found</h1>

        <p>No hemos encontrado la página que buscas</p>

        <p>No existe la página: {location.pathname}</p>
    </div>
  )
}
