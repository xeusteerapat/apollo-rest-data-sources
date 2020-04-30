const { RESTDataSource } = require('apollo-datasource-rest');

class CovidAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://covid19.mathdro.id/api/';
  }

  async getAllCountries() {
    return this.get('confirmed');
  }

  async getCountry(iso) {
    return this.get('countries/' + iso + '/confirmed');
  }
}

module.exports.CovidAPI = CovidAPI;
