import { useEffect, useState } from 'react'

import ReservationStart from './Student/ReservationStart/ReservationStart'
import GeneralInfo from './Student/GeneralInfo/GeneralInfo'
import ScheduleSelector from './Student/ScheduleSelector/ScheduleSelector'
import Participants from './Student/Participants/Participants'
import ReservationSummary from './Student/ReservationSummary/ReservationSummary'
import MyReservation from './Student/MyReservation/MyReservation'
import News from './Student/News/News'

import './Main.css'

const reservasIniciales = [
  {
    id: '0000309481',
    local: 'Centro Deportivo Mayorazgo',
    recurso: 'Basket cancha completa',
    detalle: 'Cancha completa',
    fecha: '03/06/2026',
    horario: '07:00 - 07:50',
    estado: 'Cancelado'
  },
  {
    id: '0000305573',
    local: 'Centro Deportivo Mayorazgo',
    recurso: 'Basket media cancha',
    detalle: 'Media cancha',
    fecha: '29/05/2026',
    horario: '10:00 - 10:50',
    estado: 'Cancelado'
  },
  {
    id: '0000305293',
    local: 'Centro Deportivo Mayorazgo',
    recurso: 'Piscina',
    detalle: 'Carril de natación',
    fecha: '28/05/2026',
    horario: '15:00 - 15:50',
    estado: 'Confirmado'
  },
  {
    id: '0000306210',
    local: 'Biblioteca Central',
    recurso: 'Cubículo de estudio',
    detalle: 'Cubículo grupal',
    fecha: '05/06/2026',
    horario: '12:00 - 13:00',
    estado: 'Pendiente'
  }
]

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
  duracion: null
}

const Main = ({ currentSection, setCurrentSection }) => {
  const [paso, setPaso] = useState(1)
  const [reservas, setReservas] = useState(reservasIniciales)
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null)
  const [datosReserva, setDatosReserva] = useState(datosReservaIniciales)

  useEffect(() => {
    if (currentSection === 'nueva-reserva') {
      setPaso(1)
      setServicioSeleccionado(null)
      setDatosReserva(datosReservaIniciales)
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
      duracion: null
    }))

    setPaso(2)
  }

  const agregarReserva = () => {
    const nuevaReserva = {
      id: `0000${Math.floor(Math.random() * 900000 + 100000)}`,
      local: 'Centro Deportivo Mayorazgo',
      recurso: servicioSeleccionado
        ? servicioSeleccionado.nombre
        : 'Servicio no seleccionado',
      detalle: servicioSeleccionado
        ? servicioSeleccionado.nombre
        : 'Sin detalle',
      fecha: datosReserva.fecha || 'Sin fecha',
      horario: datosReserva.horaInicio || 'Sin horario',
      estado: 'Confirmado'
    }

    setReservas((reservasActuales) => [
      nuevaReserva,
      ...reservasActuales
    ])

    setDatosReserva(datosReservaIniciales)
    setServicioSeleccionado(null)
    setPaso(1)
    setCurrentSection('mis-reservas')
  }

  const cancelarReserva = (id) => {
    const nuevasReservas = reservas.map((reserva) => {
      if (reserva.id === id) {
        return {
          ...reserva,
          estado: 'Cancelado'
        }
      }

      return reserva
    })

    setReservas(nuevasReservas)
  }

  return (
    <main className="main">
      {currentSection === 'nueva-reserva' && (
        <>
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
            />
          )}

          {paso === 5 && (
            <ReservationSummary
              volverPaso={() => setPaso(4)}
              confirmarReserva={agregarReserva}
              servicioSeleccionado={servicioSeleccionado}
              datosReserva={datosReserva}
            />
          )}
        </>
      )}

      {currentSection === 'mis-reservas' && (
        <MyReservation
          reservas={reservas}
          cancelarReserva={cancelarReserva}
        />
      )}

      {currentSection === 'noticias' && <News />}
    </main>
  )
}

export default Main