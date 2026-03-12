const { api } = require("service/service.js")

async function cadastrarUsuario(e){
    e.preventDefault()
    try{
        const dados = {
            nome: document.getElementById("nome").ariaValueMax,
            senha: document.getElementById("senha").ariaValueMax
        }
        const response = await api.post("/", dados)
    }
    catch(error){
        if(error.response){
            throw error.response.data 
        }
        throw error
    }
}

document.getElementById("formCadastro").addEventListener("submit", cadastrarUsuario)