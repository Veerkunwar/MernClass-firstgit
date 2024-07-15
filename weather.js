const apiKey = "e0bb0abed4e951324d3a2d1c5f79495a";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherData = document.getElementById("weather-data");

async function getWeather(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    weatherData.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.weather[0].main} - ${data.weather[0].description}</p>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    if (error.message === "Failed to fetch") {
      weatherData.innerHTML = `<p>Error: City not found!</p>`;
    } else {
      weatherData.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
}

searchBtn.addEventListener("click", () => {
  const cityName = cityInput.value;
  if (cityName) {
    getWeather(cityName);
  } else {
    weatherData.innerHTML = `<p>Please enter a city name.</p>`;
  }
});