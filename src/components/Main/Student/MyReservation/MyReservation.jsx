import { useState } from 'react'
import './MyReservation.css'

const MyReservation = ({
  reservas = [],
  cancelarReserva,
  cargando,
  error,
  procesandoReservaId
}) => {
  const [filtroEstado, setFiltroEstado] = useState('Todas')
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null)

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return 'No registrada'
    }

    const fechaSinHora = fecha.split('T')[0]
    const [anio, mes, dia] = fechaSinHora.split('-')

    if (!anio || !mes || !dia) {
      return fecha
    }

    return `${dia}/${mes}/${anio}`
  }

  const formatearHora = (hora) => {
    if (!hora) {
      return 'No registrada'
    }

    return hora.substring(0, 5)
  }

  const calcularHoraFin = (horaInicio, duracion) => {
    if (!horaInicio || duracion === null || duracion === undefined) {
      return ''
    }

    const [horas, minutos] = horaInicio.split(':').map(Number)

    if (Number.isNaN(horas) || Number.isNaN(minutos)) {
      return ''
    }

    const minutosTotales =
      horas * 60 +
      minutos +
      Number(duracion)

    const horaFinal = Math.floor(
      (minutosTotales % 1440) / 60
    )

    const minutoFinal = minutosTotales % 60

    return `${String(horaFinal).padStart(2, '0')}:${String(
      minutoFinal
    ).padStart(2, '0')}`
  }

  const obtenerServicio = (reserva) => {
    return (
      reserva.Servicio?.nombre ||
      reserva.servicio?.nombre ||
      reserva.servicioNombre ||
      'No disponible'
    )
  }

  const obtenerLocal = (reserva) => {
    return (
      reserva.Local?.nombre ||
      reserva.local?.nombre ||
      reserva.localNombre ||
      'No disponible'
    )
  }

  const obtenerRecurso = (reserva) => {
    return (
      reserva.Recurso?.nombre ||
      reserva.recurso?.nombre ||
      reserva.recursoNombre ||
      'No disponible'
    )
  }

  const obtenerParticipantes = (reserva) => {
    if (Array.isArray(reserva.Participantes)) {
      return reserva.Participantes
    }

    if (Array.isArray(reserva.participantes)) {
      return reserva.participantes
    }

    return []
  }

  const obtenerHorario = (reserva) => {
    const horaInicio = formatearHora(reserva.horaInicio)

    const horaFin = calcularHoraFin(
      reserva.horaInicio,
      reserva.duracion
    )

    if (!horaFin) {
      return horaInicio
    }

    return `${horaInicio} - ${horaFin}`
  }

  const reservasFiltradas =
    filtroEstado === 'Todas'
      ? reservas
      : reservas.filter(
          (reserva) => reserva.estado === filtroEstado
        )

  const verDetalleReserva = (reserva) => {
    setReservaSeleccionada(reserva)
  }

  const cerrarDetalleReserva = () => {
    setReservaSeleccionada(null)
  }

  if (cargando) {
    return (
      <section className="my-reservations">
        <p>Cargando reservas...</p>
      </section>
    )
  }

  return (
    <section className="my-reservations">
      {error && (
        <p className="reservations-error">
          {error}
        </p>
      )}

      {reservaSeleccionada && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal">
            <div className="reservation-modal-header">
              <div>
                <h2>Detalle de reserva</h2>

                <p>
                  Revise la información registrada para esta
                  reserva.
                </p>
              </div>

              <button
                type="button"
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
                <span>Servicio:</span>

                <strong>
                  {obtenerServicio(reservaSeleccionada)}
                </strong>
              </div>

              <div className="modal-row">
                <span>Ubicación:</span>

                <strong>
                  {obtenerLocal(reservaSeleccionada)}
                </strong>
              </div>

              <div className="modal-row">
                <span>Recurso:</span>

                <strong>
                  {obtenerRecurso(reservaSeleccionada)}
                </strong>
              </div>

              <div className="modal-row">
                <span>Fecha:</span>

                <strong>
                  {formatearFecha(reservaSeleccionada.fecha)}
                </strong>
              </div>

              <div className="modal-row">
                <span>Horario:</span>

                <strong>
                  {obtenerHorario(reservaSeleccionada)}
                </strong>
              </div>

              <div className="modal-row">
                <span>Duración:</span>

                <strong>
                  {reservaSeleccionada.duracion
                    ? `${reservaSeleccionada.duracion} minutos`
                    : 'No registrada'}
                </strong>
              </div>

              <div className="modal-row">
                <span>Estado:</span>

                <strong>
                  {reservaSeleccionada.estado}
                </strong>
              </div>
            </div>

            <div className="modal-section">
              <h3>Participantes</h3>

              {obtenerParticipantes(
                reservaSeleccionada
              ).length === 0 ? (
                <p>No hay participantes registrados.</p>
              ) : (
                obtenerParticipantes(
                  reservaSeleccionada
                ).map((participante) => (
                  <div
                    className="participant-summary-modal"
                    key={participante.id}
                  >
                    <span>
                      {participante.codigo || 'Sin código'}
                    </span>

                    <strong>
                      {participante.nombre}
                    </strong>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="reservations-filters">
        <button
          type="button"
          className={
            filtroEstado === 'Todas'
              ? 'filter-button active'
              : 'filter-button'
          }
          onClick={() => setFiltroEstado('Todas')}
        >
          Todas
        </button>

        <button
          type="button"
          className={
            filtroEstado === 'Confirmado'
              ? 'filter-button active'
              : 'filter-button'
          }
          onClick={() => setFiltroEstado('Confirmado')}
        >
          Confirmadas
        </button>

        <button
          type="button"
          className={
            filtroEstado === 'Pendiente'
              ? 'filter-button active'
              : 'filter-button'
          }
          onClick={() => setFiltroEstado('Pendiente')}
        >
          Pendientes
        </button>

        <button
          type="button"
          className={
            filtroEstado === 'Cancelado'
              ? 'filter-button active'
              : 'filter-button'
          }
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
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {reservasFiltradas.map((reserva) => {
              const estaProcesando =
                procesandoReservaId === reserva.id

              const estaCancelada =
                reserva.estado === 'Cancelado'

              return (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>

                  <td>{obtenerLocal(reserva)}</td>

                  <td>{obtenerRecurso(reserva)}</td>

                  <td>{obtenerServicio(reserva)}</td>

                  <td>
                    {formatearFecha(reserva.fecha)}
                  </td>

                  <td>{obtenerHorario(reserva)}</td>

                  <td>
                    <span
                      className={`status-badge ${String(
                        reserva.estado || ''
                      ).toLowerCase()}`}
                    >
                      {reserva.estado}
                    </span>
                  </td>

                  <td>
                    <div className="reservation-actions">
                      <button
                        type="button"
                        className="detail-button"
                        onClick={() =>
                          verDetalleReserva(reserva)
                        }
                      >
                        Ver detalle
                      </button>

                      <button
                        type="button"
                        className="cancel-button"
                        disabled={
                          estaCancelada ||
                          estaProcesando
                        }
                        onClick={() =>
                          cancelarReserva(reserva.id)
                        }
                      >
                        {estaProcesando
                          ? 'Cancelando...'
                          : 'Cancelar'}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}

            {reservasFiltradas.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="empty-reservations"
                >
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