import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/participantes')

    if (response === null) {
        return []
    }

    return response.data
}

const findOne = async (id) => {
    const response = await Base.get(`/api/participantes/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const create = async (participante) => {
    const response = await Base.post('/api/participantes', participante)

    if (response === null) {
        return null
    }

    return response.data
}

const update = async (id, participante) => {
    const response = await Base.put(`/api/participantes/${id}`, participante)

    if (response === null) {
        return null
    }

    return response.data
}

const remove = async (id) => {
    const response = await Base.remove(`/api/participantes/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const ParticipantesApi = {
    findAll,
    findOne,
    create,
    update,
    remove
}

export default ParticipantesApi