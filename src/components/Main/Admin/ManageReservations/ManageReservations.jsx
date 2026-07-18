import { useState, useEffect } from 'react'
import './ManageReservations.css'

const API_URL = 'http://localhost:3005/api'

const filtros = ['Todas', 'Pendiente', 'Confirmado', 'Cancelado']

// arma "07:00 - 08:00" a partir de la hora de inicio y la duracion en minutos
const formatearHorario = (horaInicio, duracionMin) => {
  const [h, m] = horaInicio.split(':').map(Number)
  const inicioMin = h * 60 + m
  const finMin = inicioMin + duracionMin
  const aTexto = (min) => {
    const hh = String(Math.floor(min / 60)).padStart(2, '0')
    const mm = String(min % 60).padStart(2, '0')
    return `${hh}:${mm}`
  }
  return `${aTexto(inicioMin)} - ${aTexto(finMin)}`
}

const ManageReservations = () => {
  const [reservas, setReservas] = useState([])
  const [filtro, setFiltro] = useState('Todas')
  const [detalle, setDetalle] = useState(null)
  const [cargando, setCargando] = useState(true)

  // trae las reservas del backend
  const cargarReservas = () => {
    setCargando(true)
    fetch(`${API_URL}/reservas`)
      .then((res) => res.json())
      .then((data) => setReservas(data))
      .catch((err) => console.error(err))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarReservas()
  }, [])

  // aprobar, rechazar o cancelar: hace PUT al backend y despues recarga la lista
  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await fetch(`${API_URL}/reservas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      })
      cargarReservas() // vuelve a pedir la lista actualizada
    } catch (err) {
      console.error(err)
    }
  }

  const reservasFiltradas = filtro === 'Todas'
    ? reservas
    : reservas.filter((r) => r.estado === filtro)

  if (cargando) {
    return (
      <section className="manage-reservations">
        <div className="manage-header">
          <h2>Gestión de reservas</h2>
        </div>
        <p>Cargando reservas...</p>
      </section>
    )
  }

  return (
    <section className="manage-reservations">
      <div className="manage-header">
        <h2>Gestión de reservas</h2>
        <p>Administra las reservas realizadas por los estudiantes.</p>
      </div>

      <div className="manage-filtros">
        {filtros.map((f) => (
          <button
            key={f}
            className={filtro === f ? 'manage-filtro active' : 'manage-filtro'}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="manage-tabla-wrapper">
        <table className="manage-tabla">
          <thead>
            <tr>
              <th>ID Reserva</th><th>Estudiante</th><th>Código</th><th>Servicio</th>
              <th>Local</th><th>Fecha</th><th>Horario</th><th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservasFiltradas.length === 0 ? (
              <tr><td colSpan="9" className="manage-vacio">No hay reservas en esta categoría.</td></tr>
            ) : (
              reservasFiltradas.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.Usuario?.nombre}</td>
                  <td>{r.Usuario?.codigo}</td>
                  <td>{r.Servicio?.nombre}</td>
                  <td>{r.Local?.nombre ?? '—'}</td>
                  <td>{r.fecha}</td>
                  <td>{formatearHorario(r.horaInicio, r.duracion)}</td>
                  <td>
                    <span className={`estado estado-${r.estado.toLowerCase()}`}>{r.estado}</span>
                  </td>
                  <td className="manage-acciones">
                    {r.estado === 'Pendiente' && (
                      <>
                        <button className="btn-aprobar" onClick={() => cambiarEstado(r.id, 'Confirmado')}>Aprobar</button>
                        <button className="btn-rechazar" onClick={() => cambiarEstado(r.id, 'Cancelado')}>Rechazar</button>
                      </>
                    )}
                    {r.estado === 'Confirmado' && (
                      <button className="btn-cancelar" onClick={() => cambiarEstado(r.id, 'Cancelado')}>Cancelar</button>
                    )}
                    <button className="btn-detalle" onClick={() => setDetalle(r)}>Ver detalle</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {detalle && (
        <div className="modal-overlay" onClick={() => setDetalle(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Detalle de la reserva</h3>
            <p><span>ID Reserva:</span> {detalle.id}</p>
            <p><span>Estudiante:</span> {detalle.Usuario?.nombre}</p>
            <p><span>Código:</span> {detalle.Usuario?.codigo}</p>
            <p><span>Servicio:</span> {detalle.Servicio?.nombre}</p>
            <p><span>Local:</span> {detalle.Local?.nombre ?? '—'}</p>
            <p><span>Fecha:</span> {detalle.fecha}</p>
            <p><span>Horario:</span> {formatearHorario(detalle.horaInicio, detalle.duracion)}</p>
            <p><span>Estado:</span> {detalle.estado}</p>
            <button className="modal-cerrar" onClick={() => setDetalle(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default ManageReservations
