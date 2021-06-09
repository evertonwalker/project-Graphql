const { ApolloServer, gql } = require("apollo-server");

// Tagged temmplate função com script.
const typeDefs = gql`
  # Pontos de entrada da sua API

  scalar Date

  # 5 scalares disponíveis pelo GraphQL
  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
    salario_real: Float
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Int
    precoComDesconto: Float
  }

  type Query {
    ola: String
    horaCerta: Date
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
  }
`;

const resolvers = {
  Usuario: {
    salario_real(usuario) {
        return usuario.salario - 300;
    }
  },
  Produto: {
    precoComDesconto(produto) { 
      return produto.preco - ( produto.preco * (produto.desconto/100 ) );
    }
  },
  Query: {
    produtoEmDestaque() {
      return { 
        nome: 'PS5',
        preco: 4500,
        desconto: 10,
      }
    },
    ola() {
      return "Ola mundo.";
    },
    horaCerta() {
      return new Date;
    },
    usuarioLogado() {
      return { 
        id: 1, 
        nome: `Everton W`,
        email: `everton.walker@hotmail.com`,
        salario: 1000.32,
        vip: true,
        idade: 25
      }
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log("executando na url", url);
});
