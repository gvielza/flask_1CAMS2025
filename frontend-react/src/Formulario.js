// src/Formulario.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Formulario() {
  const navigate = useNavigate();
  const [dni, setDni] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasenna, setContrasenna] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    // Construyo el payload
    const payload = { dni, usuario, contrasenna };

    try {
      const respuesta = await fetch('http://127.0.0.1:5000/api/enviar-datos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!respuesta.ok) {
        const texto = await respuesta.text();
        throw new Error(`Error del servidor: ${texto || respuesta.status}`);
      }

      const datosRespuesta = await respuesta.json();
      setCargando(false);

      // Paso los datos de respuesta a la página de confirmación via estado
      navigate('/confirmacion', { state: datosRespuesta });

    } catch (err) {
      setCargando(false);
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '1rem' }}>
      <h2>Formulario de ejemplo</h2>
      <form onSubmit={manejarEnvio}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="nombre">DNI:</label><br />
          <input
            type="text"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="usuario">Usuario:</label><br />
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
         <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="contrasenna">Contraseña:</label><br />
          <input
            type="password"
            id="contrasenna"
            value={contrasenna}
            onChange={(e) => setContrasenna(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={cargando} style={{ padding: '0.5rem 1rem' }}>
          {cargando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}

export default Formulario;
