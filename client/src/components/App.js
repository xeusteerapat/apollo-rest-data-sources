import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Doughnut } from 'react-chartjs-2';

const query = gql`
  query {
    country(iso: "tha") {
      countryRegion
      confirmed
      recovered
      deaths
    }
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(query);

  const renderContent = () => {
    if (loading) return <p>Loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    const totalConfirmed = data.country.confirmed;
    const recovered = data.country.recovered;
    const deaths = data.country.deaths;
    const activeCase = totalConfirmed - recovered - deaths;

    const dataDoughnut = {
      labels: ['Active Case', 'Recovered', 'Deaths'],
      datasets: [
        {
          data: [activeCase, recovered, deaths],
          backgroundColor: ['#ebe534', '#34eb80', '#fc0303']
        }
      ]
    };

    return (
      <div className="container is-fluid">
        <h1>Country: {data.country.countryRegion}</h1>
        <h1>Cases confirmed: {data.country.confirmed}</h1>
        <h1>Recovered: {data.country.recovered}</h1>
        <h1>Deaths: {data.country.deaths}</h1>
        <Doughnut data={dataDoughnut} />
      </div>
    );
  };

  return renderContent();
};

export default App;
