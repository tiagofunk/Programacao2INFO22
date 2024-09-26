require('dotenv').config()
const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const banco = require("./banco")
const Usuario = require("./usuario")


const app = express()
app.use(express.json())
app.use(cookieParser())

banco.conexao.sync(function () {
    console.log("Banco de dados conectado.");
})

const PORTA = 3000
app.listen(PORTA, () => {
    console.log("Servidor rodando na porta " + PORTA);
})

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Sucesso" })
})

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

    try {
        const token = jwt.sign({ id: usuario.id }, process.env.SECRET, { expiresIn: "24h" })

        res.cookie('token',token)
        res.status(200).json({ msg: "Autenticação realizada com sucesso!", id: usuario.id})
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Erro no servidor. Tente novamente mais tarde!" })
    }
})

function checkToken(req, res, next) {
    const token = req.cookies.token
    
    if (token) {

        jwt.verify(token, process.env.SECRET, function (err, token_data) {
            if (err) {
                return res.status(400).send({ msg: "Token inválido" })
            } else {
                next()
            }
        })

    } else {
        return res.status(401).send({ msg: "Acesso Negado!" })
    }
}

app.get("/user/:id", checkToken, async (req, res) => {
    const { id } = req.params
    
    const usuario = await Usuario.Usuario.findByPk(id)
    if (usuario == null) {
        return res.status(404).send({ msg: "Usuário não encontrado" })
    }

    var infoToken = jwt.verify(req.cookies.token, process.env.SECRET);
    if (usuario.id != infoToken.id) {
        return res.status(401).send({ msg: "Acesso Negado!" })
    }

    res.status(200).send({ id: usuario.id, nome: usuario.nome, email: usuario.email })
})