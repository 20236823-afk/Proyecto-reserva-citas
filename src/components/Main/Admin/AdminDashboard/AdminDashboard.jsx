import './AdminDashboard.css'

// Datos simulados del panel. luego estos números maybe
// calcularse a partir de las reservas reales del sistema
const indicadores = [
  { id: 1, etiqueta: 'Total de reservas', valor: 128, tipo: 'total' },
  { id: 2, etiqueta: 'Confirmadas', valor: 86, tipo: 'confirmada' },
  { id: 3, etiqueta: 'Pendientes', valor: 24, tipo: 'pendiente' },
  { id: 4, etiqueta: 'Canceladas', valor: 18, tipo: 'cancelada' },
  { id: 5, etiqueta: 'Servicios disponibles', valor: 5, tipo: 'servicio' },
  { id: 6, etiqueta: 'Noticias publicadas', valor: 3, tipo: 'noticia' }
]

const AdminDashboard = () => {
  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h2>Panel del administrador</h2>
        <p>Resumen general del sistema de reserva de servicios.</p>
      </div>

      <div className="admin-dashboard-grid">
        {indicadores.map((indicador) => (
          <article
            className={`admin-card admin-card-${indicador.tipo}`}
            key={indicador.id}
          >
            <span className="admin-card-valor">{indicador.valor}</span>
            <span className="admin-card-etiqueta">{indicador.etiqueta}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AdminDashboard
