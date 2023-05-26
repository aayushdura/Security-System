import axios from 'axios'
import config from 'src/config'

const api = axios.create({
  baseURL: config.apiUrl,
})
api.defaults.headers.post['Content-Type'] = 'application/json'
api.interceptors.request.use(
  (request) => {
    const accessToken = sessionStorage.getItem('accessToken')
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`
    }
    return request
  },
  (error) => {
    console.log('Request error', error)
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  async (response) => {
    if (response.status >= 200 && response.status < 300) {
      const data = response.data
      return Promise.resolve(data)
    }
  },
  async (error) => {
    if (error && error.message === 'Network Error') {
      window.location.href('/500')
    }
    const { request, response } = error
    if (response) {
      if (response.status === 401) {
        sessionStorage.removeItem('accessToken')
      }
      if (response.status >= 400 && response.status < 500) {
        return Promise.reject(error)
      }
    } else if (request) {
      return null
    }
    return Promise.reject(error)
  },
)

export default api
