let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temp = document.querySelector(".weather_temp");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_Feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// Function to get country name
const getCountryName = (code) => {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

// Function to format date & time
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(curDate);
};

let city = "Pune";

citySearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let nameCity = document.querySelector("#cityInput");
    city = nameCity.value;
    getweatherdata();
    nameCity.value = "";
});

const getweatherdata = async () => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d4348a4802f6b7cb89edb251e9ea6750`;
    try {
        const res = await fetch(weatherURL);
        const data = await res.json();

        const { main, name, weather, wind, sys, dt } = data;

        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);
        w_temp.innerHTML = `${main.temp.toFixed(1)}&#176;C`;
        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed(1)}&#176;C`;
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed(1)}&#176;C`;
        w_feelsLike.innerHTML = `${main.feels_like.toFixed(1)}&#176;C`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed.toFixed(1)} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;
        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// Load data on page load
window.addEventListener("load", getweatherdata);
