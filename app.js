const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
let usuariosCadastrados = []

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("cadastro");
});

app.get("/login", (req,res) => {
    res.render("login")
})

app.post("/login", (req, res) => {
    const { nome, senha } = req.body;
    const usuario = usuariosCadastrados.find(u => u.nome === nome);
    const resposta = {}
    if (!usuario) {
        resposta.mensagem = "Usuário inexistente"
    }
    else if (usuario.senha !== senha) {
        resposta.mensagem = "Senha incorreta"
    }
    else{
        resposta.mensagem = "Login concluido!"
    }
    res.json(resposta)
});

app.post("/", (req, res) => {
    try {
        const { nome, senha } = req.body;
        usuariosCadastrados.push({ nome, senha });
        console.log("Lista atual:", usuariosCadastrados);
        res.json({mensagem: "Cadastro concluido"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Cadastro falhou!" });
    }
});

app.listen(PORT, () => {
    console.log(`Ola! Servidor rodando em http://localhost:${PORT}`);
});