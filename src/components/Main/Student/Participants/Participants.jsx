import { useState } from 'react'
import ReservationSteps from '../reservationSteps/reservationSteps'
import './Participants.css'

const Participants = ({ volverPaso, siguientePaso }) => {
  const [participantes, setParticipantes] = useState([
    {
      codigo: '20236823',
      nombre: 'Antonio Sifuentes Linares'
    }
  ])

  const agregarParticipante = () => {
    const nuevoParticipante = {
      codigo: '',
      nombre: ''
    }

    setParticipantes([...participantes, nuevoParticipante])
  }

  const eliminarParticipante = (indice) => {
    const nuevaLista = participantes.filter((participante, i) => i !== indice)
    setParticipantes(nuevaLista)
  }

  return (
    <section className="participants-page">
      <ReservationSteps pasoActual={2} />

      <div className="participants-card">
        <h2>Información participantes</h2>

        <div className="participants-table">
          <div className="table-header">
            <span>Código participante</span>
            <span>Nombre</span>
            <span>Acciones</span>
          </div>

          {participantes.map((participante, index) => (
            <div className="table-row" key={index}>
              <input
                type="text"
                placeholder="Código"
                defaultValue={participante.codigo}
              />

              <input
                type="text"
                placeholder="Nombre"
                defaultValue={participante.nombre}
              />

              <div className="table-actions">
                <button type="button" onClick={agregarParticipante}>
                  +
                </button>

                <button
                  type="button"
                  onClick={() => eliminarParticipante(index)}
                >
                  −
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="participants-buttons">
          <button
            type="button"
            className="participants-back-button"
            onClick={volverPaso}
          >
            Anterior
          </button>

          <button
            type="button"
            className="participants-next-button"
            onClick={siguientePaso}
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  )
}

export default Participants