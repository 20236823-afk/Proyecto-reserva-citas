import logo from '../../assets/logo.svg'
import casa from '../../assets/casa.png'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo-container">
        <img src={logo} alt="Universidad de Lima" className="header-logo" />
      </div>

      <h1 className="header-title">Sistema de reserva de servicios</h1>

      <div className="header-icons">
        <img src={casa} alt="Inicio" className="home-icon" />

        <button className="menu-button">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header