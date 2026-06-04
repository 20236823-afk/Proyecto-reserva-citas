import { useState } from 'react'
import './ManageNews.css'

const noticiasIniciales = [
  { id: 1, titulo: 'Semana universitaria', categoria: 'Evento', fecha: '10/06/2026', descripcion: 'Actividades deportivas, culturales y académicas organizadas por la universidad.', estado: 'Publicada' },
  { id: 2, titulo: 'Mantenimiento de laboratorios', categoria: 'Comunicado', fecha: '15/06/2026', descripcion: 'Algunos laboratorios no estarán disponibles durante el mantenimiento programado.', estado: 'Publicada' },
  { id: 3, titulo: 'Nuevo horario de biblioteca', categoria: 'Noticia', fecha: '20/06/2026', descripcion: 'La biblioteca central amplía su horario de atención durante el ciclo.', estado: 'Borrador' }
]

const categorias = ['Noticia', 'Comunicado', 'Evento']
const filtros = ['Todas', 'Noticia', 'Comunicado', 'Evento']

const ManageNews = () => {
  const [noticias, setNoticias] = useState(noticiasIniciales)
  const [filtro, setFiltro] = useState('Todas')
  // Estado del formulario para crear una noticia nueva
  const [nueva, setNueva] = useState({ titulo: '', categoria: 'Noticia', descripcion: '' })

  const set = (campo, valor) => setNueva({ ...nueva, [campo]: valor })

  const crearNoticia = () => {
    if (!nueva.titulo || !nueva.descripcion) return
    const fechaHoy = new Date().toLocaleDateString('es-PE')
    const noticia = {
      id: Date.now(),
      titulo: nueva.titulo,
      categoria: nueva.categoria,
      fecha: fechaHoy,
      descripcion: nueva.descripcion,
      estado: 'Borrador'
    }
    setNoticias([noticia, ...noticias])
    setNueva({ titulo: '', categoria: 'Noticia', descripcion: '' })
  }

  const alternarEstado = (id) => {
    setNoticias(noticias.map((n) =>
      n.id === id ? { ...n, estado: n.estado === 'Publicada' ? 'Borrador' : 'Publicada' } : n
    ))
  }

  const eliminarNoticia = (id) => {
    setNoticias(noticias.filter((n) => n.id !== id))
  }

  const noticiasFiltradas = filtro === 'Todas'
    ? noticias
    : noticias.filter((n) => n.categoria === filtro)

  return (
    <section className="manage-news">
      <div className="manage-header">
        <h2>Gestión de noticias</h2>
        <p>Crea y administra noticias, comunicados y eventos.</p>
      </div>

      {/* Formulario para crear una noticia */}
      <div className="news-form">
        <h3>Nueva publicación</h3>
        <div className="news-form-row">
          <input
            className="news-input"
            placeholder="Título"
            value={nueva.titulo}
            onChange={(e) => set('titulo', e.target.value)}
          />
          <select
            className="news-select"
            value={nueva.categoria}
            onChange={(e) => set('categoria', e.target.value)}
          >
            {categorias.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <textarea
          className="news-textarea"
          placeholder="Descripción"
          value={nueva.descripcion}
          onChange={(e) => set('descripcion', e.target.value)}
        />
        <button className="news-crear" onClick={crearNoticia}>Crear publicación</button>
      </div>

      {/* Filtros por categoría */}
      <div className="news-filtros">
        {filtros.map((f) => (
          <button
            key={f}
            className={filtro === f ? 'news-filtro active' : 'news-filtro'}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Lista de noticias */}
      <div className="news-lista">
        {noticiasFiltradas.length === 0 ? (
          <p className="news-vacio">No hay publicaciones en esta categoría.</p>
        ) : (
          noticiasFiltradas.map((n) => (
            <article className="news-item" key={n.id}>
              <div className="news-item-top">
                <span className="news-categoria">{n.categoria}</span>
                <span className={n.estado === 'Publicada' ? 'news-estado publicada' : 'news-estado borrador'}>
                  {n.estado}
                </span>
              </div>
              <h3>{n.titulo}</h3>
              <p className="news-fecha">{n.fecha}</p>
              <p className="news-desc">{n.descripcion}</p>
              <div className="news-acciones">
                <button className="news-btn-estado" onClick={() => alternarEstado(n.id)}>
                  {n.estado === 'Publicada' ? 'Pasar a borrador' : 'Publicar'}
                </button>
                <button className="news-btn-eliminar" onClick={() => eliminarNoticia(n.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default ManageNews
