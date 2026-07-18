import { useEffect, useMemo, useState } from 'react'
import HorariosApi from '../../../../api/horarios.js'
import './ScheduleSelector.css'

const ScheduleSelector = ({
  volverPaso,
  siguientePaso,
  servicioSeleccionado,
  datosReserva = {},
  actualizarDatosReserva
}) => {
  const [horarios, setHorarios] = useState([])
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarHorarios = async () => {
      setCargando(true)
      setError('')

      const horariosObtenidos = await HorariosApi.findAll()

      if (horariosObtenidos.length === 0) {
        setError('No se pudieron cargar los horarios.')
      }

      setHorarios(horariosObtenidos)
      setCargando(false)
    }

    cargarHorarios()
  }, [])

  useEffect(() => {
    if (!datosReserva.horarioId) {
      return
    }

    const horarioGuardado = horarios.find(
      (horario) => Number(horario.id) === Number(datosReserva.horarioId)
    )

    if (horarioGuardado) {
      setHorarioSeleccionado(horarioGuardado)
    }
  }, [horarios, datosReserva.horarioId])

  const servicioId = Number(
    servicioSeleccionado?.id || datosReserva.servicioId
  )

  const localId = Number(datosReserva.localId)

  const horariosFiltrados = useMemo(() => {
    return horarios.filter((horario) => {
      return (
        Number(horario.servicioId) === servicioId &&
        Number(horario.localId) === localId
      )
    })
  }, [horarios, servicioId, localId])

  const fechas = useMemo(() => {
    const fechasUnicas = [
      ...new Set(
        horariosFiltrados.map((horario) => horario.fecha)
      )
    ]

    return fechasUnicas.sort()
  }, [horariosFiltrados])

  const horas = useMemo(() => {
    const horasUnicas = [
      ...new Set(
        horariosFiltrados.map((horario) => horario.horaInicio)
      )
    ]

    return horasUnicas.sort()
  }, [horariosFiltrados])

  const obtenerNombreDia = (fecha) => {
    const [anio, mes, dia] = fecha.split('-').map(Number)

    const fechaLocal = new Date(anio, mes - 1, dia)

    const diasSemana = [
      'Dom',
      'Lun',
      'Mar',
      'Mié',
      'Jue',
      'Vie',
      'Sáb'
    ]

    return `${diasSemana[fechaLocal.getDay()]} ${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}`
  }

  const formatearFecha = (fecha) => {
    const [anio, mes, dia] = fecha.split('-')

    return `${dia}/${mes}/${anio}`
  }

  const formatearHora = (hora) => {
    return hora.slice(0, 5)
  }

  const calcularDuracion = (horaInicio, horaFin) => {
    const [horaInicioValor, minutoInicioValor] = horaInicio
      .split(':')
      .map(Number)

    const [horaFinValor, minutoFinValor] = horaFin
      .split(':')
      .map(Number)

    const minutosInicio =
      horaInicioValor * 60 + minutoInicioValor

    const minutosFin =
      horaFinValor * 60 + minutoFinValor

    return minutosFin - minutosInicio
  }

  const seleccionarHorario = (horario) => {
    if (horario.estado !== 'Disponible') {
      return
    }

    setHorarioSeleccionado(horario)
  }

  const confirmarHorario = () => {
    if (!horarioSeleccionado) {
      alert('Seleccione un horario disponible antes de continuar.')
      return
    }

    const duracion = calcularDuracion(
      horarioSeleccionado.horaInicio,
      horarioSeleccionado.horaFin
    )

    actualizarDatosReserva({
      horarioId: Number(horarioSeleccionado.id),
      fecha: horarioSeleccionado.fecha,
      horaInicio: horarioSeleccionado.horaInicio,
      duracion
    })

    siguientePaso()
  }

  const obtenerHorario = (fecha, horaInicio) => {
    return horariosFiltrados.find((horario) => {
      return (
        horario.fecha === fecha &&
        horario.horaInicio === horaInicio
      )
    })
  }

  const obtenerClaseHorario = (horario) => {
    if (!horario) {
      return ''
    }

    const seleccionado =
      Number(horarioSeleccionado?.id) === Number(horario.id)

    if (seleccionado) {
      return 'slot selected'
    }

    if (horario.estado === 'Ocupado') {
      return 'slot occupied'
    }

    if (horario.estado === 'Bloqueado') {
      return 'slot blocked'
    }

    return 'slot'
  }

  const obtenerTituloSemana = () => {
    if (fechas.length === 0) {
      return 'No hay fechas disponibles'
    }

    if (fechas.length === 1) {
      return formatearFecha(fechas[0])
    }

    return `${formatearFecha(fechas[0])} al ${formatearFecha(
      fechas[fechas.length - 1]
    )}`
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
          disabled={!horarioSeleccionado}
        >
          Seleccionar
        </button>
      </div>

      <p className="week-title">
        {cargando ? 'Cargando horarios...' : obtenerTituloSemana()}
      </p>

      {error && (
        <p className="schedule-error">
          {error}
        </p>
      )}

      {!cargando && horariosFiltrados.length === 0 && (
        <p className="schedule-empty">
          No hay horarios disponibles para el servicio y la ubicación
          seleccionados.
        </p>
      )}

      {!cargando && horariosFiltrados.length > 0 && (
        <div className="schedule-table">
          <div className="schedule-row schedule-days">
            <div className="hour-cell">
              Hora Inicio
            </div>

            {fechas.map((fecha) => (
              <div className="day-cell" key={fecha}>
                {obtenerNombreDia(fecha)}
              </div>
            ))}
          </div>

          {horas.map((horaInicio) => (
            <div className="schedule-row" key={horaInicio}>
              <div className="hour-cell">
                {formatearHora(horaInicio)}
              </div>

              {fechas.map((fecha) => {
                const horario = obtenerHorario(fecha, horaInicio)

                return (
                  <div
                    className="day-cell"
                    key={`${fecha}-${horaInicio}`}
                  >
                    {horario && (
                      <button
                        type="button"
                        className={obtenerClaseHorario(horario)}
                        onClick={() => seleccionarHorario(horario)}
                        disabled={horario.estado !== 'Disponible'}
                        title={`${horario.estado}: ${formatearHora(
                          horario.horaInicio
                        )} - ${formatearHora(horario.horaFin)}`}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {horarioSeleccionado && (
        <p className="selected-text">
          Horario seleccionado:{' '}
          {formatearFecha(horarioSeleccionado.fecha)} de{' '}
          {formatearHora(horarioSeleccionado.horaInicio)} a{' '}
          {formatearHora(horarioSeleccionado.horaFin)}
        </p>
      )}
    </section>
  )
}

export default ScheduleSelector