var questao01 = document.getElementById("questao01")
questao01.style.color = 'red'
questao01.innerText = "Olá"
questao01.innerHTML += "<h1>Título</h1>"

var botaoOla = document.getElementById("botaoOla")
botaoOla.addEventListener("click", ()=>{
    console.log("Olá")
})

var botaoCliqueAqui = document.getElementById("botaoCliqueAqui")
botaoCliqueAqui.addEventListener("click",()=>{
    var paragrafoCliqueAqui = document.getElementById("paragrafoCliqueAqui")
    paragrafoCliqueAqui.innerText = "Botão Clicado!"
})

var botaoQuestao04 = document.getElementById("botaoQuestao04")
botaoQuestao04.addEventListener("click",()=>{
    var campoQuestao04 = document.getElementById("campoQuestao04")
    var valorDigitado = campoQuestao04.value
    console.log("Valor digitado: "+valorDigitado);
})

var carro = {
    marca: "Fiat",
    modelo: "Uno",
    ano:1990,
    acelerar(){
        console.log("Acelerando");
    },
    frear(){
        console.log("Testando os breques");
    }
}

var contaBancaria = {
    nomeTitular: "Tiago",
    saldo: 10.0,
    depositar( valor ){
        this.saldo += valor
    },
    retirar( valor ){
        this.saldo -= valor
    }
}
contaBancaria.depositar( 5.0 )
console.log(contaBancaria.saldo);

var empresa = {
    nome: "IFC",
    endereco: {
        rua: "A",
        numero: 100,
        bairro: "Bela Vista",
        cidade: "Ibirama"
    },
    departamentos: ["ADM","VEST","INFO","MODA"]
}