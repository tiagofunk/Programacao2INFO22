const express = require('express')

const app = express()

app.use(express.json())


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const pessoas = [
  {id:1, nome:"Tiago", idade:28},
  {id:2, nome:"Viviane", idade: 33},
  {id:3, nome:"Ana", idade: 18},
]

const PORTA = 3000
app.listen( PORTA, function(){
    console.log("Servidor iniciados na porta "+PORTA);
})

app.get('/', function (req,res) {
    res.send('<h1>Hello World!</h1>')
})

app.get("/pessoas/", function (req,res){
  res.send( pessoas )
})

app.get("/pessoas/:id", function(req,res){
  var pessoaEncontrada = pessoas.find( function( pessoaAtual ){
    return pessoaAtual.id == parseInt(req.params.id )
  } )
  if( !pessoaEncontrada ){
    res.status( 404 ).send({})
  }else{
    res.send( pessoaEncontrada )
  }
})

app.post("/pessoas/", function( req, res ){
  const novaPessoa = {
    id: pessoas.length + 1,
    nome: req.body.nome
  };
  pessoas.push( novaPessoa );
  res.send( novaPessoa );
});

app.put("/pessoas/:id",function(req,res){
  const pessoaEncontrada = pessoas.find( function( pessoaAtual ){
    return pessoaAtual.id == parseInt( req.params.id )
  }
  )
  if( !pessoaEncontrada ){
    res.status( 404 ).send({})
  }else{
    pessoaEncontrada.nome = req.body.nome
    pessoaEncontrada.idade = req.body.idade
    res.send( pessoaEncontrada )
  }
});

app.delete("/pessoas/:id", function(req, res){
  const pessoaEncontrada = pessoas.find( function( pessoaAtual ){
    return pessoaAtual.id == parseInt( req.params.id )
  });
  if( !pessoaEncontrada ){
    res.status( 404 ).send( {} );
  }else{
    const index = pessoas.indexOf( pessoaEncontrada );
    pessoas.splice( index, 1 );
    res.send( {} );
  }
});