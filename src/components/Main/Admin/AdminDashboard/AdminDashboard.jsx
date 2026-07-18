import { useEffect, useState } from 'react'

import ReservasApi from '../../../../api/reservas.js'
import ServiciosApi from '../../../../api/servicios.js'
import NoticiasApi from '../../../../api/noticias.js'

import './AdminDashboard.css'

const AdminDashboard = () => {
  const [indicadores, setIndicadores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargarIndicadores = async () => {
    try {
      setCargando(true)
      setError('')

      const [
        reservas,
        servicios,
        noticias
      ] = await Promise.all([
        ReservasApi.findAll(),
        ServiciosApi.findAll(),
        NoticiasApi.findAll()
      ])

      const totalReservas = reservas.length

      const confirmadas = reservas.filter(
        (reserva) => reserva.estado === 'Confirmado'
      ).length

      const pendientes = reservas.filter(
        (reserva) => reserva.estado === 'Pendiente'
      ).length

      const canceladas = reservas.filter(
        (reserva) => reserva.estado === 'Cancelado'
      ).length

      const serviciosDisponibles = servicios.filter(
        (servicio) => servicio.estado === true
      ).length

      const noticiasPublicadas = noticias.filter(
        (noticia) => noticia.estado === 'Publicada'
      ).length

      setIndicadores([
        {
          id: 1,
          etiqueta: 'Total de reservas',
          valor: totalReservas,
          tipo: 'total'
        },
        {
          id: 2,
          etiqueta: 'Confirmadas',
          valor: confirmadas,
          tipo: 'confirmada'
        },
        {
          id: 3,
          etiqueta: 'Pendientes',
          valor: pendientes,
          tipo: 'pendiente'
        },
        {
          id: 4,
          etiqueta: 'Canceladas',
          valor: canceladas,
          tipo: 'cancelada'
        },
        {
          id: 5,
          etiqueta: 'Servicios disponibles',
          valor: serviciosDisponibles,
          tipo: 'servicio'
        },
        {
          id: 6,
          etiqueta: 'Noticias publicadas',
          valor: noticiasPublicadas,
          tipo: 'noticia'
        }
      ])
    } catch (error) {
      console.error(error)
      setError('No se pudieron cargar los indicadores.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarIndicadores()
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

        <button onClick={cargarIndicadores}>
          Volver a intentar
        </button>
      </section>
    )
  }

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
            <span className="admin-card-valor">
              {indicador.valor}
            </span>

            <span className="admin-card-etiqueta">
              {indicador.etiqueta}
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AdminDashboard