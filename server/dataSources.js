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
    const selectedCountry = await this.get(`countries/${iso}/confirmed`);
    return selectedCountry[0];
  }
}

module.exports.CovidAPI = CovidAPI;
