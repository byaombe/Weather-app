import "./styles.css";
//import { greeting } from "./greeting.js";
import {Weather} from "./weather.js"

/* import and use an image
import odinImage from "./odin.png";
   
const image = document.createElement("img");
image.src = odinImage;
   
document.body.appendChild(image);
*/
//display the weather 
const weatherApi = new Weather("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/dallas?unitGroup=us&elements=datetime%2Cname%2Ctemp%2Cfeelslike%2Chumidity%2Cprecipprob%2Cwindspeed%2Cwinddir%2Cicon&include=current,days", "686YMMU8Z3UQQJZW8ZW55LHFH");
weatherApi.getWeather("Dallas").then((data) => {
    console.log("weather Data:", data)
});

//display Temperature
weatherApi.getTemp("Dallas").then(temp => {
    console.log("Temp Now: ", temp)
})
//display Feels like
weatherApi.getFeelsLike("Dallas").then(feels => {
    console.log("Feels like: ", feels)
})

//display the wind
weatherApi.getWind("Dallas").then (wind => {
    console.log("wind Speed:", wind);
})

//display humidity
weatherApi.getHumidity("Dallas").then (humidity => {
    console.log("Current humidity:", humidity);
})

//display presipitation 
weatherApi.getPrecipitation("Dallas").then (precipitation => {
    console.log("precipitation:", precipitation);
})