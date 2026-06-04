import './reservationSteps.css'

const ReservationSteps = ({ pasoActual }) => {
  return (
    <div className="steps">
      <div className={pasoActual === 1 ? 'step active' : 'step'}>
        <span>1</span>
        <p>Información general</p>
      </div>

      <div className="line"></div>

      <div className={pasoActual === 2 ? 'step active' : 'step'}>
        <span>2</span>
        <p>Participantes</p>
      </div>

      <div className="line"></div>

      <div className={pasoActual === 3 ? 'step active' : 'step'}>
        <span>3</span>
        <p>Resumen</p>
      </div>
    </div>
  )
}

export default ReservationSteps