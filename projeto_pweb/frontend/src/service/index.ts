import api from './api.ts'

export interface Usuario{
    id?: number,
    name: string,
    email: string
}

export async function cadastrarUsuario(usuario: Usuario){
    try{
        const response = await api.post("/users/", usuario)
        return response.data
    }
    catch(error: any){
        if(error.response){
            throw error.response.data
        }
        throw new Error("Erro inesperado ao tentar cadastrar usuário")
    }
}

export async function getUsuarios(){
    try{
        const response = await api.get("/users/")
        return response.data
    }
    catch(error: any){
        if(error.response){
            throw error.response.data
        }
        throw new Error("Erro ao tentar acessar usuários")
    }
}

export async function deleteUsuario(id: number){
    try{
        const response = await api.delete(`/users/${id}`)
        return response.data
    }
    catch(error: any){
        if(error.response){
            throw error.response.data
        }
        throw new Error("Erro inesperado ao tentar deletar usuário")
    }
}

export async function patchUsuario(id: number, dadosUsuario: { nome?: string, email?: string}){
    try{
        const response = await api.patch(`/users/${id}`, dadosUsuario)
        return response.data
    }
    catch(error: any){
        if(error.response){
            throw error.response.data
        }
        throw new Error("Erro inesperado ao tentar atualizar usuário")
    }
}