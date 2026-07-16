import { useState } from 'react'
import logo from '../../assets/logo.svg'
import './Login.css'

// url del backend, cambiar cuando este desplegado
const API_URL = 'http://localhost:3005/api'

const Login = ({ onLogin }) => {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false) // para el boton mientras espera la api

  const iniciarSesion = async () => {
    if (!correo || !password) {
      setError('Completa tu correo y contraseña.')
      return
    }

    setError('')
    setCargando(true)

    try {
      // pega al endpoint de login del backend
      const respuesta = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      })

      const datos = await respuesta.json()

      if (!respuesta.ok) {
        // el backend ya manda el mensaje de error armado
        setError(datos.message || 'Correo o contraseña incorrectos.')
        return
      }

      onLogin(datos) // datos = el usuario que devolvio la api
    } catch (err) {
      console.error(err)
      setError('No se pudo conectar con el servidor. Intenta de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  const manejarEnter = (event) => {
    if (event.key === 'Enter') {
      iniciarSesion()
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="Universidad de Lima" className="login-logo" />
        <h2 className="login-title">Sistema de reserva de servicios</h2>
        <p className="login-subtitle">Inicia sesión con tu cuenta institucional.</p>

        <label className="login-label">Correo</label>
        <input
          className="login-input"
          type="email"
          value={correo}
          placeholder="usuario@ulima.edu.pe"
          onChange={(e) => setCorreo(e.target.value)}
          onKeyDown={manejarEnter}
        />

        <label className="login-label">Contraseña</label>
        <input
          className="login-input"
          type="password"
          value={password}
          placeholder="••••••"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={manejarEnter}
        />

        {error && <p className="login-error">{error}</p>}

        <button className="login-button" onClick={iniciarSesion} disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>

        <div className="login-ayuda">
          <p><strong>Admin:</strong> admin@ulima.edu.pe / admin123</p>
          <p><strong>Alumno:</strong> alumno@ulima.edu.pe / alumno123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
