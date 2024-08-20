const URL_API = "http://localhost:3000/materia/"

const urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get("id")

fetch(URL_API+id).then(function(response) {
    return response.json();
}).then(function(data) {
    mostrarMateria( data )
}).catch(function(err) {
    alert('Não foi possível carregar a matéria!')
    console.log( "Houve o seguinte problema: " + err )
});

function mostrarMateria( materia ){
    document.getElementById("nome").innerText += `Matéria: ${materia.nome}`
    document.getElementById("cargaHoraria").innerText += `Carga horária: ${materia.cargaHoraria} horas`
    if( materia.professor == null ){
        document.getElementById("professor").innerText += "Professor: Sem professor"
    }else{
        document.getElementById("professor").innerText += `Professor: ${materia.professor.nome}`
    }
}