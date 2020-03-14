'use strict';

const mysql = require('mysql');
const util = require('util');

const {
  countriesAbove8M,
  countriesContainsLand,
  citiesBetweenHalfMAnd1M,
  countriesInEurope,
  countriesBySurfaceArea,
  citiesInNL,
  populationRotterdam,
  top10CountriesBySurfaceArea,
  top10CitiesByPopulation,
  populationSum,
} = require('./queries');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const execQuery = util.promisify(connection.query.bind(connection));

const selectQuery = async query => {
  connection.connect();

  try {
    switch (query) {

      case countriesAbove8M:
      
      case countriesContainsLand:
      
      case citiesBetweenHalfMAnd1M:
      
      case countriesInEurope:
      
      case countriesBySurfaceArea:
      
      case citiesInNL:
      
      case top10CountriesBySurfaceArea:
      
      case top10CitiesByPopulation:
        await execQuery(query, (error, results) => {
          if (error) throw error;
          if (results) results.forEach((res, index) => console.log(`${index + 1}) ${res.Name}`));
        });
        break;
      
      case populationRotterdam:
        await execQuery(populationRotterdam, (error, results) => {
          if (error) throw error;
          console.log(`The population of Rotterdam City = ${results[0].Population}`);
        });
        break;
      
      case populationSum:
        await execQuery(populationSum, (error, results) => {
          if (error) throw error;
          console.log(`The population of the world = ${results[0].SUM}`);
        });
        break;
      default:
        console.log('please insert a correct query');
    }
  } catch (error) {
    console.error(error);
  }
};

selectQuery(countriesAbove8M);

connection.end();