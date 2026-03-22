const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
let usuariosCadastrados = []

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/cadastroUsuario", (req, res) => {
    try {
        const { nome, senha } = req.body;
        const usuarioExistente = usuariosCadastrados.find(u => u.nome === nome)
        if(usuarioExistente){
            res.json({mensagem: "Um usuário com esse nome já existe!"})
        }
        else{
            usuariosCadastrados.push({ nome, senha });
            console.log("Lista atual:", usuariosCadastrados);
            res.json({mensagem: "cadastro concluido!"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Cadastro falhou!" });
    }
});

app.get("/listaUsuarios", (req, res) => {
    console.log("Atualizando lista de usuários...")
    res.json({usuarios: usuariosCadastrados})
})

app.listen(PORT, () => {
    console.log(`Ola! Servidor rodando em http://localhost:${PORT}`);
});