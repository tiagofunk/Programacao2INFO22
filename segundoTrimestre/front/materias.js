const URL_API = "http://localhost:3000/materia/"
const NOMES_COLUNAS = ["Nome","Carga horária"]
const MENSAGEM_ERRO = "Não foi possível carregar as materias!"

function preencherLinhaTabela(obj){
    return `<p class="item">${obj.nome}</p>
            <p class="item">${obj.cargaHoraria}</p>`
}