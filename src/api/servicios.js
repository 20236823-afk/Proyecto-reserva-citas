import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/servicios')

    if (response === null) {
        return []
    }

    return response.data
}

const findOne = async (id) => {
    const response = await Base.get(`/api/servicios/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const create = async (servicio) => {
    const response = await Base.post('/api/servicios', servicio)

    if (response === null) {
        return null
    }

    return response.data
}

const update = async (id, servicio) => {
    const response = await Base.put(`/api/servicios/${id}`, servicio)

    if (response === null) {
        return null
    }

    return response.data
}

const remove = async (id) => {
    const response = await Base.remove(`/api/servicios/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const ServiciosApi = {
    findAll,
    findOne,
    create,
    update,
    remove
}

export default ServiciosApi