const express = require('express')
const banco = require("./banco")
const professor = require("./professor")
const materia = require("./materia")

const app = express()
app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  });

banco.conexao.sync( function(){
    console.log("Banco de dados conectado.");
})

const PORTA = 3000
app.listen( PORTA, function(){
    console.log("Servidor iniciados na porta "+PORTA);
})

app.get("/professores/",async function(req, res) {
    const resultado = await professor.professor.findAll()
    res.send(resultado);
})

app.get("/materias/",async function(req, res) {
    const resultado = await materia.materia.findAll()
    res.send(resultado);
})

app.get("/professores/:id",async function(req, res) {
    const professorSelecionado = await professor.professor.findByPk(req.params.id, 
        { include: { model: materia.materia } } 
    )
    if( professorSelecionado == null ){
        res.status(404).send({})
    }else{
        res.send(professorSelecionado);
    } 
})

app.get("/materias/:id",async function(req, res) {
    const materiaSelecionada = await materia.materia.findByPk(req.params.id,
        { include: {model: professor.professor } }
    )
    if( materiaSelecionada == null ){
        res.status(404).send({})
    }else{
        res.send(materiaSelecionada);
    } 
})

app.post("/professores/",async function(req,res){
    const resultado = await professor.professor.create({
        nome:req.body.nome
    })
    res.send(resultado)
})

app.post("/materias/",async function(req,res){
    const resultado = await materia.materia.create({
        nome:req.body.nome,
        professorId:req.body.professorId
    })
    res.send(resultado)
})

app.put("/professores/:id",async function(req,res){
    const resultado = await professor.professor.update({
        nome:req.body.nome
    },{
        where:{id: req.params.id}
    })
    if( resultado == 0){
        res.status(404).send({})
    }else{
        res.send( await professor.professor.findByPk(req.params.id))
    }
})

app.delete("/professores/:id",async function(req,res){
    const resultado = await professor.professor.destroy({
        where:{
            id:req.params.id
        }
    })
    if( resultado == 0 ){
        res.status(404).send({})
    }else{
        res.status(204).send({})
    }
})