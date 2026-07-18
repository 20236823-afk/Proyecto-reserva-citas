import iconoNuevaReserva from '../../assets/Icono_reserva_matricula.png'
import iconoMisReservas from '../../assets/icono-mis-reservas.png'
import iconoNoticias from '../../assets/noticias_icono.png'
import './SideBar.css'

const SideBar = ({ currentSection, setCurrentSection }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <button
          className={currentSection === 'nueva-reserva' ? 'sidebar-option active' : 'sidebar-option'}
          onClick={() => setCurrentSection('nueva-reserva')}
        >
          <span className="sidebar-icon-container">
            <img src={iconoNuevaReserva} alt="Nueva reserva" />
          </span>
          <span>Nueva reserva</span>
        </button>

        <button
          className={currentSection === 'mis-reservas' ? 'sidebar-option active' : 'sidebar-option'}
          onClick={() => setCurrentSection('mis-reservas')}
        >
          <span className="sidebar-icon-container">
            <img src={iconoMisReservas} alt="Mis reservas" />
          </span>
          <span>Mis reservas</span>
        </button>

        <button
          className={currentSection === 'noticias' ? 'sidebar-option active' : 'sidebar-option'}
          onClick={() => setCurrentSection('noticias')}
        >
          <span className="sidebar-icon-container">
            <img src={iconoNoticias} alt="Noticias" />
          </span>
          <span>Noticias</span>
        </button>
      </nav>
    </aside>
  )
}

export default SideBar