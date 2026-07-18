import axios from 'axios'

const URI = 'http://localhost:3005'

const get = async (endpoint) => {
    try {
        const url = URI.concat(endpoint)
        return await axios.get(url)
    } catch (error) {
        console.error(error)
        return null
    }
}

const post = async (endpoint, request) => {
    try {
        const url = URI.concat(endpoint)
        return await axios.post(url, request)
    } catch (error) {
        console.error(error)
        return null
    }
}

const put = async (endpoint, request) => {
    try {
        const url = URI.concat(endpoint)
        return await axios.put(url, request)
    } catch (error) {
        console.error(error)
        return null
    }
}

const remove = async (endpoint) => {
    try {
        const url = URI.concat(endpoint)
        return await axios.delete(url)
    } catch (error) {
        console.error(error)
        return null
    }
}

const Base = {
    get,
    post,
    put,
    remove
}

export default Base