import { useEffect, useState } from 'react'
import NoticiasApi from '../../../../api/noticias.js'
import './News.css'

const News = () => {
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargarNoticias = async () => {
    try {
      setLoading(true)
      setError(null)

      const datos = await NoticiasApi.findAll()

      const noticiasPublicadas = datos.filter(
        (noticia) => noticia.estado === 'Publicada'
      )

      setNoticias(noticiasPublicadas)
    } catch (error) {
      console.error(error)
      setError('No se pudieron cargar las noticias.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarNoticias()
  }, [])

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return ''
    }

    const [anio, mes, dia] = fecha.split('-')
    return `${dia}/${mes}/${anio}`
  }

  if (loading) {
    return (
      <section className="news-section">
        <p>Cargando noticias...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="news-section">
        <p>{error}</p>
      </section>
    )
  }

  return (
    <section className="news-section">
      <div className="news-header">
        <h2>Noticias</h2>
        <p>
          Revisa eventos, comunicados y actividades importantes de la
          universidad.
        </p>
      </div>

      {noticias.length === 0 ? (
        <p>No hay noticias publicadas actualmente.</p>
      ) : (
        <div className="news-grid">
          {noticias.map((noticia) => (
            <article className="news-card" key={noticia.id}>
              <div className="news-card-header">
                <span className="news-category">
                  {noticia.categoria}
                </span>

                <span className="news-date">
                  {formatearFecha(noticia.fecha)}
                </span>
              </div>

              <h3>{noticia.titulo}</h3>

              <p>{noticia.descripcion}</p>

              <button className="news-button">
                Ver más
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default News