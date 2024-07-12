const ICONE_VISUALIZAR = "./img/lupa.png"
const ICONE_ALTERAR = "./img/lapis.png"
const ICONE_EXCLUIR = "./img/lixeira.png"

var listaObjetos = []

fetch(URL_API).then(function(response) {
    return response.json();
}).then(function(data) {
    listaObjetos = data
    carregarTabela()
}).catch(function(err) {
    alert(MENSAGEM_ERRO)
    console.log( "Houve o seguinte problema: " + err )
});

function carregarTabela(){
    var tabela = document.getElementById("tabela")
    tabela.innerHTML += criarCabecalhoTabela()
    for (let i = 0; i < listaObjetos.length; i++) {
        const obj = listaObjetos[i];
        tabela.innerHTML += criarLinhaTabela(obj)
    }
    // cadastrarEventosLapis()
    // cadastrarEventosLixeira()
}

function criarCabecalhoTabela(){
    var colunas = ""
    NOMES_COLUNAS.forEach( ( col ) =>{
        colunas += `<p class="item">${col}</p>`
    })
    return `<div class="linhaTabela">
                <p class="item inicial">Id</p>
                ${colunas}
                <p class="item visualizar">Visualizar</p>
                <p class="item editar">Alterar</p>
                <p class="item excluir">Excluir</p>
            </div>`;
}

function criarLinhaTabela(obj){
    return `<div class="linhaTabela">
                <p class="item inicial">${obj.id}</p>
                ${preencherLinhaTabela(obj)}
                <p class="item visualizar">
                    <img class="icone" src="${ICONE_VISUALIZAR}" alt="icone lápis">
                </p>
                <p class="item editar">
                    <img class="icone" src="${ICONE_ALTERAR}" alt="icone lápis">
                </p>
                <p class="item excluir">
                    <img class="icone" src="${ICONE_EXCLUIR}" alt="icone lixeira">
                </p>
            </div>`;
}

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click",function(){
    window.location.href = 'adicionar.html';
})

function atualizarTela(id){
    listaObjetos = listaObjetos.filter( p => p.id != id)
    var tabelaPessoas = document.getElementById("tabelaPessoas")
    tabelaPessoas.innerHTML = ""
    carregarTabela()()
}

function realizarExclusao(id){
    var header = {
        method:"DELETE"
    }
    fetch(URL+id,header)
    .then(function(response){
        return response.text()
    }).then(function(data){
        atualizarTela(id)
    }).catch(function(error){
        alert("Erro ao deletar pessoa")
    })
}

function cadastrarEventosLixeira(){
    var lixeiras = document.getElementsByClassName("lixeira")
    for (let i = 0; i < lixeiras.length; i++) {
        const l = lixeiras[i];
        l.addEventListener("click",function(event){
            var id = event.target.parentElement.parentElement.children[0].innerText
            realizarExclusao(id)
        })
    }
}

function editarURL(url, id, nome, idade){
    return url+'?id='+id+'&nome='+nome+'&idade='+idade
}

function cadastrarEventosLapis(){
    var lapis = document.getElementsByClassName("lapis")
    for (let i = 0; i < lapis.length; i++) {
        const l = lapis[i];
        l.addEventListener("click",function(event){
            var id = event.target.parentElement.parentElement.children[0].innerText
            var nome = event.target.parentElement.parentElement.children[1].innerText
            var idade = event.target.parentElement.parentElement.children[2].innerText
            window.location.href = editarURL("adicionar.html",id,nome,idade);
        })
    }
}