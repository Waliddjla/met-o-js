
import tabJoursEnOrdre from "./Utilitaire/gestionTemps.js";

let resultasApi;

const currentDate = new Date();
const date = document.querySelector('.date');
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const localisation = document.querySelector('.localisation');

const heure = document.querySelectorAll('.heure-nom-prevision');
const temppourH= document.querySelectorAll ('.heure-prevision-valeur');
const imgIcon = document.querySelector('.logo-meteo');
const iconUrlD = '//cdn.weatherapi.com/weather/64x64/day/116.png';
const iconUrlN = '//cdn.weatherapi.com/weather/64x64/night/116.png';


const jourDiv = document.querySelectorAll ('.jour-prevision-nom');
const tempJoursdiv = document.querySelectorAll('.jour-prevision-temp');

const chargemenContainer = document.querySelector('.overlay-icon-chargement');

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;

        AppelApi(long, lat);
    },() => {
       alert(`Vous avez refusé la géolocalisation , l'aplication ne peut pas fonctionner,
        veuillez l'activer.!`);
    })
}

function AppelApi(long, lat) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=507790bcedeb4b65ae8125129232405&q=oran&days=7&aqi=no&alerts=no&lang=fr`)
    .then((reponse)=> {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);
        resultasApi = data;

        const formattedDate = currentDate.toLocaleDateString('fr-FR', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
          
        date.innerText = formattedDate;
        temps.innerText = resultasApi.current.condition.text;
        temperature.innerText = resultasApi.current.temp_c +"°C" ;
        localisation.innerText = resultasApi.location.name +" / "+ resultasApi.location.country;
        humidity.innerText ="humidity"+" " +resultasApi.current.humidity +"%" ;
        //lesheurs par tranches, avec leur temperature

        let heurAccuelle = new Date().getHours();
        for (let i= 0; i < heure.length; i++){
            let heurIncr = heurAccuelle + i * 3;
            if (heurIncr > 24) {
                heure[i].innerText = `${heurIncr - 24}h`;
            }else if(heurIncr === 24){
                heure[i].innerText ="00h";
            }else {
            heure[i].innerText = `${heurIncr}h`;
        }
        }

        //temps pour 3h 
         for(let j =0; j < temppourH.length; j++) {
           temppourH[j].innerText = `${resultasApi.forecast.forecastday[0].hour[j * 3].temp_c}°`
         }

         for (let k = 0; k < tabJoursEnOrdre.length; k++) {
             jourDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
            
        }
        //  // temps par jour 
         for(let m=0; m < 7; m++){
             tempJoursdiv[m].innerText = `${resultasApi.forecast.forecastday[m].day.avgtemp_c}°`
     }
    

        // icon dynamic 
        if(heurAccuelle > 6 && heurAccuelle <20) {
            imgIcon.src = iconUrlD;

        }else {
            imgIcon.src = iconUrlN;
        }

        chargemenContainer.classList.add('disparition');

    })

}