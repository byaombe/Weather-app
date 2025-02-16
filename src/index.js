import "./styles.css";
//import { greeting } from "./greeting.js";
import {Weather} from "./weather.js"

/* import and use an image
import odinImage from "./odin.png";
   
const image = document.createElement("img");
image.src = odinImage;
   
document.body.appendChild(image);
*/
const weatherApi = new Weather(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
    "686YMMU8Z3UQQJZW8ZW55LHFH"
);

const displayWeather = (city = "Dallas") => {
   const headerContainer = document.getElementById("header");
  
   headerContainer.innerHTML = "";
   const headerDiv = document.createElement('div');
   headerDiv.classList.add('headerDiv');

   //search bar 
   const searchDiv = document.createElement("div");
   searchDiv.classList.add("searchDiv");

   const searchBar = document.createElement('input');
   searchBar.type = "text";
   searchBar.placeholder = "Enter City...";
   searchBar.classList.add("searchBar");

   const searchButton = document.createElement('button');
   searchButton.textContent = "Search";
   searchButton.classList.add("searchButton");

   searchDiv.appendChild(searchBar);
    searchDiv.appendChild(searchButton);
    headerDiv.appendChild(searchDiv);


   
  //display the weather 
weatherApi.getWeather(city).then((data) => {
    console.log("weather Data:", data)
});
//display location
const locationHere = document.createElement('h2');
   
weatherApi.getLocation(city).then(location => {
    if (typeof location === "object") {
        locationHere.textContent = location.resolvedAddress;
    } else {
        locationHere.textContent = location; // If it's already a string
    }
    //append to dom
headerDiv.appendChild(locationHere)
})


//display time 
const timeHere = document.createElement('p');
timeHere.classList.add("timeHere");
// Time
const now = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayName = days[now.getDay()];

let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');

//  AM or PM
const amPm = hours >= 12 ? "PM" : "AM";

// Convert to 12-hour format
hours = hours % 12 || 12; // Converts 0 (midnight) to 12, and keeps 12 as 12

const time = `${hours}:${minutes} ${amPm}`;

timeHere.textContent = ` ${dayName}, ${time}`;

headerDiv.appendChild(timeHere);
headerContainer.appendChild(headerDiv); //end of header container


const degrees = document.getElementById("degree");
degrees.innerHTML = ""; // Clear previous content

const temperatureHere = document.createElement('h1')

//display Temperature
weatherApi.getTemp(city).then(temp => {
    temperatureHere.textContent = temp || "N/A";
    degrees.appendChild(temperatureHere);

})

const details = document.getElementById('bottom');
details.innerHTML = ""; //delete previopus content here

const feelsLike = document.createElement('p')

//display Feels like
weatherApi.getFeelsLike(city).then(feels => {
    feelsLike.textContent = "Feels Like:" + " " + feels || "N/A";
    details.appendChild(feelsLike)
})

const windSpeed = document.createElement('p')

//display the wind
weatherApi.getWind(city).then (wind => {
    windSpeed.textContent = "Wind Speed:" + " " + wind || "N/A";
    details.appendChild(windSpeed)
})

//display humidity
const humidityHere = document.createElement('p')

weatherApi.getHumidity(city).then (humidity => {
    humidityHere.textContent = "Humidity:" + " " + humidity || "N/A";
    details.appendChild(humidityHere);
})

//display presipitation 
const precipitationHere = document.createElement('p')

weatherApi.getPrecipitation(city).then (precipitation => {
    precipitationHere.textContent = "Precipitation:" + " " + precipitation || "N/A";
    details.appendChild(precipitationHere);
})

//search bottom even listener
searchButton.addEventListener("click", () => {
    const newCity = searchBar.value.trim();
    if(newCity) {
        displayWeather(newCity);
    }
})

} //end of display weather
displayWeather();