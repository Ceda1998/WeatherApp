function renderFutureWeather(currentDate, currentTemp ) {
  return `
<div id="currentDay">
    <h1 id="currentDate">${currentDate}</h1>
    <img src="./icons/sun.png" alt="" id="futureWeatherImage">
    <h2 id="futureDegree">${currentTemp} °</h2>
</div>
    `;
}
