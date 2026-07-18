import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/usuarios')

    if (response === null) {
        return []
    }

    return response.data
}

const findOne = async (id) => {
    const response = await Base.get(`/api/usuarios/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const create = async (usuario) => {
    const response = await Base.post('/api/usuarios', usuario)

    if (response === null) {
        return null
    }

    return response.data
}

const update = async (id, usuario) => {
    const response = await Base.put(`/api/usuarios/${id}`, usuario)

    if (response === null) {
        return null
    }

    return response.data
}

const remove = async (id) => {
    const response = await Base.remove(`/api/usuarios/${id}`)

    if (response === null) {
        return null
    }

    return response.data
}

const login = async (credenciales) => {
    const response = await Base.post('/api/usuarios/login', credenciales)

    if (response === null) {
        return null
    }

    return response.data
}

const UsuariosApi = {
    findAll,
    findOne,
    create,
    update,
    remove,
    login
}

export default UsuariosApi