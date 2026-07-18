import ReservationSteps from '../reservationSteps/reservationSteps'
import './ReservationSummary.css'

const ReservationSummary = ({ volverPaso, confirmarReserva, servicioSeleccionado, datosReserva, confirmando }) => {
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
            <strong>{datosReserva?.campus || 'No especificado'}</strong>
          </div>

          <div className="summary-row">
            <span>Ubicación:</span>
            <strong>{datosReserva?.localNombre || 'Local no seleccionado'}</strong>
          </div>

          <div className="summary-row">
            <span>Recurso:</span>
            <strong>
              {datosReserva?.recursoNombre || (servicioSeleccionado ? servicioSeleccionado.nombre : 'Servicio no seleccionado')}
            </strong>
          </div>

          <div className="summary-row">
            <span>Horario:</span>
            <strong>
              {datosReserva?.fecha ? datosReserva.fecha : ''} {datosReserva?.horaInicio ? `- ${datosReserva.horaInicio.substring(0, 5)}` : ''}
            </strong>
          </div>
        </div>

        <div className="summary-section">
          <h3>Participantes</h3>

          {datosReserva?.participantes && datosReserva.participantes.length > 0 ? (
            datosReserva.participantes.map((p, index) => (
              <div className="participant-summary" key={index}>
                <span>{p.codigo || 'S/C'}</span>
                <strong>{p.nombre}</strong>
              </div>
            ))
          ) : (
            <p className="summary-description">Sin participantes registrados</p>
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
            {confirmando ? 'Confirmando...' : 'Confirmar reserva'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReservationSummary