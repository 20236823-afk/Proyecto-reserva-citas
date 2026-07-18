import Base from './base.js'

const findAll = async () => {
    const response = await Base.get('/api/dashboard')

    if (response === null) {
        return []
    }

    return response.data
}

const DashboardApi = {
    findAll
}

export default DashboardApi