// 01
console.log("olá")

// 02
var num = 23
console.log(num)

// 03
var nome = "Tiago"
console.log(nome)

// 04
var numero = 22
if( numero % 2 == 0 ){
    console.log("Par");
}else{
    console.log("Impar");
}

// 05
function soma( num1, num2 ){
    var soma = num1 + num2
    return soma
}
console.log( soma( 1, 3 ) )
var resultadoSoma = soma(1,2)
console.log(resultadoSoma);

// 06
const somaComArrayFunction = (num1, num2) => {
    var soma = num1 + num2
    return soma
}

console.log( somaComArrayFunction(1,3) )

// 07
for (var i = 1; i <= 10; i++) {
    console.log( i )
}

// 08
for (var i = 1; i <= 10; i++) {
    if( i % 2 == 0 ){
        console.log( i )
    }
}
for (var i = 2; i <= 10; i += 2) {
    console.log( i )
}

// 09
var vetor = [ 5,4,9,2,7 ]
console.log( vetor )
for( var i = 0; i < vetor.length; i++ ){
    console.log( vetor[ i ] )
}
vetor.forEach( (element) => {
    console.log( element )
});

// 10
// var novoVetor = []
// for (let i = 0; i < 10; i++) {
//     novoVetor.push( randomNumber )
// }
// 10
var novoVetor = [ 7, 5, 3, 1, 4, 8, 9, 8, 4, 6 ]
for( var i = 0; i < novoVetor.length; i++ ){
    if( novoVetor[ i ] % 2 == 0 ){
        console.log(
            "O valor no posição " + i + 
            " é igual a " + novoVetor[i]
        )
    }
}

// 11
function encontrarMaior( vetor ){
    var maior = 0
    for( var i = 0; i < vetor.length; i++ ){
        if( vetor[ i ] > maior ){
            maior = vetor[i]
        }
    }
    return maior
}
// reutilizei novoVetor da questão 10
console.log( "Maior: " + encontrarMaior( novoVetor ) )

// 12
function encontrarMedia( vetor ){
    var soma = 0
    for( var i = 0; i < vetor.length; i++ ){
        soma += vetor[ i ]
    }
    var media = soma / vetor.length
    return media
}
console.log( "Média: " + encontrarMedia( novoVetor ) )