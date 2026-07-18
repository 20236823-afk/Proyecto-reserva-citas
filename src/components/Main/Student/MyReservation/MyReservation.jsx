import { useState, useEffect } from 'react'
import './MyReservation.css'
import ReservasApi from '../../../../api/reservas.js'

const MyReservation = () => {
  const [reservas, setReservas] = useState([])
  const [loadingReservas, setLoadingReservas] = useState(true)
  const [errorReservas, setErrorReservas] = useState(null)
  const [procesandoReservaId, setProcesandoReservaId] = useState(null)
  
  const [filtroEstado, setFiltroEstado] = useState('Todas')
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null)

  // Función para cargar las reservas desde la base de datos
  const cargarReservas = async () => {
    setLoadingReservas(true)
    setErrorReservas(null)
    const datos = await ReservasApi.findAll()
    if (datos) {
      setReservas(datos)
    } else {
      setErrorReservas('Error al cargar las reservas desde el servidor.')
    }
    setLoadingReservas(false)
  }

  // Hook useEffect para que cargue automáticamente al abrir la pantalla
  useEffect(() => {
    cargarReservas()
  }, [])

  // Función para cancelar la reserva (usa el update de la API)
  const cancelarReserva = async (id) => {
    setProcesandoReservaId(id)
    // Cambiamos el estado de la reserva a 'Cancelado'
    const resultado = await ReservasApi.update(id, { estado: 'Cancelado' })
    
    if (resultado) {
      // Recargamos los datos para ver reflejado el cambio
      await cargarReservas()
    } else {
      setErrorReservas('No se pudo cancelar la reserva.')
    }
    setProcesandoReservaId(null)
  }

  const reservasFiltradas = filtroEstado === 'Todas' 
    ? reservas 
    : reservas.filter((reserva) => reserva.estado === filtroEstado)

  const verDetalleReserva = (reserva) => {
    setReservaSeleccionada(reserva)
  }

  const cerrarDetalleReserva = () => {
    setReservaSeleccionada(null)
  }

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return ''
    const partes = fechaStr.split('-')
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`
    }
    return fechaStr
  }

  const formatearHora = (horaStr) => {
    if (!horaStr) return ''
    return horaStr.substring(0, 5)
  }

  const calcularHoraFin = (horaInicio, duracion) => {
    if (!horaInicio) return ''
    const tiempo = duracion || 60
    const partes = horaInicio.split(':')
    const horas = parseInt(partes[0], 10)
    const minutos = parseInt(partes[1], 10)
    
    const fechaBase = new Date()
    fechaBase.setHours(horas, minutos + tiempo, 0)
    
    const horasFin = String(fechaBase.getHours()).padStart(2, '0')
    const minutosFin = String(fechaBase.getMinutes()).padStart(2, '0')
    return `${horasFin}:${minutosFin}`
  }

  if (loadingReservas) {
    return (
      <section className="my-reservations">
        <div className="empty-reservations">Cargando tus reservas reales desde el sistema...</div>
      </section>
    )
  }

  return (
    <section className="my-reservations">
      {errorReservas && <div className="error-message-banner">{errorReservas}</div>}

      {reservaSeleccionada && (
        <div className="reservation-modal-overlay">
          <div className="reservation-modal">
            <div className="reservation-modal-header">
              <div>
                <h2>Detalle de reserva</h2>
                <p>Revise la información registrada para esta reserva.</p>
              </div>

              <button
                className="modal-close-button"
                onClick={cerrarDetalleReserva}
              >
                Cerrar
              </button>
            </div>

            <div className="modal-section">
              <h3>Datos generales</h3>

              <div className="modal-row">
                <span>ID Reserva:</span>
                <strong>{reservaSeleccionada.id}</strong>
              </div>

              <div className="modal-row">
                <span>Servicio:</span>
                <strong>{reservaSeleccionada.Servicio?.nombre || 'General'}</strong>
              </div>

              <div className="modal-row">
                <span>Ubicación:</span>
                <strong>{reservaSeleccionada.Local?.nombre || 'No asignado'}</strong>
              </div>

              <div className="modal-row">
                <span>Recurso:</span>
                <strong>{reservaSeleccionada.Recurso?.nombre || 'No asignado'}</strong>
              </div>

              <div className="modal-row">
                <span>Fecha:</span>
                <strong>{formatearFecha(reservaSeleccionada.fecha)}</strong>
              </div>

              <div className="modal-row">
                <span>Horario:</span>
                <strong>
                  {formatearHora(reservaSeleccionada.horaInicio)} - {calcularHoraFin(reservaSeleccionada.horaInicio, reservaSeleccionada.duracion)}
                </strong>
              </div>

              <div className="modal-row">
                <span>Estado:</span>
                <strong>{reservaSeleccionada.estado}</strong>
              </div>
            </div>

            <div className="modal-section">
              <h3>Participantes</h3>
              {reservaSeleccionada.Participantes && reservaSeleccionada.Participantes.length > 0 ? (
                reservaSeleccionada.Participantes.map((p, index) => (
                  <div className="participant-summary-modal" key={index} style={{ marginBottom: '8px' }}>
                    <span>{p.codigo || 'S/C'}</span>
                    <strong>{p.nombre}</strong>
                  </div>
                ))
              ) : (
                <div className="summary-description">No se registraron participantes adicionales.</div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="reservations-filters">
        <button
          className={filtroEstado === 'Todas' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFiltroEstado('Todas')}
        >
          Todas
        </button>

        <button
          className={filtroEstado === 'Confirmado' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFiltroEstado('Confirmado')}
        >
          Confirmadas
        </button>

        <button
          className={filtroEstado === 'Pendiente' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFiltroEstado('Pendiente')}
        >
          Pendientes
        </button>

        <button
          className={filtroEstado === 'Cancelado' ? 'filter-button active' : 'filter-button'}
          onClick={() => setFiltroEstado('Cancelado')}
        >
          Canceladas
        </button>
      </div>

      <div className="reservations-table-container">
        <table className="reservations-table">
          <thead>
            <tr>
              <th>ID Reserva</th>
              <th>Local</th>
              <th>Recurso</th>
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Horario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {reservasFiltradas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.id}</td>
                <td>{reserva.Local?.nombre || 'No asignado'}</td>
                <td>{reserva.Recurso?.nombre || 'No asignado'}</td>
                <td>{reserva.Servicio?.nombre || 'General'}</td>
                <td>{formatearFecha(reserva.fecha)}</td>
                <td>
                  {formatearHora(reserva.horaInicio)} - {calcularHoraFin(reserva.horaInicio, reserva.duracion)}
                </td>
                <td>
                  <span className={`status-badge ${reserva.estado ? reserva.estado.toLowerCase() : ''}`}>
                    {reserva.estado}
                  </span>
                </td>
                <td>
                  <div className="reservation-actions">
                    <button
                      className="detail-button"
                      onClick={() => verDetalleReserva(reserva)}
                    >
                      Ver detalle
                    </button>

                    <button
                      className="cancel-button"
                      disabled={reserva.estado === 'Cancelado' || procesandoReservaId === reserva.id}
                      onClick={() => cancelarReserva(reserva.id)}
                    >
                      {procesandoReservaId === reserva.id ? 'Cancelando...' : 'Cancelar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {reservasFiltradas.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-reservations">
                  No hay reservas para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default MyReservation