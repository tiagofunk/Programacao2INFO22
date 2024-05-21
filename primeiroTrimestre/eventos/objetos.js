var pessoa = {
    nome:"Tiago",
    sexo:'m',
    peso: 85.0,
    idade: 28,
    materias: ["Fundamentos", "Web", "ESO", "PRG2"],
    endereco:{
        rua: "a",
        numero: 10,
        bairro:"B"
    },
    engordar( pesoExtra ){
        this.peso += pesoExtra
    }
}
console.log(pessoa)
console.log("Idade: " + pessoa.idade)

pessoa.idade = 35
console.log("Idade: " + pessoa.idade)

pessoa.engordar(5)
console.log(pessoa.peso);

