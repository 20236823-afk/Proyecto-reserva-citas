import { useEffect, useState } from 'react'
import ReservationSteps from '../reservationSteps/reservationSteps'
import LocalesApi from '../../../../api/locales.js'
import RecursosApi from '../../../../api/recursos.js'
import './GeneralInfo.css'

const GeneralInfo = ({
  volverPaso,
  siguientePaso,
  servicioSeleccionado,
  datosReserva = {},
  actualizarDatosReserva
}) => {
  const [locales, setLocales] = useState([])
  const [recursos, setRecursos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true)
        setError('')

        const [localesObtenidos, recursosObtenidos] =
          await Promise.all([
            LocalesApi.findAll(),
            RecursosApi.findAll()
          ])

        setLocales(localesObtenidos)
        setRecursos(recursosObtenidos)

        if (
          localesObtenidos.length === 0 ||
          recursosObtenidos.length === 0
        ) {
          setError(
            'No se pudieron cargar los locales o recursos.'
          )
        }
      } catch (error) {
        console.error(error)
        setError(
          'Ocurrió un error al cargar los locales y recursos.'
        )
      } finally {
        setCargando(false)
      }
    }

    cargarDatos()
  }, [])

  const servicioId = Number(
    servicioSeleccionado?.id ||
    datosReserva.servicioId
  )

  const localIdSeleccionado =
    datosReserva.localId !== null &&
    datosReserva.localId !== undefined
      ? Number(datosReserva.localId)
      : null

  const recursoIdSeleccionado =
    datosReserva.recursoId !== null &&
    datosReserva.recursoId !== undefined
      ? Number(datosReserva.recursoId)
      : null

  const recursosFiltrados = recursos.filter((recurso) => {
    return (
      Number(recurso.servicioId) === servicioId &&
      Number(recurso.localId) === localIdSeleccionado
    )
  })

  const manejarCambioNombre = (event) => {
    actualizarDatosReserva({
      nombre: event.target.value
    })
  }

  const manejarCambioCodigo = (event) => {
    actualizarDatosReserva({
      codigo: event.target.value
    })
  }

  const manejarCambioCampus = (event) => {
    actualizarDatosReserva({
      campus: event.target.value
    })
  }

  const manejarCambioLocal = (event) => {
    const valor = event.target.value

    if (valor === '') {
      actualizarDatosReserva({
        localId: null,
        localNombre: '',
        recursoId: null,
        recursoNombre: ''
      })

      return
    }

    const localSeleccionado = locales.find(
      (local) => Number(local.id) === Number(valor)
    )

    actualizarDatosReserva({
      localId: Number(valor),
      localNombre: localSeleccionado?.nombre || '',
      recursoId: null,
      recursoNombre: ''
    })
  }

  const manejarCambioRecurso = (event) => {
    const valor = event.target.value

    if (valor === '') {
      actualizarDatosReserva({
        recursoId: null,
        recursoNombre: ''
      })

      return
    }

    const recursoSeleccionado = recursos.find(
      (recurso) => Number(recurso.id) === Number(valor)
    )

    actualizarDatosReserva({
      recursoId: Number(valor),
      recursoNombre: recursoSeleccionado?.nombre || ''
    })
  }

  const puedeAvanzar =
    datosReserva.nombre?.trim() !== '' &&
    datosReserva.codigo?.trim() !== '' &&
    datosReserva.campus !== '' &&
    localIdSeleccionado !== null &&
    recursoIdSeleccionado !== null

  return (
    <section className="general-info-page">
      <ReservationSteps />

      <div className="general-card">
        <h2>Datos generales</h2>

        <form
          className="general-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="form-row">
            <label>*Ingresar Nombre</label>

            <input
              type="text"
              placeholder="Ingrese su nombre"
              value={datosReserva.nombre || ''}
              onChange={manejarCambioNombre}
            />
          </div>

          <div className="form-row">
            <label>*Ingresar Código</label>

            <input
              type="text"
              placeholder="Ingrese su código"
              value={datosReserva.codigo || ''}
              onChange={manejarCambioCodigo}
            />
          </div>

          <div className="form-row">
            <label>*Campus</label>

            <select
              value={datosReserva.campus || ''}
              onChange={manejarCambioCampus}
            >
              <option value="">
                Seleccione un campus
              </option>

              <option value="Mayorazgo">
                Mayorazgo
              </option>

              <option value="Monterrico">
                Monterrico
              </option>
            </select>
          </div>

          <div className="form-row">
            <label>*Ubicación</label>

            <select
              value={localIdSeleccionado || ''}
              onChange={manejarCambioLocal}
              disabled={cargando}
            >
              <option value="">
                {cargando
                  ? 'Cargando ubicaciones...'
                  : 'Seleccione una ubicación'}
              </option>

              {locales.map((local) => (
                <option
                  key={local.id}
                  value={local.id}
                >
                  {local.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>*Recurso</label>

            <select
              value={recursoIdSeleccionado || ''}
              onChange={manejarCambioRecurso}
              disabled={
                cargando ||
                localIdSeleccionado === null
              }
            >
              <option value="">
                {localIdSeleccionado === null
                  ? 'Seleccione primero una ubicación'
                  : 'Seleccione un recurso'}
              </option>

              {recursosFiltrados.map((recurso) => (
                <option
                  key={recurso.id}
                  value={recurso.id}
                >
                  {recurso.nombre}
                </option>
              ))}

              {localIdSeleccionado !== null &&
                recursosFiltrados.length === 0 && (
                  <option value="" disabled>
                    No hay recursos disponibles
                  </option>
                )}
            </select>
          </div>

          {error && (
            <p className="general-error">
              {error}
            </p>
          )}

          <div className="form-row">
            <label>*Seleccionar horario</label>

            <button
              type="button"
              className="schedule-open-button"
              onClick={siguientePaso}
              disabled={!puedeAvanzar}
            >
              Seleccionar horario
            </button>
          </div>
        </form>

        <div className="buttons">
          <button
            className="previous-button"
            type="button"
            onClick={volverPaso}
          >
            Anterior
          </button>

          <button
            className="next-button"
            type="button"
            onClick={siguientePaso}
            disabled={!puedeAvanzar}
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  )
}

export default GeneralInfo