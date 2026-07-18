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
  recursoId: null,
  horarioId: null,
  fecha: '',
  horaInicio: '',
  duracion: null,
  participantes: [] // Ampliado para soportar participantes en el estado central
}

const Main = ({ currentSection, setCurrentSection, usuario }) => {
  const usuarioAutenticado = usuario || { id: 2, nombre: 'Usuario Prueba' }

  const [paso, setPaso] = useState(1)
  const [reservas, setReservas] = useState([]) // Inicialmente vacío, se llena desde PostgreSQL
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null)
  const [datosReserva, setDatosReserva] = useState(datosReservaIniciales)

  const [loadingReservas, setLoadingReservas] = useState(false)
  const [confirmando, setConfirmando] = useState(false)
  const [procesandoReservaId, setProcesandoReservaId] = useState(null)
  const [errorReservas, setErrorReservas] = useState(null)
  const [errorReserva, setErrorReserva] = useState(null)

  const cargarReservas = async () => {
    if (!usuarioAutenticado?.id) return

    try {
      setLoadingReservas(true)
      setErrorReservas(null)

      const datos = await ReservasApi.findAll()

      // Filtrar únicamente las reservas pertenecientes al usuario autenticado
      const reservasDelUsuario = datos.filter(
        (reserva) => Number(reserva.usuarioId) === Number(usuarioAutenticado.id)
      )

      setReservas(reservasDelUsuario)
    } catch (error) {
      console.error(error)
      setErrorReservas('No se pudieron cargar las reservas de la base de datos.')
    } finally {
      setLoadingReservas(false)
    }
  }

  useEffect(() => {
    if (usuarioAutenticado?.id) {
      cargarReservas()
    }
  }, [usuarioAutenticado?.id, currentSection])

  useEffect(() => {
    if (currentSection === 'nueva-reserva') {
      setPaso(1)
      setServicioSeleccionado(null)
      setDatosReserva(datosReservaIniciales)
      setErrorReserva(null)
    }
  }, [currentSection])

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
      recursoId: null,
      horarioId: null,
      fecha: '',
      horaInicio: '',
      duracion: null,
      participantes: []
    }))

    setPaso(2)
  }

  const confirmarReserva = async () => {
    if (!usuarioAutenticado?.id) {
      setErrorReserva('No se identificó al usuario autenticado.')
      return
    }

    if (
      !datosReserva.servicioId ||
      !datosReserva.localId ||
      !datosReserva.recursoId ||
      !datosReserva.fecha ||
      !datosReserva.horaInicio ||
      !datosReserva.duracion
    ) {
      setErrorReserva('Faltan datos obligatorios para completar la reserva.')
      return
    }

    try {
      setConfirmando(true)
      setErrorReserva(null)

      const reservaCreada = await ReservasApi.create({
        usuarioId: usuarioAutenticado.id,
        servicioId: datosReserva.servicioId,
        localId: datosReserva.localId,
        recursoId: datosReserva.recursoId,
        fecha: datosReserva.fecha,
        horaInicio: datosReserva.horaInicio,
        duracion: datosReserva.duracion,
        estado: 'Pendiente'
      })

      if (reservaCreada === null) {
        setErrorReserva('No se pudo crear la reserva en el servidor.')
        return
      }

      const participantesValidos = datosReserva.participantes.filter(
        (p) => p.nombre && p.nombre.trim() !== ''
      )

      for (const participante of participantesValidos) {
        await ParticipantesApi.create({
          nombre: participante.nombre.trim(),
          codigo: participante.codigo ? participante.codigo.trim() : '',
          reservaId: reservaCreada.id
        })
      }

      // 3. Modificar el estado del horario a Ocupado si está integrado
      if (datosReserva.horarioId) {
        try {
          await HorariosApi.update(datosReserva.horarioId, {
            estado: 'Ocupado'
          })
        } catch (errorHorario) {
          console.error('Inconsistencia: No se pudo actualizar el estado del horario.', errorHorario)
        }
      }

      await cargarReservas()

      setDatosReserva(datosReservaIniciales)
      setServicioSeleccionado(null)
      setPaso(1)
      setCurrentSection('mis-reservas')
    } catch (error) {
      console.error(error)
      setErrorReserva('Ocurrió un error al registrar la reserva.')
    } finally {
      setConfirmando(false)
    }
  }

  // Flujo real de cancelación: PUT /api/reservas/:id cambiando el estado a 'Cancelado'
  const cancelarReserva = async (id) => {
    const confirmar = window.confirm('¿Deseas cancelar esta reserva?')
    if (!confirmar) return

    try {
      setProcesandoReservaId(id)
      setErrorReservas(null)

      const actualizada = await ReservasApi.update(id, {
        estado: 'Cancelado'
      })

      if (actualizada === null) {
        setErrorReservas('No se pudo cancelar la reserva en el servidor.')
        return
      }

      await cargarReservas()
    } catch (error) {
      console.error(error)
      setErrorReservas('No se pudo procesar la cancelación.')
    } finally {
      setProcesandoReservaId(null)
    }
  }

  return (
    <main className="main">
      {currentSection === 'nueva-reserva' && (
        <>
          {errorReserva && <div className="error-message-banner">{errorReserva}</div>}
          
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
              confirmando={confirmando}
            />
          )}
        </>
      )}

      {currentSection === 'mis-reservas' && (
        <MyReservation
          reservas={reservas}
          cancelarReserva={cancelarReserva}
          loadingReservas={loadingReservas}
          errorReservas={errorReservas}
          procesandoReservaId={procesandoReservaId}
        />
      )}

      {currentSection === 'noticias' && <News />}
    </main>
  )
}

export default Main