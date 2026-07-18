import { useEffect, useState } from 'react'
import HorariosApi from '../../../../api/horarios.js'
import './ManageSchedules.css'

const filtros = ['Todos', 'Disponible', 'Ocupado', 'Bloqueado']

const ManageSchedules = () => {
  const [horarios, setHorarios] = useState([])
  const [filtro, setFiltro] = useState('Todos')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [horarioActualizando, setHorarioActualizando] = useState(null)

  useEffect(() => {
    cargarHorarios()
  }, [])

  const cargarHorarios = async () => {
    setCargando(true)
    setError('')

    try {
      const horariosObtenidos = await HorariosApi.findAll()
      setHorarios(horariosObtenidos)
    } catch (errorPeticion) {
      console.error('Error al cargar horarios:', errorPeticion)
      setError('No se pudieron cargar los horarios.')
    } finally {
      setCargando(false)
    }
  }

  const cambiarEstado = async (horario, nuevoEstado) => {
    setHorarioActualizando(horario.id)
    setError('')

    try {
      const horarioActualizado = {
        fecha: horario.fecha,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
        estado: nuevoEstado,
        servicioId: horario.servicioId,
        localId: horario.localId
      }

      await HorariosApi.update(horario.id, horarioActualizado)

      setHorarios((horariosActuales) =>
        horariosActuales.map((horarioActual) =>
          horarioActual.id === horario.id
            ? {
                ...horarioActual,
                estado: nuevoEstado
              }
            : horarioActual
        )
      )
    } catch (errorPeticion) {
      console.error('Error al actualizar horario:', errorPeticion)
      setError('No se pudo actualizar el estado del horario.')
    } finally {
      setHorarioActualizando(null)
    }
  }

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return '-'
    }

    const [anio, mes, dia] = fecha.split('-')
    return `${dia}/${mes}/${anio}`
  }

  const formatearHora = (hora) => {
    if (!hora) {
      return '-'
    }

    return hora.slice(0, 5)
  }

  const obtenerNombreServicio = (horario) => {
    return (
      horario.Servicio?.nombre ||
      horario.servicio?.nombre ||
      horario.servicio ||
      `Servicio ${horario.servicioId}`
    )
  }

  const obtenerNombreLocal = (horario) => {
    return (
      horario.Local?.nombre ||
      horario.local?.nombre ||
      horario.local ||
      `Local ${horario.localId}`
    )
  }

  const horariosFiltrados =
    filtro === 'Todos'
      ? horarios
      : horarios.filter((horario) => horario.estado === filtro)

  return (
    <section className="manage-schedules">
      <div className="manage-header">
        <h2>Gestión de horarios</h2>
        <p>Administra la disponibilidad de horarios por servicio.</p>
      </div>

      <div className="schedules-filtros">
        {filtros.map((filtroDisponible) => (
          <button
            key={filtroDisponible}
            type="button"
            className={
              filtro === filtroDisponible
                ? 'schedules-filtro active'
                : 'schedules-filtro'
            }
            onClick={() => setFiltro(filtroDisponible)}
          >
            {filtroDisponible}
          </button>
        ))}
      </div>

      {error && (
        <p className="schedules-error">
          {error}
        </p>
      )}

      <div className="schedules-tabla-wrapper">
        <table className="schedules-tabla">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Local</th>
              <th>Fecha</th>
              <th>Hora inicio</th>
              <th>Hora fin</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {cargando ? (
              <tr>
                <td colSpan="7" className="schedules-vacio">
                  Cargando horarios...
                </td>
              </tr>
            ) : horariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" className="schedules-vacio">
                  No hay horarios en esta categoría.
                </td>
              </tr>
            ) : (
              horariosFiltrados.map((horario) => {
                const actualizando =
                  horarioActualizando === horario.id

                return (
                  <tr key={horario.id}>
                    <td>{obtenerNombreServicio(horario)}</td>

                    <td>{obtenerNombreLocal(horario)}</td>

                    <td>{formatearFecha(horario.fecha)}</td>

                    <td>{formatearHora(horario.horaInicio)}</td>

                    <td>{formatearHora(horario.horaFin)}</td>

                    <td>
                      <span
                        className={`horario-estado estado-${horario.estado.toLowerCase()}`}
                      >
                        {horario.estado}
                      </span>
                    </td>

                    <td className="schedules-acciones">
                      {horario.estado !== 'Disponible' && (
                        <button
                          type="button"
                          className="btn-liberar"
                          disabled={actualizando}
                          onClick={() =>
                            cambiarEstado(horario, 'Disponible')
                          }
                        >
                          Liberar
                        </button>
                      )}

                      {horario.estado !== 'Ocupado' && (
                        <button
                          type="button"
                          className="btn-ocupar"
                          disabled={actualizando}
                          onClick={() =>
                            cambiarEstado(horario, 'Ocupado')
                          }
                        >
                          Marcar ocupado
                        </button>
                      )}

                      {horario.estado !== 'Bloqueado' && (
                        <button
                          type="button"
                          className="btn-bloquear"
                          disabled={actualizando}
                          onClick={() =>
                            cambiarEstado(horario, 'Bloqueado')
                          }
                        >
                          Bloquear
                        </button>
                      )}

                      {actualizando && (
                        <span className="schedules-updating">
                          Guardando...
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ManageSchedules