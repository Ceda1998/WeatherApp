function renderFutureWeather(currentDate, currentTemp) {
  return `
<div id="currentDay">
    <h1 id="currentDate">${currentDate}</h1>
    <img src="./icons/sun.png" alt="" class="futureWeatherImage">
    <h2 id="futureDegree">${currentTemp} °</h2>
</div>
    `;
}
