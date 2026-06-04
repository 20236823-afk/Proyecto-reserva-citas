import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.svg'
import perfilIcono from '../../assets/perfil_icono.png'
import './Header.css'

const Header = () => {
  const [mostrarPerfil, setMostrarPerfil] = useState(false)
  const perfilRef = useRef(null)

  const estudiante = {
    nombre: 'Antonio Sifuentes',
    codigo: '20236823',
    correo: '20236823@aloe.ulima.edu.pe'
  }

  const cambiarVisibilidadPerfil = () => {
    setMostrarPerfil(!mostrarPerfil)
  }

  const cerrarSesion = () => {
    alert('Sesión cerrada')
  }

  useEffect(() => {
    const cerrarPerfilAlHacerClickAfuera = (event) => {
      if (
        perfilRef.current &&
        !perfilRef.current.contains(event.target)
      ) {
        setMostrarPerfil(false)
      }
    }

    document.addEventListener('mousedown', cerrarPerfilAlHacerClickAfuera)

    return () => {
      document.removeEventListener('mousedown', cerrarPerfilAlHacerClickAfuera)
    }
  }, [])

  return (
    <header className="header">
      <div className="header-logo-container">
        <img src={logo} alt="Universidad de Lima" className="header-logo" />
      </div>

      <h1 className="header-title">Sistema de reserva de servicios</h1>

      <div className="header-actions" ref={perfilRef}>
        <button
          className="profile-button"
          onClick={cambiarVisibilidadPerfil}
        >
          <img src={perfilIcono} alt="Perfil del estudiante" />
        </button>

        {mostrarPerfil && (
          <div className="profile-dropdown">
            <h3>{estudiante.nombre}</h3>

            <div className="profile-info">
              <p>
                <span>Código:</span>
                {estudiante.codigo}
              </p>

              <p>
                <span>Correo:</span>
                {estudiante.correo}
              </p>
            </div>

            <button
              className="logout-button"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header