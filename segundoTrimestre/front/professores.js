const URL_API = "http://localhost:3000/professor/"
const URL_VISUALIZAR = "visualizarProfessor.html"
const URL_ADICIONAR = "formularioProfessor.html?acao=adicionar"
const URL_ATUALIZAR = "formularioProfessor.html?acao=atualizar"
const MENSAGEM_ERRO = "Não foi possível carregar os professores!"

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
    cadastrarEventosVisualizar()
    cadastrarEventosAtualizar()
    cadastrarEventosExcluir()
}

function criarCabecalhoTabela(){
    return `<div class="linhaTabela">
                <p class="item inicial">Id</p>
                <p class="item">Nome</p>
                <p class="item">Titulação</p>
                <p class="item">Regime Trabalho</p>
                <p class="item visualizar">Visualizar</p>
                <p class="item editar">Alterar</p>
                <p class="item excluir">Excluir</p>
            </div>`;
}

function criarLinhaTabela(obj){
    return `<div class="linhaTabela">
                <p class="item inicial">${obj.id}</p>
                <p class="item">${obj.nome}</p>
                <p class="item">${obj.titulacao}</p>
                <p class="item">${obj.regimeTrabalho}</p>
                <p class="item visualizar" data-value="${obj.id}">
                    <img class="icone" src="${ICONE_VISUALIZAR}" alt="icone lápis">
                </p>
                <p class="item editar" data-value="${obj.id}">
                    <img class="icone" src="${ICONE_ALTERAR}" alt="icone lápis">
                </p>
                <p class="item excluir" data-value="${obj.id}">
                    <img class="icone" src="${ICONE_EXCLUIR}" alt="icone lixeira">
                </p>
            </div>`;
}

function cadastrarEventosVisualizar(){
    var elementos = document.getElementsByClassName("visualizar")
    elementos = Array.from(elementos)
    elementos.forEach(elemento => {
        elemento.addEventListener("click",function(event){
            var elementoClicado = event.target
            if (elementoClicado.tagName === 'IMG') {
                elementoClicado = elementoClicado.parentElement
            }
            var id = elementoClicado.dataset.value
            window.location.href = `${URL_VISUALIZAR}?id=${id}`
        })
    });
}

function cadastrarEventosAtualizar(){
    var elementos = document.getElementsByClassName("editar")
    elementos = Array.from(elementos)
    elementos.forEach(elemento => {
        elemento.addEventListener("click",function(event){
            var elementoClicado = event.target
            if (elementoClicado.tagName === 'IMG') {
                elementoClicado = elementoClicado.parentElement
            }
            var id = elementoClicado.dataset.value
            const objetoEncontrado = listaObjetos.find(objeto => objeto.id == id)
            salvarLocalStorage(objetoEncontrado)
            window.location.href = URL_ATUALIZAR
        })
    });
}

function cadastrarEventosExcluir(){
    var elementos = document.getElementsByClassName("excluir")
    elementos = Array.from(elementos)
    elementos.forEach(elemento => {
        elemento.addEventListener("click",function(event){
            var elementoClicado = event.target
            if (elementoClicado.tagName === 'IMG') {
                elementoClicado = elementoClicado.parentElement
            }
            var id = elementoClicado.dataset.value
            console.log(id)
            realizarExclusao(id)
        })
    });
}

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click",function(){
    window.location.href = URL_ADICIONAR;
})

function atualizarTela(id){
    listaObjetos = listaObjetos.filter( p => p.id != id)
    var tabela = document.getElementById("tabela")
    tabela.innerHTML = ""
    carregarTabela()
}

function realizarExclusao(id){
    var header = {
        method:"DELETE"
    }
    fetch(URL_API+id,header)
    .then(function(response){
        if (response.status === 204) {
            atualizarTela(id)
        } else {
            alert("Não foi possível deletar o professor!")
        }
    }).catch(function(error){
        alert("Erro:"+error)
    })
}

function salvarLocalStorage(obj){
    localStorage.setItem('id', obj.id)
    localStorage.setItem('nome', obj.nome)
    localStorage.setItem('titulacao', obj.titulacao)
    localStorage.setItem('regimeTrabalho', obj.regimeTrabalho)
}