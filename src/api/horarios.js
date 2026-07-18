import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/horarios')

    if (response === null) {
        return []
    }

    return response.data
}

const findOne = async (id) => {
    const response = await Base.get(`/api/horarios/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const create = async (horario) => {
    const response = await Base.post('/api/horarios', horario)

    if (response === null) {
        return null
    }

    return response.data
}

const update = async (id, horario) => {
    const response = await Base.put(`/api/horarios/${id}`, horario)

    if (response === null) {
        return null
    }

    return response.data
}

const remove = async (id) => {
    const response = await Base.remove(`/api/horarios/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const HorariosApi = {
    findAll,
    findOne,
    create,
    update,
    remove
}

export default HorariosApi