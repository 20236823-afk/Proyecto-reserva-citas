import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/reservas')

    if (response === null) {
        return []
    }

    return response.data
}

const findOne = async (id) => {
    const response = await Base.get(`/api/reservas/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const create = async (reserva) => {
    const response = await Base.post('/api/reservas', reserva)

    if (response === null) {
        return null
    }

    return response.data
}

const update = async (id, reserva) => {
    const response = await Base.put(`/api/reservas/${id}`, reserva)

    if (response === null) {
        return null
    }

    return response.data
}

const remove = async (id) => {
    const response = await Base.remove(`/api/reservas/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const ReservasApi = {
    findAll,
    findOne,
    create,
    update,
    remove
}

export default ReservasApi