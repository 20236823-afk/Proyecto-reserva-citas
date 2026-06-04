import { useState } from 'react'
import './MyReservation.css'

const MyReservation = ({ reservas, cancelarReserva }) => {
  const [filtroEstado, setFiltroEstado] = useState('Todas')
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null)

  const reservasFiltradas =
    filtroEstado === 'Todas'
      ? reservas
      : reservas.filter((reserva) => reserva.estado === filtroEstado)

  const verDetalleReserva = (reserva) => {
    setReservaSeleccionada(reserva)
  }

  const cerrarDetalleReserva = () => {
    setReservaSeleccionada(null)
  }

  return (
    <section className="my-reservations">

      {reservaSeleccionada && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal">
            <div className="reservation-modal-header">
              <div>
                <h2>Detalle de reserva</h2>
                <p>Revise la información registrada para esta reserva.</p>
              </div>

              <button
                className="modal-close-button"
                onClick={cerrarDetalleReserva}
              >
                Cerrar
              </button>
            </div>

            <div className="modal-section">
              <h3>Datos generales</h3>

              <div className="modal-row">
                <span>ID Reserva:</span>
                <strong>{reservaSeleccionada.id}</strong>
              </div>

              <div className="modal-row">
                <span>Campus:</span>
                <strong>{reservaSeleccionada.campus || 'Mayorazgo'}</strong>
              </div>

              <div className="modal-row">
                <span>Ubicación:</span>
                <strong>{reservaSeleccionada.local}</strong>
              </div>

              <div className="modal-row">
                <span>Recurso:</span>
                <strong>{reservaSeleccionada.recurso}</strong>
              </div>

              <div className="modal-row">
                <span>Detalle:</span>
                <strong>{reservaSeleccionada.detalle}</strong>
              </div>

              <div className="modal-row">
                <span>Fecha:</span>
                <strong>{reservaSeleccionada.fecha}</strong>
              </div>

              <div className="modal-row">
                <span>Horario:</span>
                <strong>{reservaSeleccionada.horario}</strong>
              </div>

              <div className="modal-row">
                <span>Estado:</span>
                <strong>{reservaSeleccionada.estado}</strong>
              </div>
            </div>

            <div className="modal-section">
              <h3>Participantes</h3>

              <div className="participant-summary-modal">
                <span>{reservaSeleccionada.codigoEstudiante || '20236823'}</span>
                <strong>{reservaSeleccionada.nombreEstudiante || 'Antonio Sifuentes Linares'}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <button
                      className="detail-button"
                      onClick={() => verDetalleReserva(reserva)}
                    >
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