import { useState } from 'react'
import logo from '../../assets/logo.svg'
import './Login.css'

// Usuarios de demostración (mientras no haya backend).
// Más adelante esta validación se reemplazará por una consulta al servidor.
const usuarios = [
  {
    rol: 'admin',
    nombre: 'Administrador ULima',
    correo: 'admin@ulima.edu.pe',
    codigo: '—',
    password: 'admin123'
  },
  {
    rol: 'estudiante',
    nombre: 'Antonio Sifuentes',
    correo: 'alumno@ulima.edu.pe',
    codigo: '20236823',
    password: 'alumno123'
  }
]

// onLogin: función que recibe App.jsx para saber quién inició sesión
const Login = ({ onLogin }) => {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const iniciarSesion = () => {
    if (!correo || !password) {
      setError('Completa tu correo y contraseña.')
      return
    }

    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === correo.trim().toLowerCase() && u.password === password
    )

    if (!usuarioEncontrado) {
      setError('Correo o contraseña incorrectos.')
      return
    }

    setError('')
    onLogin(usuarioEncontrado) // le avisa a App quién entró
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

        <button className="login-button" onClick={iniciarSesion}>
          Ingresar
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
