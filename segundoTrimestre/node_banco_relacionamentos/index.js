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

app.get("/professor/",async function(req, res) {
    const resultado = await professor.professor.findAll()
    res.send(resultado);
})

app.get("/materia/",async function(req, res) {
    const resultado = await materia.materia.findAll()
    res.send(resultado);
})

app.get("/professor/:id",async function(req, res) {
    const professorSelecionado = await professor.professor.findByPk(
        req.params.id, { include: { model: materia.materia } } 
    )
    if( professorSelecionado == null ){
        res.status(404).send({})
    }else{
        res.send(professorSelecionado);
    } 
})

app.get("/materia/:id",async function(req, res) {
    const materiaSelecionada = await materia.materia.findByPk(
        req.params.id, { include: {model: professor.professor } }
    )
    if( materiaSelecionada == null ){
        res.status(404).send({})
    }else{
        res.send(materiaSelecionada);
    } 
})

app.post("/professor/",async function(req,res){
    const resultado = await professor.professor.create({
        nome:req.body.nome,
        titulacao:req.body.titulacao,
        regimeTrabalho: req.body.regimeTrabalho
    })
    res.send(resultado)
})

app.post("/materia/",async function(req,res){
    const resultado = await materia.materia.create({
        nome:req.body.nome,
        cargaHoraria:req.body.cargaHoraria,
        professorId:req.body.professorId
    })
    res.send(resultado)
})

app.put("/professor/:id",async function(req,res){
    const resultado = await professor.professor.update({
        nome:req.body.nome,
        titulacao:req.body.titulacao,
        regimeTrabalho: req.body.regimeTrabalho
    },{
        where:{id: req.params.id}
    })
    if( resultado == 0){
        res.status(404).send({})
    }else{
        res.send( await professor.professor.findByPk(req.params.id))
    }
})

app.put("/materia/:id",async function(req,res){
    const resultado = await materia.materia.update({
        nome:req.body.nome,
        cargaHoraria:req.body.cargaHoraria,
        professorId:req.body.professorId
    },{
        where:{id: req.params.id}
    })
    if( resultado == 0){
        res.status(404).send({})
    }else{
        res.send( await materia.materia.findByPk(req.params.id))
    }
})

app.delete("/professor/:id",async function(req,res){
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

app.delete("/materia/:id",async function(req,res){
    const resultado = await materia.materia.destroy({
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