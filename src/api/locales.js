import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/locales')

    if (response === null) {
        return []
    }

    return response.data
}

const findOne = async (id) => {
    const response = await Base.get(`/api/locales/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const create = async (local) => {
    const response = await Base.post('/api/locales', local)

    if (response === null) {
        return null
    }

    return response.data
}

const update = async (id, local) => {
    const response = await Base.put(`/api/locales/${id}`, local)

    if (response === null) {
        return null
    }

    return response.data
}

const remove = async (id) => {
    const response = await Base.remove(`/api/locales/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const LocalesApi = {
    findAll,
    findOne,
    create,
    update,
    remove
}

export default LocalesApi