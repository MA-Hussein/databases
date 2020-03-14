'use strict';

const queries = {
  countriesAbove8M: 'SELECT Name from country WHERE Population > 8000000',
  countriesContainsLand: "SELECT Name from country WHERE Name LIKE '%land%'",
  citiesBetweenHalfMAnd1M:
    'SELECT Name from city WHERE Population > 500000 AND Population < 1000000',
  countriesInEurope: "SELECT Name from country WHERE Continent LIKE 'Europe'",
  countriesBySurfaceArea: 'SELECT Name from Country ORDER BY -SurfaceArea',
  citiesInNL:
    "SELECT City.Name City_Name from City, Country WHERE Country.Name = 'Netherlands' AND City.CountryCode = Country.Code",
  populationRotterdam: "SELECT Population FROM city WHERE Name = 'Rotterdam'",
  top10CountriesBySurfaceArea: 'SELECT Name from Country ORDER BY -SurfaceArea Limit 10',
  top10CitiesByPopulation: 'SELECT Name from city ORDER BY -Population Limit 10',
  populationSum: 'SELECT SUM(Population) World_Population FROM Country',
};

module.exports = queries;