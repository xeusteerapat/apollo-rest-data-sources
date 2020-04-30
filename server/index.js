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
    country(name: String!): Country
  }
`;

const resolvers = {
  Query: {
    countries: (_source, args, { dataSources }) => {
      return dataSources.covidAPI.getAllCountries();
    },
    country: async (_source, { name }, { dataSources }) => {
      const allCountries = await dataSources.covidAPI.getAllCountries();
      const selectedCountry = allCountries.find(
        (country) => name.toLowerCase() === country.countryRegion.toLowerCase()
      );
      console.log(selectedCountry);
      return selectedCountry;
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
