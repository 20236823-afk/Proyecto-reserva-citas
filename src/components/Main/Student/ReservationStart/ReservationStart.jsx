import { useEffect, useState } from 'react'

import ServiciosApi from '../../../../api/servicios.js'

import ambientesDeportivos from '../../../../assets/ambientes_deportivos.jpg'
import espaciosTecnicos from '../../../../assets/espacios_tecnicos.webp'
import reservaLaboratorio from '../../../../assets/reserva_lab.jpg'
import prestamoEquipos from '../../../../assets/reserva_equipos.jpg'
import reservaCubiculos from '../../../../assets/reserva_cubiculos.webp'

import './ReservationStart.css'

const imagenesServicios = {
  'ambientes_deportivos.jpg': ambientesDeportivos,
  'espacios_tecnicos.webp': espaciosTecnicos,
  'reserva_lab.jpg': reservaLaboratorio,
  'reserva_equipos.jpg': prestamoEquipos,
  'reserva_cubiculos.webp': reservaCubiculos
}

const ReservationStart = ({ seleccionarServicio }) => {
  const [servicios, setServicios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarServicios = async () => {
    try {
      setLoading(true)
      setError(null)

      const datos = await ServiciosApi.findAll()

      const serviciosActivos = datos.filter(
        (servicio) => servicio.estado === true
      )

      setServicios(serviciosActivos)
    } catch (error) {
      console.error(error)
      setError('No se pudieron cargar los servicios.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarServicios()
  }, [])

  const reservarServicio = (servicio) => {
    console.log('Servicio seleccionado:', servicio.nombre)

    if (seleccionarServicio) {
      seleccionarServicio(servicio)
    }
  }

  const abrirMasInformacion = () => {
    window.open(
      'https://webaloe.ulima.edu.pe/portalUL/inicio.jsp',
      '_blank'
    )
  }

  if (loading) {
    return (
      <section className="reservation-start">
        <p>Cargando servicios...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="reservation-start">
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section className="reservation-start">
      {servicios.length === 0 ? (
        <p>No hay servicios disponibles actualmente.</p>
      ) : (
        <div className="services-grid">
          {servicios.map((servicio) => (
            <article className="service-card" key={servicio.id}>
              <img
                src={imagenesServicios[servicio.imagen]}
                alt={servicio.nombre}
                className="service-image"
              />

              <div className="service-content">
                <h3>{servicio.nombre}</h3>

                <p>{servicio.descripcion}</p>

                <div className="service-actions">
                  <button
                    className="info-button"
                    onClick={abrirMasInformacion}
                  >
                    Más información
                  </button>

                  <button
                    className="reserve-button"
                    onClick={() => reservarServicio(servicio)}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ReservationStart