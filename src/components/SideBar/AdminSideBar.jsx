import iconoDashboard from '../../assets/Icono_reserva_matricula.png'
import iconoReservas from '../../assets/icono-mis-reservas.png'
import iconoServicios from '../../assets/Icono_reserva_matricula.png'
import iconoNoticias from '../../assets/noticias_icono.png'
import iconoHorarios from '../../assets/icono-mis-reservas.png'
import './AdminSideBar.css'

// Sidebar exclusivo del administrador. Funciona igual que el del
// estudiante: recibe la sección actual y la función para cambiarla.
const AdminSideBar = ({ currentSection, setCurrentSection }) => {
  const opciones = [
    { clave: 'admin-dashboard', texto: 'Panel principal', icono: iconoDashboard },
    { clave: 'admin-reservas', texto: 'Gestión de reservas', icono: iconoReservas },
    { clave: 'admin-servicios', texto: 'Gestión de servicios', icono: iconoServicios },
    { clave: 'admin-noticias', texto: 'Gestión de noticias', icono: iconoNoticias },
    { clave: 'admin-horarios', texto: 'Gestión de horarios', icono: iconoHorarios }
  ]

  return (
    <aside className="admin-sidebar">
      <nav className="admin-sidebar-nav">
        {opciones.map((opcion) => (
          <button
            key={opcion.clave}
            className={
              currentSection === opcion.clave
                ? 'admin-sidebar-option active'
                : 'admin-sidebar-option'
            }
            onClick={() => setCurrentSection(opcion.clave)}
          >
            <span className="admin-sidebar-icon-container">
              <img src={opcion.icono} alt={opcion.texto} />
            </span>
            <span>{opcion.texto}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSideBar
