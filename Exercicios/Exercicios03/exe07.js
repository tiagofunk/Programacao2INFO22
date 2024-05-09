var botaoVerificar = document.getElementById("botaoVerificar")
botaoVerificar.addEventListener("click",()=>{
    var campoTexto = document.getElementById("campoTexto")
    var valorDigitado = campoTexto.value
    var resultado = document.getElementById("resultado")
    
    if( valorDigitado.length >= 3 && valorDigitado.length <= 8 && verificarSenha2( valorDigitado ) ){
        resultado.innerText = "Senha correta!"
    }else{
        resultado.innerText = "Senha inválida!"
    }
})

function verificarSenha( senha ){
    for( var c of senha ){
        if( !(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9') ){
            return false
        }
    }
    return true
}

function verificarSenha2( senha ){
    var minusculas = 0
    var maiusculas = 0
    var numeros = 0
    for( var c of senha ){
        if( c >= 'a' && c <= 'z' ){
            minusculas++
        }
        if( c >= 'A' && c <= 'A' ){
            maiusculas++
        }
        if( c >= '0' && c <= '9' ){
            numeros++
        }
    }
    return maiusculas > 0 && minusculas > 0 && numeros > 0
}

function verificarSenhaExpressaoRegular( senha ){
    var senhaREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{3,8}$/
    return senhaREGEX.test( senha )
}