var contador = 0
var botaoAumentar = document.getElementById("botaoAumentar")
botaoAumentar.addEventListener("click",()=>{
    var resultado = document.getElementById("resultado")
    contador++
    resultado.innerText = contador
})