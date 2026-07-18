import { useState } from 'react'
import './ManageServices.css'

// Datos simulados de los servicios del campus
const serviciosIniciales = [
  { id: 1, nombre: 'Ambientes deportivos', descripcion: 'Canchas, piscina y espacios deportivos del campus.', reservas: 42, activo: true },
  { id: 2, nombre: 'Reserva de ambientes técnicos (SERCOM)', descripcion: 'Salas y ambientes técnicos administrados por SERCOM.', reservas: 18, activo: true },
  { id: 3, nombre: 'Reserva de Laboratorios', descripcion: 'Laboratorios de ciencias e ingeniería.', reservas: 27, activo: true },
  { id: 4, nombre: 'Préstamo de equipos (SERCOM)', descripcion: 'Equipos audiovisuales y de cómputo en préstamo.', reservas: 31, activo: false },
  { id: 5, nombre: 'Reserva de cubículos', descripcion: 'Cubículos de estudio individuales y grupales en biblioteca.', reservas: 10, activo: true }
]

const ManageServices = () => {
  const [servicios, setServicios] = useState(serviciosIniciales)
  const [editandoId, setEditandoId] = useState(null) // id del servicio que se esta editando
  const [textoEdicion, setTextoEdicion] = useState('')

  // Activa o desactiva un servicio
  const alternarActivo = (id) => {
    setServicios(servicios.map((s) => (s.id === id ? { ...s, activo: !s.activo } : s)))
  }

  // editar la descrip de un servicio
  const empezarEdicion = (servicio) => {
    setEditandoId(servicio.id)
    setTextoEdicion(servicio.descripcion)
  }

  // Guarda la nueva descripción
  const guardarEdicion = (id) => {
    setServicios(servicios.map((s) => (s.id === id ? { ...s, descripcion: textoEdicion } : s)))
    setEditandoId(null)
    setTextoEdicion('')
  }

  return (
    <section className="manage-services">
      <div className="manage-header">
        <h2>Gestión de servicios</h2>
        <p>Administra los servicios disponibles para los estudiantes.</p>
      </div>

      <div className="services-grid">
        {servicios.map((servicio) => (
          <article className="service-card" key={servicio.id}>
            <div className="service-card-top">
              <h3>{servicio.nombre}</h3>
              <span className={servicio.activo ? 'service-estado activo' : 'service-estado inactivo'}>
                {servicio.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>

            {editandoId === servicio.id ? (
              <textarea
                className="service-textarea"
                value={textoEdicion}
                onChange={(e) => setTextoEdicion(e.target.value)}
              />
            ) : (
              <p className="service-descripcion">{servicio.descripcion}</p>
            )}

            <p className="service-reservas">
              Reservas asociadas: <strong>{servicio.reservas}</strong>
            </p>

            <div className="service-acciones">
              <button
                className={servicio.activo ? 'btn-desactivar' : 'btn-activar'}
                onClick={() => alternarActivo(servicio.id)}
              >
                {servicio.activo ? 'Desactivar' : 'Activar'}
              </button>

              {editandoId === servicio.id ? (
                <button className="btn-guardar" onClick={() => guardarEdicion(servicio.id)}>
                  Guardar
                </button>
              ) : (
                <button className="btn-editar" onClick={() => empezarEdicion(servicio)}>
                  Editar descripción
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ManageServices
