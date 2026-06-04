import './News.css'

const noticias = [
  {
    id: 1,
    categoria: 'Evento',
    titulo: 'Semana universitaria',
    fecha: '10/06/2026',
    descripcion: 'Participa en actividades deportivas, culturales y académicas organizadas por la universidad.'
  },
  {
    id: 2,
    categoria: 'Comunicado',
    titulo: 'Mantenimiento de laboratorios',
    fecha: '15/06/2026',
    descripcion: 'Algunos laboratorios no estarán disponibles durante el mantenimiento programado.'
  },
  {
    id: 3,
    categoria: 'Deportes',
    titulo: 'Torneo interno de fulbito',
    fecha: '20/06/2026',
    descripcion: 'Inscríbete con tu equipo y participa en el torneo deportivo del ciclo académico.'
  }
]

const News = () => {
  return (
    <section className="news-section">
      <div className="news-header">
        <h2>Noticias</h2>
        <p>Revisa eventos, comunicados y actividades importantes de la universidad.</p>
      </div>

      <div className="news-grid">
        {noticias.map((noticia) => (
          <article className="news-card" key={noticia.id}>
            <div className="news-card-header">
              <span className="news-category">{noticia.categoria}</span>
              <span className="news-date">{noticia.fecha}</span>
            </div>

            <h3>{noticia.titulo}</h3>
            <p>{noticia.descripcion}</p>

            <button className="news-button">
              Ver más
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default News