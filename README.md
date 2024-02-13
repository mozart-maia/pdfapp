# Web App para upload de PDF e autenticação usando Google Provider

Esse é um projeto feito com NextJS, NextAuth e Firebase

Para utilizá-lo, você vai precisar configurar uma conta firebase com firestore e colocar os seus dados (API Key, id de projeto, etc...) em um arquivo .env.local, como visto em .env.local.example

Além disso, vai precisar configurar a api do google para usá-lo como provider. Mais informações podem ser encontradas nos seguintes links:
- [Documentação Next Auth](https://next-auth.js.org/providers/google#options)
- [Documentação OAuth Google](https://developers.google.com/identity/protocols/oauth2?hl=pt-br)


## Rodando o projeto

Para rodar o projeto, depois de clonar o repositório e acessar a pasta raiz do projeto, basta rodar os seguintes comandos no terminal:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver o projeto rodando localmente.

Enjoy! 🧙
