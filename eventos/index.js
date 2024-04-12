
var p1 = document.getElementById("p1")
console.log(p1);
// Altera o primeiro parágrafo para vermelho
p1.style.color = "red"

var p2 = document.getElementById("p2")
console.log(p2);
// Altera o segundo parágrafo para azul
p2.style.color = "blue"

// A função que pega os elementos HTML pela classe,
// retorna em eles em uma lista
var paragrafos = document.getElementsByClassName("paragrafos")
console.log( paragrafos )
for( var i = 0; i < paragrafos.length; i++ ){
    paragrafos[ i ].style.fontSize = '200%'
}

p1.innerText = "Alterei o conteúdo do p1 pelo JS"
console.log( p1.innerText )

console.log( p2.innerHTML )
p2.innerHTML = "<h1>Teste de alteração do HTML pelo JS</h1>"

var area = document.getElementById("area")
area.innerText = "Vai acontecer algo!"

function clickou(){
    area.innerText = "Clickou!!"
}
area.addEventListener("click",clickou)

area.addEventListener('mouseenter', function(){
    area.innerText = "Mouse entrou!!"
})

area.addEventListener('mouseout',()=>{
    area.innerText = "Mouse Saiu!!"
})

var botaoParImpar = document.getElementById("botaoParImpar")
botaoParImpar.addEventListener("click",()=>{
    console.log("Botão funcionando!!")
    var campoNumero = document.getElementById("campoNumero")
    var numero = parseInt( campoNumero.value )
    console.log(numero)

    var resultadoParImpar = document.getElementById("resultadoParImpar")
    resultadoParImpar.innerText = numero
    if( numero % 2 == 0 ){
        resultadoParImpar.innerText = "Par"
    }else{
        resultadoParImpar.innerText = "Ímpar"
    }
})

var botaoTabuada = document.getElementById("botaoTabuada")
botaoTabuada.addEventListener("click", ()=>{
    var campoTabuada = document.getElementById("campoTabuada")
    var numero = parseInt( campoTabuada.value )

    var resultadoTabuada = document.getElementById("resultadoTabuada")
    for (let i = 0; i <= 10; i++) {
        resultadoTabuada.innerHTML += "<p>" + (i*numero) + "</p>"
    }
})