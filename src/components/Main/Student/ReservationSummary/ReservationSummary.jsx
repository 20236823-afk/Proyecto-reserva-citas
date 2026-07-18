import { useState } from 'react'
import ReservationSteps from '../reservationSteps/reservationSteps'
import './ReservationSummary.css'
import ReservasApi from '../../../../api/reservas.js'
import Base from '../../../../api/base.js' // Importamos la base para inyectar datos si faltan

const ReservationSummary = ({ volverPaso, servicioSeleccionado, datosReserva, alTerminarReserva }) => {
  const [localConfirmando, setLocalConfirmando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(null)

  const manejarConfirmacion = async () => {
    setLocalConfirmando(true)
    setErrorEnvio(null)

    let finalLocalId = datosReserva?.localId || 1
    let finalRecursoId = datosReserva?.recursoId || 1
    let finalServicioId = servicioSeleccionado?.id || 1

    try {
      // 1. Forzar inserción de datos iniciales en la BD vacía (Por si el migrate no metió nada)
      console.log("Asegurando datos maestros en PostgreSQL...")
      await Base.post('/api/locales', { id: 1, nombre: datosReserva?.localNombre || 'Pabellón Principal', campus: datosReserva?.campus || 'Mayorazgo' }).catch(() => {})
      await Base.post('/api/servicios', { id: 1, nombre: 'Ambientes deportivos', descripcion: 'General' }).catch(() => {})
      await Base.post('/api/recursos', { id: 1, nombre: 'Cancha de Fútbol', estado: 'Disponible', localId: 1 }).catch(() => {})
    } catch (e) {
      console.log("Las tablas maestras ya tenían datos o se manejaron de forma independiente", e)
    }

    // 2. Estructuramos el objeto de reserva exacto para Sequelize
    const nuevaReserva = {
      fecha: datosReserva?.fecha || "2026-06-05", 
      horaInicio: datosReserva?.horaInicio ? datosReserva.horaInicio.substring(0, 8) : "11:00:00",
      duracion: datosReserva?.duracion || 60,
      estado: 'Confirmado',
      localId: finalLocalId,       
      recursoId: finalRecursoId,   
      servicioId: finalServicioId, 
      participantes: datosReserva?.participantes || [] 
    }

    console.log("Enviando reserva final:", nuevaReserva)

    // 3. Envío final a la API
    const resultado = await ReservasApi.create(nuevaReserva)

    if (resultado) {
      alert("¡Reserva registrada con éxito en PostgreSQL!")
      if (alTerminarReserva) {
        alTerminarReserva()
      }
    } else {
      setErrorEnvio('Error persistente: El backend rechazó la inserción. Revisa la terminal negra del backend para ver el mensaje exacto de Sequelize.')
    }
    setLocalConfirmando(false)
  }

  return (
    <section className="summary-page">
      <ReservationSteps pasoActual={3} />

      <div className="summary-card">
        <h2>Resumen de reserva</h2>

        <p className="summary-description">
          Revise la información antes de confirmar la reserva.
        </p>

        {errorEnvio && <div className="error-message-banner" style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>{errorEnvio}</div>}

        <div className="summary-section">
          <h3>Datos generales</h3>

          <div className="summary-row">
            <span>Campus:</span>
            <strong>{datosReserva?.campus || 'Mayorazgo'}</strong>
          </div>

          <div className="summary-row">
            <span>Ubicación:</span>
            <strong>{datosReserva?.localNombre || 'Pabellón Principal (Asignado)'}</strong>
          </div>

          <div className="summary-row">
            <span>Recurso:</span>
            <strong>
              {datosReserva?.recursoNombre || (servicioSeleccionado ? servicioSeleccionado.nombre : 'Ambientes deportivos')}
            </strong>
          </div>

          <div className="summary-row">
            <span>Horario:</span>
            <strong>
              {datosReserva?.fecha || '2026-06-05'} {datosReserva?.horaInicio ? `- ${datosReserva.horaInicio.substring(0, 5)}` : '- 11:00'}
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
            disabled={localConfirmando}
          >
            Anterior
          </button>

          <button
            type="button"
            className="summary-confirm-button"
            onClick={manejarConfirmacion}
            disabled={localConfirmando}
          >
            {localConfirmando ? 'Confirmando...' : 'Confirmar reserva'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReservationSummary