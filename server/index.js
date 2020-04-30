const { ApolloServer, gql } = require('apollo-server');
const { CovidAPI } = require('./dataSources');

const typeDefs = gql`
  type Country {
    id: Int!
    name: String!
    confirmed: Int!
    recovered: Int!
    deaths: Int!
    lastUpdate: Int!
  }

  type Query {
    country(iso: String!): Country
    countries: [Country!]!
  }
`;

const resolvers = {
  Query: {
    countries: async (_source, args, { dataSources }) => {
      return dataSources.covidAPI.getAllCountries();
    },
    country: async (_source, { iso }, { dataSources }) => {
      return dataSources.covidAPI.getCountry(iso);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    covidAPI: new CovidAPI()
  }),
  introspection: true
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
