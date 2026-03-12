const axios = require("axios")

const ROOT = "http://localhost:3000"
const api = axios.create(
    {
        baseUrl: ROOT,
        timeout: 10000,
        headers:{
            "Content-type": "application/json"
        }
    }   
)

module.exports = {
    api:api
}
