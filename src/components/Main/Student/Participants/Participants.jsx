import ReservationSteps from '../reservationSteps/reservationSteps'
import './Participants.css'

const Participants = ({ volverPaso, siguientePaso, datosReserva, actualizarDatosReserva }) => {
  const listaParticipantes = datosReserva?.participantes?.length > 0 
    ? datosReserva.participantes 
    : [{ codigo: '', nombre: '' }]

  const manejarCambioInput = (indice, campo, valor) => {
    const nuevaLista = listaParticipantes.map((participante, i) => {
      if (i === indice) {
        return {
          ...participante,
          [campo]: valor
        }
      }
      return participante
    })

    actualizarDatosReserva({
      participantes: nuevaLista
    })
  }

  const agregarParticipante = () => {
    const nuevoParticipante = {
      codigo: '',
      nombre: ''
    }
    actualizarDatosReserva({
      participantes: [...listaParticipantes, nuevoParticipante]
    })
  }

  const eliminarParticipante = (indice) => {
    if (listaParticipantes.length === 1) {
      actualizarDatosReserva({
        participantes: [{ codigo: '', nombre: '' }]
      })
      return
    }
    
    const nuevaLista = listaParticipantes.filter((_, i) => i !== indice)
    actualizarDatosReserva({
      participantes: nuevaLista
    })
  }

  const manejarSiguiente = () => {
    const filtrados = listaParticipantes.filter(
      (p) => p.nombre.trim() !== '' || p.codigo.trim() !== ''
    )

    actualizarDatosReserva({
      participantes: filtrados
    })

    siguientePaso()
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

          {listaParticipantes.map((participante, index) => (
            <div className="table-row" key={index}>
              <input
                type="text"
                placeholder="Código"
                value={participante.codigo}
                onChange={(e) => manejarCambioInput(index, 'codigo', e.target.value)}
              />

              <input
                type="text"
                placeholder="Nombre"
                value={participante.nombre}
                onChange={(e) => manejarCambioInput(index, 'nombre', e.target.value)}
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
            onClick={manejarSiguiente}
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  )
}

export default Participants