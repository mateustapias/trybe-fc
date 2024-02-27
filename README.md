# Trybe Football Club: keep up with your favorite league ⚽

**Trybe Football Club** is an application that allows the user to keep track of all matches from Série A (Brazilian Football Championship) and, if he is an administrator, also change the score and status of a match, as well as create a new one!

The application in total has three databases: one containing the *teams*, the other the *matches* and the last one the *users*.

The *teams* and *matches* databases are used as a basis to generate key information for the league leaderboard and can be updated by administrators directly through the website. It's also possible to filter the leaderboard by home or away matches, considering only the games that meet the criteria.

Now the *users* database has their sensitive details encrypted for complete and reliable security. Furthermore, the app can differentiate common users (user) from administrators (admin), where the administrator has exclusive functionalities. At last, customer validation is always carried out correctly using the authentication token, generated when logging in.

![Front end part of the app](./front-example.png)

<details open>
<summary><strong>🛠 Technical details</strong></summary><br />

  This application was created based on a project from Trybe's Full Stack Web Development course, in the Back-End module, over ten days. The entirity of the code present in the front-end folder was created and developed by the organization itself, while that in the back-end folder is my own.

  The most notable features of the website are:

  - Javascript;
  - Typescript;
  - Node.js;
  - POO;
  - Docker;
  - MySQL;
  - JSON Web Token (JWT);
  - Bcrypt;
  - Sinon;
  - Chai HTTP;
  - Test Driven Development (TDD).
</details>

<details open>
<summary><strong>💻 Try it out!</strong></summary><br />

In case you want to run the code locally, just use the script `npm run compose:up` and, after the containers are built, access the url `http://localhost:3000/leaderboard` in your browser. 
</details>

> [!IMPORTANT]
> After testing the application, use the `npm run compose:down` script to stop the docker-compose completely.

<!-- # Trybe Futebol Clube: por dentro de seu campeonato favorito ⚽

**Trybe Futebol Clube** é uma aplicação que permite ao usuário acompanhar todas as partidas da Série A do Campeonato Brasileiro de Futebol e, caso seja um administrador, também é possível alterar o placar e status de uma partida, assim como criar uma nova!

A aplicação no total possui três bancos de dados: um com os **times**, outro com  as **partidas** e um último para os **usuários**.

Os bancos de dados dos times e partidas são utilizados como base para gerar as informações fundamentais da tabela de classificação e podem ser atualizados pelos administradores diretamente pelo site. Nessa mesma tabela, é possível filtrar a classificação dos times por partidas como mandantes ou visitantes, contabilizando apenas os jogos que cumprem essa restrição.

O banco com os usuários do site possui seus detalhes sensíveis criptografados para uma segurança completa e confiável. Ainda nesse banco, pode-se diferenciar usuários comuns (user) de administradores (admin), onde o administrador possui funcionalidades exclusivas. Por fim, sempre é realizada corretamente a validação do cliente através do token de autenticação, gerado ao fazer login.

![Exemplo app front](./front-example.png)

<details open>
<summary><strong>🛠 Detalhes técnicos</strong></summary><br />

  Essa aplicação foi realizada a partir de um projeto do curso de Desenvolvimento Web Full Stack da Trybe, no módulo de Back-End, durante dez dias. O código presente na pasta de front-end foi criado e desenvolvido pela própria organização, enquanto o da pasta de back-end é majoritariamente de autoria própria.

  As competências mais notáveis do website são:

  - Javascript;
  - Typescript;
  - Node.js;
  - POO;
  - Docker;
  - MySQL;
  - JSON Web Token (JWT);
  - Bcrypt;
  - Sinon;
  - Chai HTTP;
  - Test Driven Development (TDD).
</details>

<details open>
<summary><strong>💻 Teste a aplicação!</strong></summary><br />

Caso queira rodar a aplicação localmente, basta utilizar o script `npm run compose:up` e, após os containers serem construídos, acessar a url `http://localhost:3000/leaderboard` em seu navegador.
</details>

> [!IMPORTANT]
> Após testar a aplicação, utilize o script `npm run compose:down` para encerrar o docker-compose completamente.
--!>
