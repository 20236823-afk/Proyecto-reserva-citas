import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/noticias')

    if (response === null) {
        return []
    }

    return response.data
}

const findOne = async (id) => {
    const response = await Base.get(`/api/noticias/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const create = async (noticia) => {
    const response = await Base.post('/api/noticias', noticia)

    if (response === null) {
        return null
    }

    return response.data
}

const update = async (id, noticia) => {
    const response = await Base.put(`/api/noticias/${id}`, noticia)

    if (response === null) {
        return null
    }

    return response.data
}

const remove = async (id) => {
    const response = await Base.remove(`/api/noticias/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const NoticiasApi = {
    findAll,
    findOne,
    create,
    update,
    remove
}

export default NoticiasApi