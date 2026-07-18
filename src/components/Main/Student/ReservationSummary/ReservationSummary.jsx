import ReservationSteps from '../reservationSteps/reservationSteps'
import './ReservationSummary.css'

const ReservationSummary = ({
  volverPaso,
  confirmarReserva,
  servicioSeleccionado,
  datosReserva,
  confirmando
}) => {
  const formatearFecha = (fecha) => {
    if (!fecha) {
      return 'No seleccionada'
    }

    const [anio, mes, dia] = fecha.split('-')

    if (!anio || !mes || !dia) {
      return fecha
    }

    return `${dia}/${mes}/${anio}`
  }

  const formatearHora = (hora) => {
    if (!hora) {
      return 'No seleccionada'
    }

    return hora.substring(0, 5)
  }

  const calcularHoraFin = (horaInicio, duracion) => {
    if (!horaInicio || !duracion) {
      return ''
    }

    const [horas, minutos] = horaInicio
      .split(':')
      .map(Number)

    const fechaTemporal = new Date()
    fechaTemporal.setHours(horas)
    fechaTemporal.setMinutes(minutos + Number(duracion))
    fechaTemporal.setSeconds(0)

    const horaFin = String(
      fechaTemporal.getHours()
    ).padStart(2, '0')

    const minutoFin = String(
      fechaTemporal.getMinutes()
    ).padStart(2, '0')

    return `${horaFin}:${minutoFin}`
  }

  const participantes =
    datosReserva?.participantes || []

  const nombreServicio =
    servicioSeleccionado?.nombre ||
    datosReserva?.servicioNombre ||
    'No seleccionado'

  const nombreLocal =
    datosReserva?.localNombre ||
    datosReserva?.local?.nombre ||
    'No seleccionado'

  const nombreRecurso =
    datosReserva?.recursoNombre ||
    datosReserva?.recurso?.nombre ||
    'No seleccionado'

  const horaFin = calcularHoraFin(
    datosReserva?.horaInicio,
    datosReserva?.duracion
  )

  return (
    <section className="summary-page">
      <ReservationSteps pasoActual={3} />

      <div className="summary-card">
        <h2>Resumen de reserva</h2>

        <p className="summary-description">
          Revise la información antes de confirmar la reserva.
        </p>

        <div className="summary-section">
          <h3>Datos generales</h3>

          <div className="summary-row">
            <span>Campus:</span>

            <strong>
              {datosReserva?.campus || 'No seleccionado'}
            </strong>
          </div>

          <div className="summary-row">
            <span>Servicio:</span>

            <strong>{nombreServicio}</strong>
          </div>

          <div className="summary-row">
            <span>Ubicación:</span>

            <strong>{nombreLocal}</strong>
          </div>

          <div className="summary-row">
            <span>Recurso:</span>

            <strong>{nombreRecurso}</strong>
          </div>

          <div className="summary-row">
            <span>Fecha:</span>

            <strong>
              {formatearFecha(datosReserva?.fecha)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Horario:</span>

            <strong>
              {datosReserva?.horaInicio
                ? `${formatearHora(datosReserva.horaInicio)}${
                    horaFin ? ` - ${horaFin}` : ''
                  }`
                : 'No seleccionado'}
            </strong>
          </div>

          <div className="summary-row">
            <span>Duración:</span>

            <strong>
              {datosReserva?.duracion
                ? `${datosReserva.duracion} minutos`
                : 'No seleccionada'}
            </strong>
          </div>

          <div className="summary-row">
            <span>Estado inicial:</span>

            <strong>Pendiente</strong>
          </div>
        </div>

        <div className="summary-section">
          <h3>Participantes</h3>

          {participantes.length === 0 ? (
            <p>No se registraron participantes.</p>
          ) : (
            participantes.map((participante, index) => (
              <div
                className="participant-summary"
                key={`${participante.codigo}-${index}`}
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

        <div className="summary-buttons">
          <button
            type="button"
            className="summary-back-button"
            onClick={volverPaso}
            disabled={confirmando}
          >
            Anterior
          </button>

          <button
            type="button"
            className="summary-confirm-button"
            onClick={confirmarReserva}
            disabled={confirmando}
          >
            {confirmando
              ? 'Confirmando...'
              : 'Confirmar reserva'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReservationSummary