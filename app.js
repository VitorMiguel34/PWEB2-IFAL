const express = require("express")

app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const PORT = 3000

app.listen(PORT, () => {
    console.log(`Ola! Servidor rodando em http://localhost:${PORT}`)
})

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/", (req,res) => {
    try{
        const nome = req.body.nome
        const senha = req.body.senha
        console.log(nome, senha)
        res.json({
            mensagem: "Cadastro bem sucedido!"
        })
    }
    catch(error){
        console.log(error)
        res.json({
            mensagem:"Cadastro falhou!"
        })
    }
})

app.get("/:id", (req,res) => {
    try{
        const id = req.params.id
        res.send(id)
    }
    catch(error){
        res.send(error)
    }
})