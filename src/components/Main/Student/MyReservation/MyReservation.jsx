import { useState } from 'react'
import './MyReservation.css'

const reservasIniciales = [
  {
    id: '0000309481',
    local: 'Centro Deportivo Mayorazgo',
    recurso: 'Basket cancha completa',
    detalle: 'Cancha completa',
    fecha: '03/06/2026',
    horario: '07:00 - 07:50',
    estado: 'Cancelado'
  },
  {
    id: '0000305573',
    local: 'Centro Deportivo Mayorazgo',
    recurso: 'Basket media cancha',
    detalle: 'Media cancha',
    fecha: '29/05/2026',
    horario: '10:00 - 10:50',
    estado: 'Cancelado'
  },
  {
    id: '0000305293',
    local: 'Centro Deportivo Mayorazgo',
    recurso: 'Piscina',
    detalle: 'Carril de natación',
    fecha: '28/05/2026',
    horario: '15:00 - 15:50',
    estado: 'Confirmado'
  },
  {
    id: '0000306210',
    local: 'Biblioteca Central',
    recurso: 'Cubículo de estudio',
    detalle: 'Cubículo grupal',
    fecha: '05/06/2026',
    horario: '12:00 - 13:00',
    estado: 'Pendiente'
  }
]

const MyReservations = () => {
  const [reservas, setReservas] = useState(reservasIniciales)
  const [filtroEstado, setFiltroEstado] = useState('Todas')

  const reservasFiltradas =
    filtroEstado === 'Todas'
      ? reservas
      : reservas.filter((reserva) => reserva.estado === filtroEstado)

  const cancelarReserva = (id) => {
    const nuevasReservas = reservas.map((reserva) => {
      if (reserva.id === id) {
        return {
          ...reserva,
          estado: 'Cancelado'
        }
      }

      return reserva
    })

    setReservas(nuevasReservas)
  }

  return (
    <section className="my-reservations">
      <div className="reservations-header">
        <div>
          <h2>Mis reservas</h2>
          <p>Consulta el estado de tus reservas realizadas.</p>
        </div>

        <span className="reservations-count">
          {reservasFiltradas.length} reservas
        </span>
      </div>

      <div className="reservations-filters">
        <button
          className={filtroEstado === 'Todas' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFiltroEstado('Todas')}
        >
          Todas
        </button>

        <button
          className={filtroEstado === 'Confirmado' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFiltroEstado('Confirmado')}
        >
          Confirmadas
        </button>

        <button
          className={filtroEstado === 'Pendiente' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFiltroEstado('Pendiente')}
        >
          Pendientes
        </button>

        <button
          className={filtroEstado === 'Cancelado' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFiltroEstado('Cancelado')}
        >
          Canceladas
        </button>
      </div>

      <div className="reservations-table-container">
        <table className="reservations-table">
          <thead>
            <tr>
              <th>ID Reserva</th>
              <th>Local</th>
              <th>Recurso</th>
              <th>Detalle</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {reservasFiltradas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.local}</td>
                <td>{reserva.recurso}</td>
                <td>{reserva.detalle}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.horario}</td>
                <td>
                  <span className={`status-badge ${reserva.estado.toLowerCase()}`}>
                    {reserva.estado}
                  </span>
                </td>
                <td>
                  <div className="reservation-actions">
                    <button className="detail-button">
                      Ver detalle
                    </button>

                    <button
                      className="cancel-button"
                      disabled={reserva.estado === 'Cancelado'}
                      onClick={() => cancelarReserva(reserva.id)}
                    >
                      Cancelar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default MyReservations