// src/Confirmacion.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';


function Confirmacion() {
  const location = useLocation();
  // Aquí recibimos el objeto que enviamos en navigate(..., {state: ...})
  const datos = location.state || {};

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '1rem' }}>
      <h2>Confirmación de envío</h2>
      {datos.status === 'ok' ? (
        <>
          <p><strong>Servidor respondió:</strong></p>
          <pre>{JSON.stringify(datos, null, 2)}</pre>
        </>
      ) : (
        <p>No se encontró data de confirmación.</p>
      )}

      <Link to="/" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Volver al formulario
      </Link>
    </div>
  );
}

export default Confirmacion;
