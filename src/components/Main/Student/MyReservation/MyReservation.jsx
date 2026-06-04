import { useState } from 'react'
import './MyReservation.css'

const MyReservation = ({ reservas, cancelarReserva }) => {
  const [filtroEstado, setFiltroEstado] = useState('Todas')

  const reservasFiltradas =
    filtroEstado === 'Todas'
      ? reservas
      : reservas.filter((reserva) => reserva.estado === filtroEstado)

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

            {reservasFiltradas.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-reservations">
                  No hay reservas para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default MyReservation