console.log("Olá")

var altura = 1.85
var nome = 'tiago'
var professor = true
var nan = NaN

var idade = 27
idade = '27 anos'

console.log(idade)/* Imprimindo uma variável */

var a = 4
var b = 2
var c = a + b
var d = a - b
var e = a * b
var f = a / b
var g = a ** b // Potência
a += b
a += 1
a++

var stringNumero = '27'
var numero = parseInt( stringNumero )//Converte string para inteiro
var numeroVirgula = parseFloat( stringNumero )

console.log("Número: " + numero )


// Vetores
var n = []
var num = [5,8,4]
num[1] = 6 // Troca o valor do segundo elemento para seis

num.push( 10 ) // Adiciona novo elemento

num[ 10 ] = 100
// Aumenta o tamanho do vetor para adicionar na 11ª posição

console.log(num)
console.log(num.length) // Imprime o tamanho do vetor

for (var i = 0; i < num.length; i++) {
    const element = num[i];
    console.log( "Elemento " + i + ": " + element );
}

// Definição da função
function imprimaOla(){
    console.log("Olá da função")
}

// Chamando a função
imprimaOla()

function somar( num1, num2 ){
    var soma = num1 + num2
    return soma
}
console.log( somar( 1, 2 ) )

// Criando função com arrow functions
const imprimaMsgOla = () => {
    console.log("Olá da função diferente")
}
imprimaMsgOla()

const somarNumeros = ( num1, num2 ) => {
    return num1+num2
}
console.log( somarNumeros( 1,2 ) )





