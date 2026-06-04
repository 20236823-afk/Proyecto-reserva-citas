import ambientesDeportivos from '../../../../assets/ambientes_deportivos.jpg'
import espaciosTecnicos from '../../../../assets/espacios_tecnicos.webp'
import reservaLaboratorio from '../../../../assets/reserva_lab.jpg'
import prestamoEquipos from '../../../../assets/reserva_equipos.jpg'
import reservaCubiculos from '../../../../assets/reserva_cubiculos.webp'

import './ReservationStart.css'

const ReservationStart = () => {
  const servicios = [
    {
      id: 1,
      nombre: 'Ambientes deportivos',
      descripcion: 'Reserva espacios deportivos disponibles dentro de la universidad.',
      imagen: ambientesDeportivos
    },
    {
      id: 2,
      nombre: 'Reserva de ambientes técnicos (SERCOM)',
      descripcion: 'Reserva ambientes técnicos para actividades académicas o prácticas.',
      imagen: espaciosTecnicos
    },
    {
      id: 3,
      nombre: 'Reserva de Laboratorios',
      descripcion: 'Solicita laboratorios especializados según tu necesidad académica.',
      imagen: reservaLaboratorio
    },
    {
      id: 4,
      nombre: 'Préstamo de equipos (SERCOM)',
      descripcion: 'Solicita equipos disponibles para uso académico o audiovisual.',
      imagen: prestamoEquipos
    },
    {
      id: 5,
      nombre: 'Reserva de cubículos',
      descripcion: 'Reserva espacios individuales o grupales para estudio.',
      imagen: reservaCubiculos
    }
  ]

  return (
    <section className="reservation-start">

      <div className="services-grid">
        {servicios.map((servicio) => (
          <article className="service-card" key={servicio.id}>
            <img
              src={servicio.imagen}
              alt={servicio.nombre}
              className="service-image"
            />

            <div className="service-content">
              <h3>{servicio.nombre}</h3>
              <p>{servicio.descripcion}</p>

              <div className="service-actions">
                <button className="info-button">
                  Más información
                </button>

                <button className="reserve-button">
                  Reservar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ReservationStart