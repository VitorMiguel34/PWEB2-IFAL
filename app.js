const express = require("express")
const path = require("path")

app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const PORT = 3000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

app.listen(PORT, () => {
    console.log(`Ola! Servidor rodando em http://localhost:${PORT}`)
})

app.get("/", (req,res) => {
    const data = {
        titulo:"Pagina inicial",
        nome: req.query.nome
    }
    res.render("index", data)
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
