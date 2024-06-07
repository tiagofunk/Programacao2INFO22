# Iniciando o projeto do NodeJS e MySQL

## Configurando o projeto

- Crie uma pasta para você trabalhar.
- Abra essa pasta no `VSCode`.
- Abra o terminal no menu Terminal -> Novo Terminal
- Digite o comando para iniciar o projeto e vá apertando ENTER para confirmar as configurações do projeto:

		npm init -y

- Para instalar a extensão que reinicia a aplicação automaticamente:
        
    	npm install --save-dev nodemon

- Para instalar as dependências para funcionar o servidor, leitor de json e biblioteca do `MySQL`:
		
		npm install express mysql2 sequelize dotenv

- Abra o arquivo `package.json` e adicione a seguinte linha em scripts (não se esqueça da vírgula no final da linha anterior):

		"start": "nodemon index.js"

- Para executar a aplicação:
		
		npm start

## Configurando o MySQL
- Abra o Workbench
- Crie um banco que a sua aplicação utilizar (sugestões de nome: `node` ou `nodeApp`).

- Crie um novo usuário do banco para o aplicativo node se conectar.

- Para o `MySQL` 8.0:

		create user 'nodeApp'@'%' identified with mysql_native_password by 'Abcd&123';

- Para o `MySQL` 5.5:

		create user 'nodeApp'@'%' identified by 'Abcd&123';

- Garanta o acesso para desse novo usuário para o banco de dados criado anteriormente:

		grant all on nodeApp.* to 'nodeApp'@'%';

## Para testar pelo insomnia
- Abra o `insomnia`
- Para testar o método `get`:
![](./img/get.png)

- Para testar o método `get` com filtro:
![](./img/get_filtro.png)

- Para testar o método `post`:
![](./img/post.png)

- Para testar o método `put`:
![](./img/put.png)

- Para testar o método `delete`:
![](./img/delete.png)