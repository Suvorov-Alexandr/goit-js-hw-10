const BASE_URL = 'https://restcountries.com/v3.1/name/';
const requestFilter = 'fields=name,capital,population,languages,flags';

export function fetchCountries(nameCountry) {
  return fetch(`${BASE_URL}${nameCountry}?${requestFilter}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
