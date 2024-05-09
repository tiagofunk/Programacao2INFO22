var lista = []
var botaoListaNumeros = document.getElementById("botaoListaNumeros")
botaoListaNumeros.addEventListener("click",()=>{
    var campoListaNumeros = document.getElementById("campoListaNumeros")
    var valorDigitado = parseInt( campoListaNumeros.value)
    
    lista.push( valorDigitado )

    var resultado = document.getElementById("resultado")
    // resultado.innerText = lista
    resultado.innerHTML = ""
    for (let i = 0; i < lista.length; i++) {
        resultado.innerHTML += "<p>Elemento " + (i+1) + ": " + lista[i] + "</p>"    
    }
})