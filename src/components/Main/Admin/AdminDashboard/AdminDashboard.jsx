import { useState, useEffect } from 'react'
import './AdminDashboard.css'

const API_URL = 'http://localhost:3005/api'

const AdminDashboard = () => {
  const [datos, setDatos] = useState(null) // lo que devuelve el backend
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // se ejecuta una vez cuando el componente carga
    fetch(`${API_URL}/dashboard`)
      .then((res) => res.json())
      .then((data) => setDatos(data))
      .catch((err) => {
        console.error(err)
        setError('No se pudieron cargar los indicadores.')
      })
      .finally(() => setCargando(false))
  }, [])

  if (cargando) {
    return (
      <section className="admin-dashboard">
        <p>Cargando panel...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="admin-dashboard">
        <p>{error}</p>
      </section>
    )
  }

  // armamos las tarjetas a partir de lo que llego del backend
  const indicadores = [
    { id: 1, etiqueta: 'Total de reservas', valor: datos.totalReservas, tipo: 'total' },
    { id: 2, etiqueta: 'Confirmadas', valor: datos.confirmadas, tipo: 'confirmada' },
    { id: 3, etiqueta: 'Pendientes', valor: datos.pendientes, tipo: 'pendiente' },
    { id: 4, etiqueta: 'Canceladas', valor: datos.canceladas, tipo: 'cancelada' },
    { id: 5, etiqueta: 'Servicios disponibles', valor: datos.serviciosDisponibles, tipo: 'servicio' },
    { id: 6, etiqueta: 'Noticias publicadas', valor: datos.noticiasPublicadas, tipo: 'noticia' }
  ]

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
