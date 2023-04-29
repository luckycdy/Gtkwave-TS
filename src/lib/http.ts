import axios from 'axios'

const http = axios.create(
    {
        baseURL: 'http://localhost:3000/api',
    }
)

http.interceptors.response.use(response => {
    const res = response.data
    return res
}, error => {
    const { err } = error.response.data
    return Promise.reject(err)
})

export default http
