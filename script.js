const API_KEY = 'R6D5PDKYPCX6WMJ3GWQUNCYK3';
let icons = {
    "cloudy": "./icons/cloudy.png",
    "rain": "./icons/rain.png",
    "sun": "./icons/sun.png",
    "partly-cloudy-day": "./icons/partlycloudly.png"

}

async function getDataCurrentWeather(currentLocation) {
    let currentWeatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentLocation}?unitGroup=metric&key=R6D5PDKYPCX6WMJ3GWQUNCYK3&contentType=json`
    let response = await fetch(currentWeatherUrl);
    let data = await response.json();
    return data;
}

async function searchLocation() {
    let currentLocation = document.getElementById('searchField').value;
    let weatherData = await getDataCurrentWeather(currentLocation);
    let currentCity = document.querySelector(".currentCity");
    let currentTemp = document.querySelector(".currentTemp")
    currentCity.innerHTML = weatherData["address"];
    currentTemp.innerHTML = `${weatherData["currentConditions"]["temp"]} °`;
    changeIcon(currentLocation);
    getWeatherAlert(currentLocation);
}

async function init(currentLocation) {
    let weatherData = await getDataCurrentWeather("Bad Nauheim");
    let icon = weatherData["currentConditions"]['icon'];
    console.log(icon);
    let currentCity = document.querySelector(".currentCity");
    let currentTemp = document.querySelector(".currentTemp")
    currentCity.innerHTML = weatherData["address"];
    currentTemp.innerHTML = `${weatherData["currentConditions"]["temp"]} °`;
    changeIcon("Bad Nauheim");
    getWeatherAlert(currentLocation);
}

async function getWeatherAlert(currentLocation) {
    let weatherData = await getDataCurrentWeather(currentLocation);
    console.log(weatherData)
    let alertHtml = document.getElementById('weatherAlert');
    alertHtml.innerHTML = `${weatherData['description']}`
}

async function changeIcon(currentLocation) {
    let weatherData = await getDataCurrentWeather(currentLocation);
    let icon = weatherData["currentConditions"]['icon'];
    let currentWeatherImg = document.getElementById('currentWeatherImage');
    if (icon == 'cloudy') {
        currentWeatherImg.src = "./icons/cloudy.png"
    }
    if (icon == 'rain') {
        currentWeatherImg.src = "./icons/rain.png"
    }
    if (icon == 'sun') {
        currentWeatherImg.src = "./icons/sun.png"
    }
    if (icon === 'partly-cloudy-day') {
        currentWeatherImg.src = "./icons/partlycloudly.png"
    }
}
