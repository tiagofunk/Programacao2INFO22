require('dotenv').config()
const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const banco = require("./banco")
const Usuario = require("./usuario")


const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Não resave sessões não modificadas
    saveUninitialized: true, // Cria uma nova sessão mesmo que não tenha dados
}))
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Indica quem pode se conectar 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Permite cookies e cabeçalhos de autorização
    allowedHeaders: ['Content-Type', 'Authorization'] // Liste os cabeçalhos que você espera receber
}));

banco.conexao.sync(function () {
    console.log("Banco de dados conectado.");
})

const PORTA = 3000
app.listen(PORTA, () => {
    console.log("Servidor rodando na porta " + PORTA);
})

app.options('*', (req, res) => {
    res.sendStatus(200); // Responde com 200 OK
});

function validarCamposRegistro(req, res, next) {
    if (!req.body.name) {
        return res.status(422).send({ msg: "O nome é obrigatório" })
    }
    if (!req.body.email) {
        return res.status(422).send({ msg: "O email é obrigatório" })
    }
    if (!req.body.password) {
        return res.status(422).send({ msg: "A senha é obrigatória" })
    }
    if (req.body.password != req.body.confirmPassword) {
        return res.status(422).send({ msg: "As senhas não conferem" })
    }
    next()
}

async function encontrarUsuarioPorEmail(email) {
    const resultado = await Usuario.Usuario.findAll({
        where: { email: email }
    })
    if (resultado.length == 0) return null
    return resultado[0]
}

app.post('/auth/register/', validarCamposRegistro, async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    const usuario = await encontrarUsuarioPorEmail(email)
    if (usuario != null) {
        return res.status(422).send({ msg: "Email já utilizado" })
    }

    const salt = await bcryptjs.genSalt(12)
    const passwordHash = await bcryptjs.hash(password, salt)

    var resultado = await Usuario.Usuario.create({
        "nome": name,
        "email": email,
        "hash": passwordHash
    })
    resultado = resultado.toJSON();
    delete resultado.hash
    res.status(201).send(resultado)
})

function validarCamposLogin(req, res, next) {
    if (!req.body.email) {
        return res.status(422).send({ msg: "O email é obrigatório" })
    }
    if (!req.body.password) {
        return res.status(422).send({ msg: "A senha é obrigatória" })
    }
    next()
}

app.post("/auth/login/", validarCamposLogin, async (req, res) => {
    const { email, password } = req.body

    const usuario = await encontrarUsuarioPorEmail(email)
    if (usuario == null) {
        return res.status(422).send({ msg: "Email não encontrado" })
    }

    const checkPassword = await bcryptjs.compare(password, usuario.hash)
    if (!checkPassword) {
        return res.status(422).send({ msg: "Senha Inválida" })
    }
    
    req.session.user_id = usuario.id
    req.session.user = email
    res.status(200).send({ msg: "Autenticação realizada com sucesso!", id: usuario.id})
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ msg: 'Erro ao tentar fazer logout.' });
        }
        res.status(200).send({ msg: 'Logout bem-sucedido!' });
    });
});

function verifiqueUsuario(req, res, next) {
    if (req.session.user) {
        next() // Usuário autenticado, prossiga para a próxima função/middleware
    } else {
        res.status(403).json({ msg: 'Acesso negado. Você precisa estar logado.' });
    }
}

app.get("/user/:id", verifiqueUsuario, async (req, res) => {
    const { id } = req.params
    
    const usuario = await Usuario.Usuario.findByPk(id)
    if (usuario == null) {
        return res.status(404).send({ msg: "Usuário não encontrado" })
    }

    if (usuario.id != req.session.user_id) {
        return res.status(401).send({ msg: "Acesso Negado!" })
    }

    res.status(200).send({ id: usuario.id, nome: usuario.nome, email: usuario.email })
})