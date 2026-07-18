import ReservationSteps from '../reservationSteps/reservationSteps'
import lupaIcono from '../../../../assets/lupa_icono.png'
import './GeneralInfo.css'

const GeneralInfo = ({ volverPaso, siguientePaso }) => {
  return (
    <section className="general-info-page">
      <ReservationSteps />

      <div className="general-card">
        <h2>Datos generales</h2>

        <form className="general-form">
          <div className="form-row">
            <label>*Ingresar Nombre</label>
            <input type="text" placeholder="Ingrese su nombre" />
          </div>

          <div className="form-row">
            <label>*Ingresar Código</label>
            <input type="text" placeholder="Ingrese su código" />
          </div>

          <div className="form-row">
            <label>*Campus</label>
            <select>
              <option>Mayorazgo</option>
              <option>Monterrico</option>
            </select>
          </div>

          <div className="form-row">
            <label>*Ubicación</label>
            <select>
              <option>Centro Deportivo Mayorazgo</option>
              <option>Biblioteca Central</option>
              <option>Laboratorio de Cómputo</option>
            </select>
          </div>

          <div className="form-row">
            <label>*Recurso</label>
            <select>
              <option>Basket media cancha</option>
              <option>Sala de estudio grupal</option>
              <option>Equipo de laboratorio</option>
            </select>
          </div>

          <div className="form-row schedule-row">
            <label>*Seleccionar horario</label>

            <button
              type="button"
              className="schedule-icon-button"
              onClick={siguientePaso}
              aria-label="Seleccionar horario"
            >
              <img src={lupaIcono} alt="" />
            </button>
          </div>
        </form>

        <div className="buttons">
          <button
            className="previous-button"
            type="button"
            onClick={volverPaso}
          >
            Anterior
          </button>

          <button
            className="next-button"
            type="button"
            onClick={siguientePaso}
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  )
}

export default GeneralInfo