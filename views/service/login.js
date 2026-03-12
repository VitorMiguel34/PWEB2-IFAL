const { api } = require("service.js")

async function logarUsuario(e){
    e.preventDefault()
    try{
        const dados = {
            nome: document.getElementById("nome").value,
            senha: document.getElementById("senha").value
        }
        const response = await api.post("/login", dados)
    }
    catch(error){
        if(error.response){
            throw error.response.data
        }
        throw error
    }
}