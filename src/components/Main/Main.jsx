import { useEffect, useState } from 'react'

import ReservationStart from './Student/ReservationStart/ReservationStart'
import GeneralInfo from './Student/GeneralInfo/GeneralInfo'
import ScheduleSelector from './Student/ScheduleSelector/ScheduleSelector'
import Participants from './Student/Participants/Participants'
import ReservationSummary from './Student/ReservationSummary/ReservationSummary'
import MyReservation from './Student/MyReservation/MyReservation'
import News from './Student/News/News'

import ReservasApi from '../../api/reservas.js'
import ParticipantesApi from '../../api/participantes.js'
import HorariosApi from '../../api/horarios.js'

import './Main.css'

const datosReservaIniciales = {
  nombre: '',
  codigo: '',
  campus: '',
  servicioId: null,
  localId: null,
  localNombre: '',
  recursoId: null,
  recursoNombre: '',
  horarioId: null,
  fecha: '',
  horaInicio: '',
  horaFin: '',
  duracion: null,
  participantes: []
}

const Main = ({
  currentSection,
  setCurrentSection,
  usuario
}) => {
  const [paso, setPaso] = useState(1)
  const [reservas, setReservas] = useState([])
  const [servicioSeleccionado, setServicioSeleccionado] =
    useState(null)

  const [datosReserva, setDatosReserva] = useState(
    datosReservaIniciales
  )

  const [cargandoReservas, setCargandoReservas] = useState(false)
  const [confirmandoReserva, setConfirmandoReserva] = useState(false)
  const [procesandoReservaId, setProcesandoReservaId] = useState(null)
  const [errorReservas, setErrorReservas] = useState('')
  const [mensajeReservas, setMensajeReservas] = useState('')

  const cargarReservas = async () => {
    if (!usuario?.id) {
      setReservas([])
      return
    }

    try {
      setCargandoReservas(true)
      setErrorReservas('')

      const respuesta = await ReservasApi.findAll()

      const lista = Array.isArray(respuesta)
        ? respuesta
        : respuesta?.reservas || respuesta?.data || []

      const reservasDelUsuario = lista.filter(
        (reserva) =>
          Number(reserva.usuarioId) === Number(usuario.id)
      )

      setReservas(reservasDelUsuario)
    } catch (error) {
      console.error('Error cargando reservas:', error)
      setErrorReservas('No se pudieron cargar las reservas.')
      setReservas([])
    } finally {
      setCargandoReservas(false)
    }
  }

  useEffect(() => {
    if (currentSection === 'nueva-reserva') {
      setPaso(1)
      setServicioSeleccionado(null)

      setDatosReserva({
        ...datosReservaIniciales,
        nombre: usuario?.nombre || '',
        codigo: usuario?.codigo || ''
      })

      setErrorReservas('')
      setMensajeReservas('')
    }
  }, [currentSection, usuario])

  useEffect(() => {
    if (currentSection === 'mis-reservas' && usuario?.id) {
      cargarReservas()
    }
  }, [currentSection, usuario?.id])

  const actualizarDatosReserva = (nuevosDatos) => {
    setDatosReserva((datosActuales) => ({
      ...datosActuales,
      ...nuevosDatos
    }))
  }

  const seleccionarServicio = (servicio) => {
    setServicioSeleccionado(servicio)

    setDatosReserva((datosActuales) => ({
      ...datosActuales,
      servicioId: Number(servicio.id),
      localId: null,
      localNombre: '',
      recursoId: null,
      recursoNombre: '',
      horarioId: null,
      fecha: '',
      horaInicio: '',
      horaFin: '',
      duracion: null,
      participantes: []
    }))

    setPaso(2)
  }

  const validarDatosReserva = () => {
    if (!usuario?.id) {
      setErrorReservas('No se pudo identificar al usuario.')
      return false
    }

    if (!datosReserva.servicioId) {
      setErrorReservas('No se seleccionó un servicio.')
      return false
    }

    if (!datosReserva.localId) {
      setErrorReservas('No se seleccionó un local.')
      return false
    }

    if (!datosReserva.recursoId) {
      setErrorReservas('No se seleccionó un recurso.')
      return false
    }

    if (!datosReserva.fecha) {
      setErrorReservas('No se seleccionó una fecha.')
      return false
    }

    if (!datosReserva.horaInicio) {
      setErrorReservas('No se seleccionó una hora.')
      return false
    }

    if (!datosReserva.duracion || Number(datosReserva.duracion) <= 0) {
      setErrorReservas('La duración del horario no es válida.')
      return false
    }

    return true
  }

  const confirmarReserva = async () => {
    if (!validarDatosReserva()) {
      return
    }

    try {
      setConfirmandoReserva(true)
      setErrorReservas('')
      setMensajeReservas('')

      const respuestaReserva = await ReservasApi.create({
        fecha: datosReserva.fecha,
        horaInicio: datosReserva.horaInicio,
        duracion: Number(datosReserva.duracion),
        estado: 'Pendiente',
        usuarioId: Number(usuario.id),
        servicioId: Number(datosReserva.servicioId),
        localId: Number(datosReserva.localId),
        recursoId: Number(datosReserva.recursoId)
      })

      const reservaCreada =
        respuestaReserva?.reserva ||
        respuestaReserva?.data ||
        respuestaReserva

      const reservaId =
        reservaCreada?.id ||
        reservaCreada?.reservaId

      if (!reservaId) {
        throw new Error(
          'El backend no devolvió el ID de la reserva creada.'
        )
      }

      const participantesValidos = (
        datosReserva.participantes || []
      ).filter(
        (participante) =>
          participante.nombre?.trim() !== ''
      )

      const resultadosParticipantes =
        await Promise.allSettled(
          participantesValidos.map((participante) =>
            ParticipantesApi.create({
              nombre: participante.nombre.trim(),
              codigo: participante.codigo?.trim() || null,
              reservaId: Number(reservaId)
            })
          )
        )

      const participantesFallidos =
        resultadosParticipantes.filter(
          (resultado) => resultado.status === 'rejected'
        )

      let horarioActualizado = true

      if (datosReserva.horarioId) {
        try {
          const resultadoHorario =
            await HorariosApi.update(
              datosReserva.horarioId,
              {
                estado: 'Ocupado'
              }
            )

          if (!resultadoHorario) {
            horarioActualizado = false
          }
        } catch (error) {
          console.error(
            'La reserva se creó, pero falló el horario:',
            error
          )

          horarioActualizado = false
        }
      }

      if (
        participantesFallidos.length > 0 ||
        !horarioActualizado
      ) {
        setMensajeReservas(
          'La reserva fue creada, pero hubo inconvenientes al registrar participantes o actualizar el horario.'
        )
      } else {
        setMensajeReservas('Reserva creada correctamente.')
      }

      setDatosReserva({
        ...datosReservaIniciales,
        nombre: usuario?.nombre || '',
        codigo: usuario?.codigo || ''
      })

      setServicioSeleccionado(null)
      setPaso(1)

      await cargarReservas()
      setCurrentSection('mis-reservas')
    } catch (error) {
      console.error('Error creando reserva:', error)

      const mensajeBackend =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message

      setErrorReservas(
        mensajeBackend ||
        'Ocurrió un error al registrar la reserva.'
      )
    } finally {
      setConfirmandoReserva(false)
    }
  }

  const cancelarReserva = async (id) => {
    const confirmar = window.confirm(
      '¿Deseas cancelar esta reserva?'
    )

    if (!confirmar) {
      return
    }

    try {
      setProcesandoReservaId(id)
      setErrorReservas('')

      const respuesta = await ReservasApi.update(id, {
        estado: 'Cancelado'
      })

      if (!respuesta) {
        throw new Error('No se recibió respuesta del backend.')
      }

      await cargarReservas()
    } catch (error) {
      console.error('Error cancelando reserva:', error)

      setErrorReservas(
        error?.response?.data?.message ||
        error?.message ||
        'No se pudo cancelar la reserva.'
      )
    } finally {
      setProcesandoReservaId(null)
    }
  }

  return (
    <main className="main">
      {currentSection === 'nueva-reserva' && (
        <>
          {errorReservas && (
            <p className="main-error">
              {errorReservas}
            </p>
          )}

          {mensajeReservas && (
            <p className="main-message">
              {mensajeReservas}
            </p>
          )}

          {paso === 1 && (
            <ReservationStart
              seleccionarServicio={seleccionarServicio}
            />
          )}

          {paso === 2 && (
            <GeneralInfo
              volverPaso={() => setPaso(1)}
              siguientePaso={() => setPaso(3)}
              servicioSeleccionado={servicioSeleccionado}
              datosReserva={datosReserva}
              actualizarDatosReserva={actualizarDatosReserva}
            />
          )}

          {paso === 3 && (
            <ScheduleSelector
              volverPaso={() => setPaso(2)}
              siguientePaso={() => setPaso(4)}
              servicioSeleccionado={servicioSeleccionado}
              datosReserva={datosReserva}
              actualizarDatosReserva={actualizarDatosReserva}
            />
          )}

          {paso === 4 && (
            <Participants
              volverPaso={() => setPaso(3)}
              siguientePaso={() => setPaso(5)}
              datosReserva={datosReserva}
              actualizarDatosReserva={actualizarDatosReserva}
            />
          )}

          {paso === 5 && (
            <ReservationSummary
              volverPaso={() => setPaso(4)}
              confirmarReserva={confirmarReserva}
              servicioSeleccionado={servicioSeleccionado}
              datosReserva={datosReserva}
              confirmando={confirmandoReserva}
            />
          )}
        </>
      )}

      {currentSection === 'mis-reservas' && (
        <>
          {mensajeReservas && (
            <p className="main-message">
              {mensajeReservas}
            </p>
          )}

          <MyReservation
            reservas={reservas}
            cancelarReserva={cancelarReserva}
            cargando={cargandoReservas}
            error={errorReservas}
            procesandoReservaId={procesandoReservaId}
          />
        </>
      )}

      {currentSection === 'noticias' && <News />}
    </main>
  )
}

export default Main