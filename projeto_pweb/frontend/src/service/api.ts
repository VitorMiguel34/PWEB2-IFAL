import axios from 'axios'

const api = axios.create({
    timeout: 10000,
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    },
})

export default api