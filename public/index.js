async function cadastrarUsuario(e){
    e.preventDefault()
    try{
        const dados = {
            nome: document.getElementById("nome").ariaValueMax,
            senha: document.getElementById("senha").ariaValueMax
        }
        const response = await api.post("/cadastroUsuario", dados)
    }
    catch(error){
        if(error.response){
            throw error.response.data 
        }
        throw error
    }
}

async function atualizarListaUsuarios(){
    try{
        const response = await api.get("/listaUsuarios")
        console.log(response.data)
        const usuarios = response.data.usuarios
        document.getElementById("listaUsuarios").innerHTML = ""
        for(let usuario of usuarios){
            alert(usuario.nome)
            document.getElementById("listaUsuarios").innerHTML += `
                <li>
                    <p>Nome: ${usuario.nome}</p>
                    <p>Senha: ${usuario.senha}</p>
                </li>
            ` 
        }
    }
    catch(error){
        if(error.response){
            throw error.response.data
        }
        throw Error("Erro inesperado ao tentar atualizar a lista de usuários")
    }
}

document.getElementById("formLogin").addEventListener("submit", cadastrarUsuario)
document.getElementById("botaoAtualizarUsuarios").addEventListener("click", atualizarListaUsuarios)