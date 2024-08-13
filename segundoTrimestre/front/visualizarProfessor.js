const URL_API = "http://localhost:3000/professor/"

const urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get("id")

fetch(URL_API+id).then(function(response) {
    return response.json();
}).then(function(data) {
    mostrarProfessor( data )
}).catch(function(err) {
    alert('Não foi possível carregar o professor!')
    console.log( "Houve o seguinte problema: " + err )
});

function mostrarProfessor( professor ){
    document.getElementById("nome").innerText += `Professor: ${professor.nome}`
    document.getElementById("titulacao").innerText += `Titulaçãos: ${professor.titulacao}`
    document.getElementById("regimeTrabalho").innerText += `Regime Trabalho: ${professor.regimeTrabalho} horas`

    var caixaMaterias = document.getElementById("caixaMateria")
    console.log(professor.materia);
    if( professor.materia.length == 0 ){
        caixaMaterias.innerHTML = "<p>Nenhuma matéria encontrada!</p>"
    }else{
        professor.materia.forEach(materia => {
            caixaMaterias.innerHTML += `<p>${materia.nome} - ${materia.cargaHoraria} horas</p>`
        });
    }
}