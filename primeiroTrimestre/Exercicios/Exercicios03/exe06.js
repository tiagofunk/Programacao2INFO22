var botaoVerificar = document.getElementById("botaoVerificar")
botaoVerificar.addEventListener("click",()=>{
    var campoTexto = document.getElementById("campoTexto")
    var valorDigitado = campoTexto.value
    var resultado = document.getElementById("resultado")
    if( valorDigitado == "" ){
        resultado.innerText = "O campo está vazio"
    }
})