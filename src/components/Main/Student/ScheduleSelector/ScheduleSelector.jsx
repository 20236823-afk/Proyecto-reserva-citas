import { useState } from 'react'
import './ScheduleSelector.css'

const ScheduleSelector = ({ volverPaso, siguientePaso }) => {
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('')

  const horas = [
    '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00'
  ]

  const dias = [
    'Lun 01/06',
    'Mar 02/06',
    'Mié 03/06',
    'Jue 04/06',
    'Vie 05/06',
    'Sáb 06/06',
    'Dom 07/06'
  ]

  const horariosDisponibles = [
    'Mié 03/06-07:00',
    'Mié 03/06-08:00',
    'Mié 03/06-09:00',
    'Jue 04/06-10:00',
    'Jue 04/06-11:00',
    'Jue 04/06-12:00',
    'Vie 05/06-10:00',
    'Vie 05/06-11:00',
    'Vie 05/06-12:00',
    'Sáb 06/06-10:00',
    'Sáb 06/06-11:00',
    'Sáb 06/06-12:00'
  ]

  const seleccionarHorario = (clave) => {
    setHorarioSeleccionado(clave)
  }

  const confirmarHorario = () => {
    if (horarioSeleccionado !== '') {
      siguientePaso()
    } else {
      alert('Seleccione un horario disponible antes de continuar.')
    }
  }

  return (
    <section className="schedule-page">

      <div className="schedule-header">
        <button
          type="button"
          className="cancel-button"
          onClick={volverPaso}
        >
          Cancelar
        </button>

        <h2>Seleccionar horario</h2>

        <button
          type="button"
          className="select-button"
          onClick={confirmarHorario}
        >
          Seleccionar
        </button>
      </div>

      <p className="week-title">
        01/06/2026 al 07/06/2026
      </p>

      <div className="schedule-table">

        <div className="schedule-row schedule-days">
          <div className="hour-cell">
            Hora Inicio
          </div>

          {dias.map((dia) => (
            <div className="day-cell" key={dia}>
              {dia}
            </div>
          ))}
        </div>

        {horas.map((hora) => (
          <div className="schedule-row" key={hora}>

            <div className="hour-cell">
              {hora}
            </div>

            {dias.map((dia) => {
              const clave = `${dia}-${hora}`
              const disponible = horariosDisponibles.includes(clave)
              const seleccionado = horarioSeleccionado === clave

              return (
                <div className="day-cell" key={clave}>
                  {disponible && (
                    <button
                      type="button"
                      className={
                        seleccionado
                          ? 'slot selected'
                          : 'slot'
                      }
                      onClick={() => seleccionarHorario(clave)}
                    />
                  )}
                </div>
              )
            })}

          </div>
        ))}

      </div>

      {horarioSeleccionado && (
        <p className="selected-text">
          Horario seleccionado: {horarioSeleccionado}
        </p>
      )}

    </section>
  )
}

export default ScheduleSelector