import iconoNuevaReserva from '../../assets/icono_reserva_matricula.png'
import iconoMisReservas from '../../assets/icono-mis-reservas.png'
import './SideBar.css'

const SideBar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <button className="sidebar-option">
          <img src={iconoNuevaReserva} alt="Nueva reserva" />
          <span>Nueva reserva</span>
        </button>

        <button className="sidebar-option">
          <img src={iconoMisReservas} alt="Mis reservas" />
          <span>Mis reservas</span>
        </button>
      </nav>
    </aside>
  )
}

export default SideBar