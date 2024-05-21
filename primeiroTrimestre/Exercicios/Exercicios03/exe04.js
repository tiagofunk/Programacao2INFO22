var botaoTabuada = document.getElementById("botaoTabuada")
botaoTabuada.addEventListener("click",()=>{
    var campoTabuada = document.getElementById("campoTabuada")
    var valorDigitado = parseInt( campoTabuada.value )

    var resultado = document.getElementById("resultado")

    resultado.innerHTML = ""
    for (var i = 0; i <= 10; i++) {
        var v = i * valorDigitado
        resultado.innerHTML += "<p>" + v + "</p>"
    }
})