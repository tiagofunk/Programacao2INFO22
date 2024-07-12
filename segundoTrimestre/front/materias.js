const URL_MATERIAS = "http://localhost:3000/materia/"
var listaMaterias = []

function iniciarTabela(){
    return `<div class="linhaTabela">
                <p class="item inicial">Id</p>
                <p class="item">Nome</p>
                <p class="item">Carga horária</p>
                <p class="item visualizar">Visualizar</p>
                <p class="item editar">Alterar</p>
                <p class="item excluir">Excluir</p>
            </div>`;
}

function criarLinhaTabela(materia){
    return `<div class="linhaTabela">
                <p class="item inicial">`+materia.id+`</p>
                <p class="item">`+materia.nome+`</p>
                <p class="item">`+materia.cargaHoraria+`</p>
                <p class="item visualizar">
                    <img class="icone" src="./img/lupa.png" alt="icone lápis">
                </p>
                <p class="item editar">
                    <img class="icone" src="./img/lapis.png" alt="icone lápis">
                </p>
                <p class="item excluir">
                    <img class="icone" src="./img/lixeira.png" alt="icone lixeira">
                </p>
            </div>`;
}

function adicionarMaterias(){
    var tabelaMaterias = document.getElementById("tabela")
    tabelaMaterias.innerHTML += iniciarTabela()
    for (let i = 0; i < listaMaterias.length; i++) {
        const pessoa = listaMaterias[i];
        tabelaMaterias.innerHTML += criarLinhaTabela(pessoa)
    }
    cadastrarEventosLapis()
    cadastrarEventosLixeira()
}

fetch(URL_MATERIAS).then(function(response) {
    return response.json();
}).then(function(data) {
    listaMaterias = data
    adicionarMaterias()
}).catch(function(err) {
    alert("Não foi possível carregar as materias!")
    console.log( "Houve o seguinte problema: " + err )
});

var botaoAdicionar = document.getElementById("botaoAdicionar")
botaoAdicionar.addEventListener("click",function(){
    window.location.href = 'adicionar.html';
})

function atualizarTela(id){
    listaMaterias = listaMaterias.filter( p => p.id != id)
    var tabelaPessoas = document.getElementById("tabelaPessoas")
    tabelaPessoas.innerHTML = ""
    adicionarMaterias()
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