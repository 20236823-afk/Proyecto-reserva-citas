import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/locales')

    if (response === null) {
        return []
    }

    return response.data
}

const LocalesApi = {
    findAll
}

export default LocalesApi