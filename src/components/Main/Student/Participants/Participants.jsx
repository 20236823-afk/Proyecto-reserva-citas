import { useState } from 'react'
import ReservationSteps from '../reservationSteps/reservationSteps'
import './Participants.css'

const participanteVacio = {
  codigo: '',
  nombre: ''
}

const Participants = ({
  volverPaso,
  siguientePaso,
  datosReserva,
  actualizarDatosReserva
}) => {
  const [participantes, setParticipantes] = useState(() => {
    if (
      datosReserva.participantes &&
      datosReserva.participantes.length > 0
    ) {
      return datosReserva.participantes
    }

    return [participanteVacio]
  })

  const [error, setError] = useState('')

  const guardarParticipantes = (nuevaLista) => {
    setParticipantes(nuevaLista)

    actualizarDatosReserva({
      participantes: nuevaLista
    })
  }

  const actualizarParticipante = (indice, campo, valor) => {
    const nuevaLista = participantes.map((participante, posicion) => {
      if (posicion === indice) {
        return {
          ...participante,
          [campo]: valor
        }
      }

      return participante
    })

    guardarParticipantes(nuevaLista)
    setError('')
  }

  const agregarParticipante = () => {
    guardarParticipantes([
      ...participantes,
      { ...participanteVacio }
    ])
  }

  const eliminarParticipante = (indice) => {
    if (participantes.length === 1) {
      guardarParticipantes([
        { ...participanteVacio }
      ])

      return
    }

    const nuevaLista = participantes.filter(
      (_, posicion) => posicion !== indice
    )

    guardarParticipantes(nuevaLista)
  }

  const continuar = () => {
    const participantesConDatos = participantes.filter(
      (participante) =>
        participante.codigo.trim() !== '' ||
        participante.nombre.trim() !== ''
    )

    const participanteSinNombre = participantesConDatos.some(
      (participante) => participante.nombre.trim() === ''
    )

    if (participantesConDatos.length === 0) {
      setError('Debes registrar al menos un participante.')
      return
    }

    if (participanteSinNombre) {
      setError('Todos los participantes deben tener un nombre.')
      return
    }

    const participantesValidos = participantesConDatos.map(
      (participante) => ({
        codigo: participante.codigo.trim(),
        nombre: participante.nombre.trim()
      })
    )

    guardarParticipantes(participantesValidos)
    siguientePaso()
  }

  return (
    <section className="participants-page">
      <ReservationSteps pasoActual={2} />

      <div className="participants-card">
        <h2>Información participantes</h2>

        {error && (
          <p className="participants-error">
            {error}
          </p>
        )}

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
                value={participante.codigo}
                onChange={(event) =>
                  actualizarParticipante(
                    index,
                    'codigo',
                    event.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="Nombre"
                value={participante.nombre}
                onChange={(event) =>
                  actualizarParticipante(
                    index,
                    'nombre',
                    event.target.value
                  )
                }
              />

              <div className="table-actions">
                <button
                  type="button"
                  onClick={agregarParticipante}
                >
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
            onClick={continuar}
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  )
}

export default Participants