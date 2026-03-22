import { useEffect, useState } from 'react'
import './App.css'
import { type Usuario, cadastrarUsuario, getUsuarios, deleteUsuario, patchUsuario } from './service'

function App() {
  const [usuario, setUsuario] = useState<Usuario>({name: "", email: ""})
  const [usuarios, setUsuarios] = useState<Array<Usuario>>([])

  function handleUpdate(e: any){
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  async function fazerCadastro(){
    try{
      const response = await cadastrarUsuario(usuario)
      if(response.error){
        alert(response.error)
      }
      else{
        alert(response.mensagem)
      }
    }
    catch(error: any){
      throw Error
    }
  }

  async function atualizarListaUsuarios(){
    try{
      const response = await getUsuarios()
      setUsuarios(response)
    }
    catch(error){
      alert("Erro ao cadastrar usuario! Talvez um usuario com esse email ja existe")
      console.error(error)
    }
  }

  async function removerUsuario(id: number){
    try{
      const response = await deleteUsuario(id)
      if(response.error){
        alert(response.error)
        return
      }
      await atualizarListaUsuarios()
      alert(response.mensagem)
    }
    catch(error){
      console.error(error)
    }
  }

  async function atualizarUsuario(id: number, novosDados: {name?: string, email?: string}){
    try{
      const response = await patchUsuario(id , novosDados)
      if(response.error){
        alert(response.error)
        return
      }
      await atualizarListaUsuarios()
      alert(response.mensagem)
    }
    catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    atualizarListaUsuarios()
  }, [])

  return (
    <>
      <div>
        <form method="POST">
          <label htmlFor="name">Nome: </label>
          <input type="text" name="name" onChange={handleUpdate} autoComplete='off'/><br />
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" onChange={handleUpdate} autoComplete='off'/><br />
          <button type="button" onClick={fazerCadastro}>Cadastrar</button>
        </form>
        <button type="button" onClick={atualizarListaUsuarios} >Atualizar lista</button>
          {usuarios.length === 0 ? (
          <p>Nenhum usuário cadastrado ainda.</p>
        ) : (
          <ul>
            {usuarios.map(u => 
            <li key={u.id}>
              id: {u.id} <br />
              Nome: {u.name} <br />
              Email: {u.email} <br />
              <button type="button" onClick={() => removerUsuario(u.id as number)}>Remover usuario</button><br />
              <button type="button" onClick={() => {atualizarUsuario(u.id as number, {name: prompt("novo nome: ") as string })}}>Atualizar usuario</button>
            </li>)}
          </ul>
        )}
      </div>
    </>
  )
}

export default App
