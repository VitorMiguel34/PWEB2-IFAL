import axios from 'axios'

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

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault()
    try{
        const dados = {
            nome: document.getElementById("nome").value,
            senha: document.getElementById("senha").value
        }
        const resposta = await api.post("/",dados)
        const dadosResposta = await resposta.json()
        alert(dadosResposta.mensagem)
        e.target.reset()
    }
    catch(error){
        console.error(error)
    }
})