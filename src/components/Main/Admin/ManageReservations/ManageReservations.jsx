import { useState } from 'react'
import './ManageReservations.css'

// Datos simulados de reservas de estudiantes.
const reservasIniciales = [
  { id: '0000309481', estudiante: 'Antonio Sifuentes', codigo: '20236823', servicio: 'Ambientes deportivos', local: 'Centro Deportivo Mayorazgo', fecha: '03/06/2026', horario: '07:00 - 07:50', estado: 'Pendiente' },
  { id: '0000305573', estudiante: 'María Gonzales', codigo: '20231145', servicio: 'Reserva de cubículos', local: 'Biblioteca Central', fecha: '29/05/2026', horario: '10:00 - 10:50', estado: 'Confirmado' },
  { id: '0000305293', estudiante: 'Luis Ramírez', codigo: '20239988', servicio: 'Reserva de Laboratorios', local: 'Pabellón S', fecha: '28/05/2026', horario: '15:00 - 15:50', estado: 'Confirmado' },
  { id: '0000306210', estudiante: 'Carla Díaz', codigo: '20235567', servicio: 'Préstamo de equipos (SERCOM)', local: 'SERCOM', fecha: '05/06/2026', horario: '12:00 - 13:00', estado: 'Pendiente' },
  { id: '0000306877', estudiante: 'Jorge Paredes', codigo: '20234321', servicio: 'Ambientes técnicos (SERCOM)', local: 'SERCOM', fecha: '06/06/2026', horario: '09:00 - 09:50', estado: 'Cancelado' }
]

const filtros = ['Todas', 'Pendiente', 'Confirmado', 'Cancelado']

const ManageReservations = () => {
  const [reservas, setReservas] = useState(reservasIniciales)
  const [filtro, setFiltro] = useState('Todas')
  const [detalle, setDetalle] = useState(null) // reserva mostrada en el modal

  // Cambia el estado de una reserva (aprobar, rechazar, cancelar)
  const cambiarEstado = (id, nuevoEstado) => {
    setReservas(reservas.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r)))
  }

  const reservasFiltradas = filtro === 'Todas'
    ? reservas
    : reservas.filter((r) => r.estado === filtro)

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
                  <td>{r.estudiante}</td>
                  <td>{r.codigo}</td>
                  <td>{r.servicio}</td>
                  <td>{r.local}</td>
                  <td>{r.fecha}</td>
                  <td>{r.horario}</td>
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

      {/* Modal de detalle */}
      {detalle && (
        <div className="modal-overlay" onClick={() => setDetalle(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Detalle de la reserva</h3>
            <p><span>ID Reserva:</span> {detalle.id}</p>
            <p><span>Estudiante:</span> {detalle.estudiante}</p>
            <p><span>Código:</span> {detalle.codigo}</p>
            <p><span>Servicio:</span> {detalle.servicio}</p>
            <p><span>Local:</span> {detalle.local}</p>
            <p><span>Fecha:</span> {detalle.fecha}</p>
            <p><span>Horario:</span> {detalle.horario}</p>
            <p><span>Estado:</span> {detalle.estado}</p>
            <button className="modal-cerrar" onClick={() => setDetalle(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default ManageReservations
