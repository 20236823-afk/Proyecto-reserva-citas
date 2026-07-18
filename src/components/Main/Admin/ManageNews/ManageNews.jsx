import { useEffect, useState } from 'react'
import NoticiasApi from '../../../../api/noticias.js'
import './ManageNews.css'

const categorias = ['Noticia', 'Comunicado', 'Evento', 'Deportes']
const filtros = ['Todas', 'Noticia', 'Comunicado', 'Evento', 'Deportes']

const ManageNews = () => {
  const [noticias, setNoticias] = useState([])
  const [filtro, setFiltro] = useState('Todas')
  const [nueva, setNueva] = useState({
    titulo: '',
    categoria: 'Noticia',
    descripcion: ''
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [creando, setCreando] = useState(false)
  const [procesandoId, setProcesandoId] = useState(null)

  const cargarNoticias = async () => {
    try {
      setLoading(true)
      setError(null)

      const datos = await NoticiasApi.findAll()
      setNoticias(datos)
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

  const actualizarNueva = (campo, valor) => {
    setNueva({
      ...nueva,
      [campo]: valor
    })
  }

  const obtenerFechaActual = () => {
    const hoy = new Date()
    const anio = hoy.getFullYear()
    const mes = String(hoy.getMonth() + 1).padStart(2, '0')
    const dia = String(hoy.getDate()).padStart(2, '0')

    return `${anio}-${mes}-${dia}`
  }

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return ''
    }

    const [anio, mes, dia] = fecha.split('-')
    return `${dia}/${mes}/${anio}`
  }

  const crearNoticia = async () => {
    if (nueva.titulo.trim() === '' || nueva.descripcion.trim() === '') {
      setError('El título y la descripción son obligatorios.')
      return
    }

    try {
      setCreando(true)
      setError(null)

      const noticiaCreada = await NoticiasApi.create({
        titulo: nueva.titulo.trim(),
        categoria: nueva.categoria,
        fecha: obtenerFechaActual(),
        descripcion: nueva.descripcion.trim(),
        estado: 'Borrador'
      })

      if (noticiaCreada === null) {
        setError('No se pudo crear la publicación.')
        return
      }

      setNueva({
        titulo: '',
        categoria: 'Noticia',
        descripcion: ''
      })

      await cargarNoticias()
    } catch (error) {
      console.error(error)
      setError('No se pudo crear la publicación.')
    } finally {
      setCreando(false)
    }
  }

  const alternarEstado = async (noticia) => {
    const nuevoEstado =
      noticia.estado === 'Publicada'
        ? 'Borrador'
        : 'Publicada'

    try {
      setProcesandoId(noticia.id)
      setError(null)

      const noticiaActualizada = await NoticiasApi.update(noticia.id, {
        estado: nuevoEstado
      })

      if (noticiaActualizada === null) {
        setError('No se pudo cambiar el estado de la publicación.')
        return
      }

      await cargarNoticias()
    } catch (error) {
      console.error(error)
      setError('No se pudo cambiar el estado de la publicación.')
    } finally {
      setProcesandoId(null)
    }
  }

  const eliminarNoticia = async (noticia) => {
    const confirmar = window.confirm(
      `¿Deseas eliminar la publicación "${noticia.titulo}"?`
    )

    if (!confirmar) {
      return
    }

    try {
      setProcesandoId(noticia.id)
      setError(null)

      const resultado = await NoticiasApi.remove(noticia.id)

      if (resultado === null) {
        setError('No se pudo eliminar la publicación.')
        return
      }

      await cargarNoticias()
    } catch (error) {
      console.error(error)
      setError('No se pudo eliminar la publicación.')
    } finally {
      setProcesandoId(null)
    }
  }

  const noticiasFiltradas =
    filtro === 'Todas'
      ? noticias
      : noticias.filter(
          (noticia) => noticia.categoria === filtro
        )

  if (loading) {
    return (
      <section className="manage-news">
        <p>Cargando noticias...</p>
      </section>
    )
  }

  return (
    <section className="manage-news">
      <div className="manage-header">
        <h2>Gestión de noticias</h2>
        <p>Crea y administra noticias, comunicados y eventos.</p>
      </div>

      {error && <p>{error}</p>}

      <div className="news-form">
        <h3>Nueva publicación</h3>

        <div className="news-form-row">
          <input
            className="news-input"
            placeholder="Título"
            value={nueva.titulo}
            onChange={(event) =>
              actualizarNueva('titulo', event.target.value)
            }
          />

          <select
            className="news-select"
            value={nueva.categoria}
            onChange={(event) =>
              actualizarNueva('categoria', event.target.value)
            }
          >
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <textarea
          className="news-textarea"
          placeholder="Descripción"
          value={nueva.descripcion}
          onChange={(event) =>
            actualizarNueva('descripcion', event.target.value)
          }
        />

        <button
          className="news-crear"
          onClick={crearNoticia}
          disabled={creando}
        >
          {creando ? 'Creando...' : 'Crear publicación'}
        </button>
      </div>

      <div className="news-filtros">
        {filtros.map((categoria) => (
          <button
            key={categoria}
            className={
              filtro === categoria
                ? 'news-filtro active'
                : 'news-filtro'
            }
            onClick={() => setFiltro(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="news-lista">
        {noticiasFiltradas.length === 0 ? (
          <p className="news-vacio">
            No hay publicaciones en esta categoría.
          </p>
        ) : (
          noticiasFiltradas.map((noticia) => (
            <article className="news-item" key={noticia.id}>
              <div className="news-item-top">
                <span className="news-categoria">
                  {noticia.categoria}
                </span>

                <span
                  className={
                    noticia.estado === 'Publicada'
                      ? 'news-estado publicada'
                      : 'news-estado borrador'
                  }
                >
                  {noticia.estado}
                </span>
              </div>

              <h3>{noticia.titulo}</h3>

              <p className="news-fecha">
                {formatearFecha(noticia.fecha)}
              </p>

              <p className="news-desc">
                {noticia.descripcion}
              </p>

              <div className="news-acciones">
                <button
                  className="news-btn-estado"
                  onClick={() => alternarEstado(noticia)}
                  disabled={procesandoId === noticia.id}
                >
                  {noticia.estado === 'Publicada'
                    ? 'Pasar a borrador'
                    : 'Publicar'}
                </button>

                <button
                  className="news-btn-eliminar"
                  onClick={() => eliminarNoticia(noticia)}
                  disabled={procesandoId === noticia.id}
                >
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