import { useEffect, useState } from 'react'
import ServiciosApi from '../../../../api/servicios.js'
import './ManageServices.css'

const ManageServices = () => {
  const [servicios, setServicios] = useState([])
  const [editandoId, setEditandoId] = useState(null)
  const [textoEdicion, setTextoEdicion] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarServicios = async () => {
    try {
      setLoading(true)
      setError(null)

      const datos = await ServiciosApi.findAll()
      setServicios(datos)
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

  const alternarEstado = async (servicio) => {
    try {
      setError(null)

      const actualizado = await ServiciosApi.update(servicio.id, {
        estado: !servicio.estado
      })

      if (actualizado === null) {
        setError('No se pudo actualizar el estado del servicio.')
        return
      }

      await cargarServicios()
    } catch (error) {
      console.error(error)
      setError('No se pudo actualizar el estado del servicio.')
    }
  }

  const empezarEdicion = (servicio) => {
    setEditandoId(servicio.id)
    setTextoEdicion(servicio.descripcion)
  }

  const cancelarEdicion = () => {
    setEditandoId(null)
    setTextoEdicion('')
  }

  const guardarEdicion = async (id) => {
    if (textoEdicion.trim() === '') {
      setError('La descripción no puede estar vacía.')
      return
    }

    try {
      setError(null)

      const actualizado = await ServiciosApi.update(id, {
        descripcion: textoEdicion.trim()
      })

      if (actualizado === null) {
        setError('No se pudo actualizar la descripción.')
        return
      }

      setEditandoId(null)
      setTextoEdicion('')

      await cargarServicios()
    } catch (error) {
      console.error(error)
      setError('No se pudo actualizar la descripción.')
    }
  }

  if (loading) {
    return (
      <section className="manage-services">
        <p>Cargando servicios...</p>
      </section>
    )
  }

  return (
    <section className="manage-services">
      <div className="manage-header">
        <h2>Gestión de servicios</h2>
        <p>Administra los servicios disponibles para los estudiantes.</p>
      </div>

      {error && <p>{error}</p>}

      {servicios.length === 0 ? (
        <p>No hay servicios registrados.</p>
      ) : (
        <div className="services-grid">
          {servicios.map((servicio) => (
            <article className="service-card" key={servicio.id}>
              <div className="service-card-top">
                <h3>{servicio.nombre}</h3>

                <span
                  className={
                    servicio.estado
                      ? 'service-estado activo'
                      : 'service-estado inactivo'
                  }
                >
                  {servicio.estado ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              {editandoId === servicio.id ? (
                <textarea
                  className="service-textarea"
                  value={textoEdicion}
                  onChange={(event) => setTextoEdicion(event.target.value)}
                />
              ) : (
                <p className="service-descripcion">
                  {servicio.descripcion}
                </p>
              )}

              <div className="service-acciones">
                <button
                  className={
                    servicio.estado
                      ? 'btn-desactivar'
                      : 'btn-activar'
                  }
                  onClick={() => alternarEstado(servicio)}
                >
                  {servicio.estado ? 'Desactivar' : 'Activar'}
                </button>

                {editandoId === servicio.id ? (
                  <>
                    <button
                      className="btn-guardar"
                      onClick={() => guardarEdicion(servicio.id)}
                    >
                      Guardar
                    </button>

                    <button
                      className="btn-editar"
                      onClick={cancelarEdicion}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-editar"
                    onClick={() => empezarEdicion(servicio)}
                  >
                    Editar descripción
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ManageServices