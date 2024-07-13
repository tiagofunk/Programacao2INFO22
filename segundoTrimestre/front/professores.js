const URL_API = "http://localhost:3000/professor/"
const URL_VISUALIZAR = "visualizarProfessor.html"
const URL_ADICIONAR = "adicionarProfessor.html"
const NOMES_COLUNAS = ["Nome","Titulação","Regime Trabalho"]
const MENSAGEM_ERRO = "Não foi possível carregar os professores!"

function preencherLinhaTabela(obj){
    return `<p class="item">${obj.nome}</p>
            <p class="item">${obj.titulacao}</p>
            <p class="item">${obj.regimeTrabalho}</p>`
}