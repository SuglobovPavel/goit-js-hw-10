import './css/styles.css';
import {resultFetch} from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const REFS = {
   input: document.querySelector("#search-box"),
   boxForResult: document.querySelector(".country-list"),
   boxForInfo: document.querySelector(".country-info")
};

function renderOneCard(arrayWithOneCard){
   let renderHtml = '';
   arrayWithOneCard.map( elem => {

      renderHtml += 
      `<li class="country-big-row">
         <div class="country-big-row__header">
            <img src="${elem.flags.svg}" alt="${elem.name.official}">
            ${elem.name.official}
         </div>
         <ul>
            <li><strong>Capital:</strong> ${elem.capital}</li>
            <li><strong>Population:</strong> ${elem.population}</li>
            <li><strong>Languages:</strong> ${Object.values(elem.languages).join(", ")}</li>
         </ul>
      </li>`;
   });

   REFS.boxForResult.insertAdjacentHTML("beforeend", renderHtml);
}

function renderMoreCards(arrayWithMoreCards){
   let renderHtml = '';
   arrayWithMoreCards.map( elem => {
      renderHtml += 
      `<li class="country-small-row">
         <img src="${elem.flags.svg}" alt="${elem.name.official}">
         ${elem.name.official}
      </li>`;
   });

   REFS.boxForResult.insertAdjacentHTML("beforeend", renderHtml);
}

function renderCards(arrayCountries){
   if(arrayCountries.length === 1){
      renderOneCard(arrayCountries);
      return false;
   }

   renderMoreCards(arrayCountries);
}

function clearBoxResult(){
   REFS.boxForResult.innerHTML = '';
}

function searchInput(e){
   clearBoxResult();

   let inputValue = e.target.value.trim();
   if(!inputValue){
      return false;
   }
   if(inputValue.length === 1){
      Notiflix.Notify.warning('Введите больше букв');
      return false;
   }
   resultFetch(inputValue).then( cards => {
      if(!cards){
         return false;
      }
      if(cards.length > 10 ){
         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
         return false;
      }
      renderCards(cards);
   })
}

REFS.input.addEventListener("input", debounce(searchInput, DEBOUNCE_DELAY));