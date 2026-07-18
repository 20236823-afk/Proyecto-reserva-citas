import { useState } from 'react'
import './ManageSchedules.css'

const horariosIniciales = [
  { id: 1, servicio: 'Ambientes deportivos', local: 'Centro Deportivo Mayorazgo', fecha: '10/06/2026', inicio: '07:00', fin: '07:50', estado: 'Disponible' },
  { id: 2, servicio: 'Ambientes deportivos', local: 'Centro Deportivo Mayorazgo', fecha: '10/06/2026', inicio: '08:00', fin: '08:50', estado: 'Ocupado' },
  { id: 3, servicio: 'Reserva de Laboratorios', local: 'Pabellón S', fecha: '11/06/2026', inicio: '10:00', fin: '10:50', estado: 'Disponible' },
  { id: 4, servicio: 'Reserva de cubículos', local: 'Biblioteca Central', fecha: '11/06/2026', inicio: '12:00', fin: '13:00', estado: 'Bloqueado' },
  { id: 5, servicio: 'Préstamo de equipos (SERCOM)', local: 'SERCOM', fecha: '12/06/2026', inicio: '09:00', fin: '09:50', estado: 'Disponible' },
  { id: 6, servicio: 'Reserva de Laboratorios', local: 'Pabellón S', fecha: '12/06/2026', inicio: '15:00', fin: '15:50', estado: 'Ocupado' }
]

const filtros = ['Todos', 'Disponible', 'Ocupado', 'Bloqueado']

const ManageSchedules = () => {
  const [horarios, setHorarios] = useState(horariosIniciales)
  const [filtro, setFiltro] = useState('Todos')

  // Cambia el estado de un horario (liberar, ocupar, bloquear)
  const cambiarEstado = (id, nuevoEstado) => {
    setHorarios(horarios.map((h) => (h.id === id ? { ...h, estado: nuevoEstado } : h)))
  }

  const horariosFiltrados = filtro === 'Todos'
    ? horarios
    : horarios.filter((h) => h.estado === filtro)

  return (
    <section className="manage-schedules">
      <div className="manage-header">
        <h2>Gestión de horarios</h2>
        <p>Administra la disponibilidad de horarios por servicio.</p>
      </div>

      <div className="schedules-filtros">
        {filtros.map((f) => (
          <button
            key={f}
            className={filtro === f ? 'schedules-filtro active' : 'schedules-filtro'}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="schedules-tabla-wrapper">
        <table className="schedules-tabla">
          <thead>
            <tr>
              <th>Servicio</th><th>Local</th><th>Fecha</th>
              <th>Hora inicio</th><th>Hora fin</th><th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horariosFiltrados.length === 0 ? (
              <tr><td colSpan="7" className="schedules-vacio">No hay horarios en esta categoría.</td></tr>
            ) : (
              horariosFiltrados.map((h) => (
                <tr key={h.id}>
                  <td>{h.servicio}</td>
                  <td>{h.local}</td>
                  <td>{h.fecha}</td>
                  <td>{h.inicio}</td>
                  <td>{h.fin}</td>
                  <td>
                    <span className={`horario-estado estado-${h.estado.toLowerCase()}`}>{h.estado}</span>
                  </td>
                  <td className="schedules-acciones">
                    {h.estado !== 'Disponible' && (
                      <button className="btn-liberar" onClick={() => cambiarEstado(h.id, 'Disponible')}>Liberar</button>
                    )}
                    {h.estado !== 'Ocupado' && (
                      <button className="btn-ocupar" onClick={() => cambiarEstado(h.id, 'Ocupado')}>Marcar ocupado</button>
                    )}
                    {h.estado !== 'Bloqueado' && (
                      <button className="btn-bloquear" onClick={() => cambiarEstado(h.id, 'Bloqueado')}>Bloquear</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ManageSchedules
