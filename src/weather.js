//weather.js

export class Weather {
    constructor(apiUrl, apiKey, unitGroup="us") {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
        this.unitGroup = unitGroup;

    }

    async getWeather(city) {
        try {
            const url = `${this.apiUrl}${city}?unitGroup=${this.unitGroup}&elements=datetime,name,temp,feelslike,humidity,precipprob,windspeed,winddir,icon&include=current,days&key=${this.apiKey}&contentType=json`;
            const response = await fetch(url, {mode: 'cors'});
                if (!response.ok) {
                    throw new Error(`HTTP ERROR! STATUS: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching weather:", error);
        }
    }
    //asyncronous method to get temp
    async getTemp(city) {
        try {
            const data = await this.getWeather(city);

            if (data && data.currentConditions) {
                return {
                    Temperature: data.currentConditions.temp
                };
            } else {
                console.error("Temperature data not found");
                return null;
            }
           
        } catch (error) {
            console.error("Error fetching wind data:", error);
        }
    }

    //asyncronous method to get feelsLike
    async getFeelsLike(city) {
        try {
            const data = await this.getWeather(city);

            if (data && data.currentConditions) {
                return {
                    FeelsLike: data.currentConditions.feelslike,
                    
                };
            } else {
                console.error("Wind data not found");
                return null;
            }
           
        } catch (error) {
            console.error("Error fetching wind data:", error);
        }
    }

    //asyncronous method to get wind
    async getWind(city) {
        try {
            const data = await this.getWeather(city);

            if (data && data.currentConditions) {
                return {
                    speed: data.currentConditions.windspeed
                    
                };
            } else {
                console.error("Wind data not found");
                return null;
            }
           
        } catch (error) {
            console.error("Error fetching wind data:", error);
        }
    }

    //asyncronous method to get humidity
    async getHumidity(city) {
        try {
            const data = await this.getWeather(city);

            if (data && data.currentConditions) {
                return {
                 humidity: data.currentConditions.humidity
                    
                };
            } else {
                console.error("Humidity data not found");
                return null;
            }
           
        } catch (error) {
            console.error("Error fetching humidity data:", error);
        }
    }

    //asyncronous method to get precipitation
    async getPrecipitation(city) {
        try {
            const data = await this.getWeather(city);

            if (data && data.currentConditions) {
                return {
                    precipitation: data.currentConditions.precipprob
                };
            } else {
                console.error("Precipitation data not found");
                return null;
            }
           
        } catch (error) {
            console.error("Error fetching Precipitation data:", error);
        }
    }

}