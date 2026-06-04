import './ReservationStart.css'

const ReservationStart = ({ siguientePaso }) => {

  const servicios = [
    'Ambientes deportivos',
    'Reserva de ambientes técnicos (SERCOM)',
    'Reserva de Laboratorios',
    'Préstamo de equipos (SERCOM)',
    'Reserva de cubículos'
  ]

  return (
    <section className="reservation-start">

      <div className="reservation-form">

        <label htmlFor="servicio">
          Seleccione el servicio que desea reservar
        </label>

        <select
          id="servicio"
          name="servicio"
          defaultValue=""
        >
          <option value="" disabled>
            Seleccione una opción
          </option>

          {
            servicios.map((servicio) => (
              <option
                key={servicio}
                value={servicio}
              >
                {servicio}
              </option>
            ))
          }

        </select>

      </div>

      <button
        className="next-button"
        onClick={siguientePaso}
      >
        Siguiente
      </button>

    </section>
  )
}

export default ReservationStart