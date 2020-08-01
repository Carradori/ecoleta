<h1 align="center">
<br>
  <img src="./assets/logo.svg" alt="Ecoleta" width="220">
<br>
<br>
Ecoleta
</h1>

<p align="center">Tem um ponto de coleta ou deseja verificar onde seria o melhor descarte para seu lixo? Esse app é para você!</p>

[//]: # "Add your gifs/images here:"

<div style="display: flex; justify-content: space-around;">
  <img src="./assets/web.gif" alt="Demonstração aplicação web" width="70%" />
  <img src="./assets/mobile.gif" alt="Demonstração aplicação mobile" width="20%" />
</div>

<hr />

## :computer: Tecnologias

[//]: # "Add the features of your project here:"

Essa aplicação usa as tecnologias mais atuais do mercado.

- ⚛️ **[React JS](https://reactjs.org/)** — Uma biblioteca JavaScript para criar interfaces de usuário
- ⚛️ **[React Native](https://reactnative.dev/)** — Uma biblioteca JavaScript que permite criar aplicativos nativod para Android e iOS
- 💹 **[Node JS](https://nodejs.org/en/)** — Uma biblioteca que executa javascript fora do navegador
- :diamond_shape_with_a_dot_inside: - Feito com TypeScript

## :fire: Instalação

Você precisa ter:

- NodeJS em qualquer versão **acima de 10**
  - [Instalar node](https://nodejs.org/pt-br/download/)
- Um gerenciador de pacotes node (npm ou yarn)
  - [Instalar npm]() _aqui você pode instalar o node junto com o npm_
  - [Instalar yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) Clicar no botão 'Download Installer'
- O seu dispositvo móvel deverá ter o aplicativo do Expo
  - [Expo Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [Expo App Store](https://apps.apple.com/br/app/expo-client/id982107779)

##### 1° :bookmark_tabs: Clone o repositório:

```sh
  $ git clone https://github.com/Carradori/ecoleta.git
```

##### 2° :heavy_check_mark: Iniciando a aplicação:

- Iniciando o backend

```sh
  # entre na pasta do backend
  $ cd ./backend

  # vá até src/controllers/ItemsController.ts
  $ cd ./src/controllers
  # nos arquivos ItemsController.ts e PointsController.ts - trocar onde estiver escrito "seu_ip_aqui" para o ip fixo da sua máquina

  # execute esse código no terminal (ele irá instalar todas as dependências)
  $ yarn add
  ou
  $ npm i

  # fazer o migrate do knex para o banco de dados
  $ yarn migrate:knex

  # inicie o servidor
  $ yarn dev
  ou
  $ npm run dev
```

- Iniciando o front-end web

```sh
  # entre na pasta web
  $ cd ./web

  # execute esse código no terminal (ele irá instalar todas as dependências)
  $ yarn add
  ou
  $ npm i

  # inicie o app web
  $ yarn start
  ou
  $ npm start
```

- Iniciando o front-end mobile

```sh
  # entre na pasta mobile
  $ cd ./mobile

  # execute esse código no terminal (ele irá instalar todas as dependências)
  $ yarn add
  ou
  $ npm i

  # vá até src/services/api.ts
  $ cd ./src/services
  # trocar onde estiver "seu_ip_aqui" para o ip fixo da máquina

  # inicie o app mobile
  $ expo start
  ou
  $ yarn start
  ou
  $ npm start

  #Em seu dispotivo móvel, abra o app Expo e aponte a camera no QR Code que o site disponibiliza
```

## :large_blue_diamond: Algumas tecnologias usadas

- TypeScript
- Express
- KnexJS
- Leaflet
- Axios
