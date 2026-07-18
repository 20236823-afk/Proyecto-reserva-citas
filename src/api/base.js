import axios from 'axios'

const URI = 'http://localhost:3005'

const get = async (endpoint) => {
    const url = URI.concat(endpoint)
    return await axios.get(url)
}

const post = async (endpoint, request) => {
    const url = URI.concat(endpoint)
    return await axios.post(url, request)
}

const put = async (endpoint, request) => {
    const url = URI.concat(endpoint)
    return await axios.put(url, request)
}

const remove = async (endpoint) => {
    const url = URI.concat(endpoint)
    return await axios.delete(url)
}

const Base = {
    get,
    post,
    put,
    remove
}

export default Base