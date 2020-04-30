const { ApolloServer, gql } = require('apollo-server');
const { CovidAPI } = require('./dataSources');

const typeDefs = gql`
  type Country {
    uid: Int!
    countryRegion: String
    confirmed: Int!
    recovered: Int!
    deaths: Int!
    lastUpdate: Int!
  }

  type Query {
    countries: [Country!]!
    country(iso: String!): Country
  }
`;

const resolvers = {
  Query: {
    countries: (_source, args, { dataSources }) => {
      return dataSources.covidAPI.getAllCountries();
    },
    country: (_source, { iso }, { dataSources }) => {
      return dataSources.covidAPI.getCountry(iso);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    covidAPI: new CovidAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
