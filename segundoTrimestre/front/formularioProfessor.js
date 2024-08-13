const URL_API = 'http://localhost:3000/professor/'

const urlParams = new URLSearchParams(window.location.search);
var acao = urlParams.get("acao")

if( acao == 'atualizar' ){
    carregarFormulario()
}

function carregarFormulario(){
    document.getElementById("campoNome").value = localStorage.getItem('nome')
    document.getElementById('titulacao').value = localStorage.getItem('titulacao')
    document.getElementById('regimeTrabalho').value =localStorage.getItem('regimeTrabalho')
}

function criarCabecalho(data){
    var cabecalho = {
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    if( acao == 'adicionar' ){
        cabecalho.method = 'POST'
    }else if(acao == 'atualizar' ){
        cabecalho.method = 'PUT'
    }
    return cabecalho
}

function criarURL(id){
    if( acao == 'adicionar' ){
        return URL_API
    }else if(acao == 'atualizar' ){
        return `${URL_API}${id}`
    }
}

function limparLocalStorage(){
    localStorage.removeItem('id')
    localStorage.removeItem('nome')
    localStorage.removeItem('titulacao')
    localStorage.removeItem('regimeTrabalho')
}

window.addEventListener('beforeunload', function () {
    limparLocalStorage()
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('formulario')
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const formData = new FormData(form);
        const data = {
            "nome": formData.get('nome'),
            "titulacao": formData.get('titulacao'),
            "regimeTrabalho":formData.get('regimeTrabalho')
        }

        var url = criarURL( localStorage.getItem('id') )
        var cabecalho = criarCabecalho(data)
        
        fetch( url, cabecalho )
        .then(response => response.json())
        .then(result => {
            limparLocalStorage()
            window.location.href = './professores.html';
        })
        .catch(error => {
            alert('Erro: ' + error.message);
        });
    });
});