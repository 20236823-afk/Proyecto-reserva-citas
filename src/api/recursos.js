import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/recursos')

    if (response === null) {
        return []
    }

    return response.data
}

const findOne = async (id) => {
    const response = await Base.get(`/api/recursos/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const create = async (recurso) => {
    const response = await Base.post('/api/recursos', recurso)

    if (response === null) {
        return null
    }

    return response.data
}

const update = async (id, recurso) => {
    const response = await Base.put(`/api/recursos/${id}`, recurso)

    if (response === null) {
        return null
    }

    return response.data
}

const remove = async (id) => {
    const response = await Base.remove(`/api/recursos/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const RecursosApi = {
    findAll,
    findOne,
    create,
    update,
    remove
}

export default RecursosApi