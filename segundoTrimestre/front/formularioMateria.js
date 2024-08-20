const URL_API_MATERIA = 'http://localhost:3000/materia/'
const URL_API_PROFESSOR = 'http://localhost:3000/professor/'
const URL_REDICIONAMENTO = './materias.html'

const urlParams = new URLSearchParams(window.location.search);
var acao = urlParams.get("acao")

carregarProfessores( () => {
    if( acao == 'atualizar' ){
        carregarFormulario()
    }
})

function carregarFormulario(){
    document.getElementById("campoNome").value = localStorage.getItem('nome')
    document.getElementById('cargaHoraria').value = localStorage.getItem('cargaHoraria')
    document.getElementById('selecionarProfessor').value = localStorage.getItem('professorId')
}

function carregarProfessores( callback ){
    fetch( URL_API_PROFESSOR )
    .then(response => response.json())
    .then(result => {
        var selecionarProfessor = document.getElementById("selecionarProfessor")
        result.map( r => {
            selecionarProfessor.innerHTML += `<option value="${r.id}">${r.nome}</option>`
        })
        if (callback) callback();
    })
    .catch(error => {
        alert('Erro: ' + error.message);
    })
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
        return URL_API_MATERIA
    }else if(acao == 'atualizar' ){
        return `${URL_API_MATERIA}${id}`
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
            "cargaHoraria": formData.get('cargaHoraria'),
            "professorId":formData.get('selecionarProfessor')
        }

        var url = criarURL( localStorage.getItem('id') )
        var cabecalho = criarCabecalho(data)

        console.log(data)
        
        fetch( url, cabecalho )
        .then(response => response.json())
        .then(result => {
            limparLocalStorage()
            window.location.href = URL_REDICIONAMENTO;
        })
        .catch(error => {
            alert('Erro: ' + error.message);
        });
    });
});