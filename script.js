const API_KEY = "R6D5PDKYPCX6WMJ3GWQUNCYK3";
let currentWeather = [];
let icons = {
  cloudy: "./icons/cloudy.png",
  rain: "./icons/rain.png",
  sun: "./icons/sun.png",
  "partly-cloudy-day": "./icons/partlycloudly.png",
  "partly-cloudy-night": "./icons/partlycloudynight.png",
  "clear-night": "./icons/clear.png",
};

async function getDataCurrentWeather(currentLocation) {
  let currentWeatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentLocation}?unitGroup=metric&key=R6D5PDKYPCX6WMJ3GWQUNCYK3&contentType=json`;
  let response = await fetch(currentWeatherUrl);
  let data = await response.json();
  return data;
}

async function searchLocation() {
  let currentLocation = document.getElementById("searchField").value;
  let weatherData = await getDataCurrentWeather(currentLocation);
  let currentCity = document.querySelector(".currentCity");
  let currentTemp = document.querySelector(".currentTemp");
  currentCity.innerHTML = weatherData["address"];
  currentTemp.innerHTML = `${weatherData["currentConditions"]["temp"]} °`;
  changeIcon(currentLocation);
  getWeatherAlert(currentLocation);
  getFutureWeatherData(currentLocation);
  changeFuturePredictionIcon(currentLocation);
}

async function init() {
  let weatherData = await getDataCurrentWeather("Bad Nauheim");
  let icon = weatherData["currentConditions"]["icon"];
  console.log(icon);
  let currentCity = document.querySelector(".currentCity");
  let currentTemp = document.querySelector(".currentTemp");
  currentCity.innerHTML = weatherData["address"];
  currentTemp.innerHTML = `${weatherData["currentConditions"]["temp"]} °`;
  changeIcon("Bad Nauheim");
  getWeatherAlert("Bad Nauheim");
  getFutureWeatherData("Bad Nauheim");
  changeFuturePredictionIcon("Bad Nauheim");
}

async function getWeatherAlert(currentLocation) {
  let weatherData = await getDataCurrentWeather(currentLocation);
  console.log(weatherData);
  let alertHtml = document.getElementById("weatherAlert");
  alertHtml.innerHTML = `${weatherData["description"]}`;
}

async function changeIcon(currentLocation) {
  let weatherData = await getDataCurrentWeather(currentLocation);
  let iconKey = weatherData["currentConditions"]["icon"];
  let currentWeatherImg = document.getElementById("currentWeatherImage");
  let defaultIcon = "./icons/sun.png";
  currentWeatherImg.src = icons[iconKey] || defaultIcon;
}

// weather Prediction:

async function getFutureWeatherData(currentLocation) {
  let futureWeatherContainer = document.getElementById(
    "futureWeather_container"
  );
  let futureData = await getDataCurrentWeather(currentLocation);
  futureWeatherContainer.innerHTML = "";
  let days = futureData["days"];
  for (let i = 1; i < 7; i++) {
    let currentDate = days[i]["datetime"];
    const currentTemp = days[i]["temp"];
    futureWeatherContainer.innerHTML += renderFutureWeather(
      currentDate,
      currentTemp
    );
  }
}

async function changeFuturePredictionIcon(currentLocation) {
  let futureData = await getDataCurrentWeather(currentLocation);
  let dataForIcon = futureData["days"];
  let futureWeatherImgs = document.querySelectorAll(".futureWeatherImage");

  for (let i = 1; i < 7; i++) {
    let futureWeatherImg = futureWeatherImgs[i];
    if (!futureWeatherImg) {
      futureWeatherImg = document.createElement("img");
      futureWeatherImg.className = "futureWeatherImage";
      document.body.appendChild(futureWeatherImg);
    }
    let defaultIcon = "./icons/sun.png";
    let iconElement = dataForIcon[i]["icon"];
    futureWeatherImg.src = icons[iconElement] || defaultIcon;
  }
}

async function getWeatherDataDays(currentLocation) {
  currentWeather = await getDataCurrentWeather(currentLocation);
  
  for (let i = 1; i < 7; i++) {
    let currentWeatherDays = currentWeather['days'];
    let getDays = currentWeatherDays[i]['datetime'];
    let getDaysOfWeek = new Date(getDays);
    let currentDay = getDaysOfWeek.getDay();
  }
} 
