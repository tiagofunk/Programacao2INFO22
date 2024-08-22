# Exemplo de documentação de API

## GET
Para realizar o GET de professores:

        localhost:3000/professor

## PUT
Para realizar o PUT de professores **(O id é um valor número que representa o id do professor.)**

        localhost:3000/professor/:id

O corpo da requisição deve ser a seguinte:

        {
            "nome":"Tiago",
            "titulacao":"Mestrado",
            "regimeTrabalho": 40
        }