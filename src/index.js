import "./styles.css";
import { Weather } from "./weather.js";

// Initialize the weather API with base URL and API key
const weatherApi = new Weather(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
    "686YMMU8Z3UQQJZW8ZW55LHFH"
);

// Function to display the current time and update the background color based on the time of day
const DisplayTime = (headerDiv) => {
    const timeHere = document.createElement("p");
    timeHere.classList.add("timeHere");
    
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = days[now.getDay()];
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 (midnight) to 12
    
    const time = `${dayName}, ${hours}:${minutes} ${amPm}`;
    timeHere.textContent = time;
    
    // Get the container to update background color based on time
    const containerDiv = document.body;
    if (hours >= 6 && hours < 12) {
        containerDiv.style.backgroundColor = "#e8817f"; // Morning
    } else if (hours >= 12 && hours < 18) {
        containerDiv.style.backgroundColor = "#c3727c"; // Afternoon
    } else if (hours >= 18 && hours < 21) {
        containerDiv.style.backgroundColor = "#5a336e"; // Evening
    } else {
        containerDiv.style.backgroundColor = "#311f62"; // Night
        containerDiv.style.color = "#FFFFFF"; // Change text color for better visibility
    }
    
    headerDiv.appendChild(timeHere);
};

// Function to display weather data for a given city
const displayWeather = (city = "Dallas") => {
    const headerContainer = document.getElementById("header");
    headerContainer.innerHTML = "";
    
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("headerDiv");
    
    // Create search bar elements
    const searchDiv = document.createElement("div");
    searchDiv.classList.add("searchDiv");
    
    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.placeholder = "Enter City...";
    searchBar.classList.add("searchBar");
    
    const searchButton = document.createElement("button");
    searchButton.textContent = "Search";
    searchButton.classList.add("searchButton");
    
    searchDiv.appendChild(searchBar);
    searchDiv.appendChild(searchButton);
    headerDiv.appendChild(searchDiv);
    
    // Fetch and display weather data
    weatherApi.getWeather(city).then((data) => {
        console.log("Weather Data:", data);
    });
    
    // Display city location
    const locationHere = document.createElement("h2");
    weatherApi.getLocation(city).then(location => {
        locationHere.textContent = typeof location === "object" ? location.resolvedAddress : location;
        headerDiv.appendChild(locationHere);
    });
    
    // Display current time
    DisplayTime(headerDiv);
    headerContainer.appendChild(headerDiv);
    
    // Display temperature
    const degrees = document.getElementById("degree");
    degrees.innerHTML = "";
    
    const temperatureHere = document.createElement("h1");
    weatherApi.getTemp(city).then(temp => {
        temperatureHere.textContent = temp || "N/A";
        degrees.appendChild(temperatureHere);
    });
    
    // Clear and populate weather details section
    const details = document.getElementById("bottom");
    details.innerHTML = "";
    
    // Display 'Feels Like' temperature
    const feelsLike = document.createElement("p");
    weatherApi.getFeelsLike(city).then(feels => {
        feelsLike.textContent = "Feels Like: " + (feels || "N/A");
        details.appendChild(feelsLike);
    });
    
    // Display wind speed
    const windSpeed = document.createElement("p");
    weatherApi.getWind(city).then(wind => {
        windSpeed.textContent = "Wind Speed: " + (wind || "N/A");
        details.appendChild(windSpeed);
    });
    
    // Display humidity
    const humidityHere = document.createElement("p");
    weatherApi.getHumidity(city).then(humidity => {
        humidityHere.textContent = "Humidity: " + (humidity || "N/A");
        details.appendChild(humidityHere);
    });
    
    // Display precipitation
    const precipitationHere = document.createElement("p");
    weatherApi.getPrecipitation(city).then(precipitation => {
        precipitationHere.textContent = "Precipitation: " + (precipitation || "N/A");
        details.appendChild(precipitationHere);
    });
    
    // Add event listener to search button
    searchButton.addEventListener("click", () => {
        const newCity = searchBar.value.trim();
        if (newCity) {
            displayWeather(newCity);
        }
    });
};

// Initial weather display for default city
displayWeather();
