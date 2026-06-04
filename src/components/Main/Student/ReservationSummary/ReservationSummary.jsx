import ReservationSteps from '../reservationSteps/reservationSteps'
import './ReservationSummary.css'

const ReservationSummary = ({ volverPaso, confirmarReserva }) => {
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
            <strong>Mayorazgo</strong>
          </div>

          <div className="summary-row">
            <span>Ubicación:</span>
            <strong>Centro Deportivo Mayorazgo</strong>
          </div>

          <div className="summary-row">
            <span>Recurso:</span>
            <strong>Basket media cancha</strong>
          </div>

          <div className="summary-row">
            <span>Horario:</span>
            <strong>Jue 04/06 - 10:00</strong>
          </div>
        </div>

        <div className="summary-section">
          <h3>Participantes</h3>

          <div className="participant-summary">
            <span>20236823</span>
            <strong>Antonio Sifuentes Linares</strong>
          </div>
        </div>

        <div className="summary-buttons">
          <button
            type="button"
            className="summary-back-button"
            onClick={volverPaso}
          >
            Anterior
          </button>

          <button
            type="button"
            className="summary-confirm-button"
            onClick={confirmarReserva}
          >
            Confirmar reserva
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReservationSummary