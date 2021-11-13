import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import countryInfoTpls from './templates/country-info.hbs';
import countryListTpls from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;

const options = {
  position: 'center-top',
  cssAnimationStyle: 'from-bottom',
};

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const inputText = refs.input.value.trim();

  if (inputText === '') {
    clearMarkup();
    return;
  }
  clearMarkup();

  fetchCountries(inputText).then(checkingInputLength).catch(showFailureNotification);
}

function checkingInputLength(value) {
  if (value.length > 10) {
    showInfoNotification();
  } else if (value.length >= 2 && value.length <= 10) {
    makeCountriesListMarkup(value);
  } else if (value.length === 1) {
    makeCountryMarkup(value);
  }
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function makeCountriesListMarkup(country) {
  const markup = countryListTpls({ ...country });
  refs.countryList.innerHTML = markup;
}

function makeCountryMarkup(country) {
  const markup = countryInfoTpls(...country);
  refs.countryInfo.innerHTML = markup;
}

function showFailureNotification() {
  Notify.failure('Oops, there is no country with that name', options);
}

function showInfoNotification() {
  Notify.info('Too many matches found. Please enter a more specific name.', options);
}
