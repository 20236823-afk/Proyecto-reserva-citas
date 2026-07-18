import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/recursos')

    if (response === null) {
        return []
    }

    return response.data
}

const RecursosApi = {
    findAll
}

export default RecursosApi