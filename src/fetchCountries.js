import Notiflix from 'notiflix';

export {
   resultFetch
}


function resultFetch (searchString){
   return fetch(`https://restcountries.com/v3.1/name/${searchString}?fields=capital,population,name,flags,languages`)
   .then(r=>{
      if(r.status === 404){
         Notiflix.Notify.failure('Oops, there is no country with that name');
         return false;
      }
      return r.json()
   });
}