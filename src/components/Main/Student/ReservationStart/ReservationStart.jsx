import './ReservationStart.css'

const ReservationStart = () => {
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

        <select id="servicio" name="servicio" defaultValue="">
          <option value="" disabled></option>
          {
          servicios.map((servicio) => ( <option key={servicio} value={servicio}> {servicio}</option>))
          }
        </select>
      </div>

      <button className="next-button">
        Siguiente
      </button>
    </section>
  )
}

export default ReservationStart