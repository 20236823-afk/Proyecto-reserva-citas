import logo from '../../assets/logo.svg'
import perfilIcono from '../../assets/perfil_icono.png'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo-container">
        <img src={logo} alt="Universidad de Lima" className="header-logo" />
      </div>

      <h1 className="header-title">Sistema de reserva de servicios</h1>

      <div className="header-actions">
        <button className="profile-button">
          <img src={perfilIcono} alt="Perfil del estudiante" />
        </button>

        <button className="menu-button" aria-label="Menú">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header