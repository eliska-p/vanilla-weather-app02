let apiKey = "fb153f8411866e2bec446b2ad13a9bbd";

let now = new Date();
let currentUnit = "celsius";

let h3 = document.querySelector("h3");

let hours = now.getHours();
let minutes = ("0" + now.getMinutes()).slice(-2);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h3.innerHTML = `${day} ${hours}:${minutes}`;

let searchTextInput = document.querySelector("#search-text-input");

function search(event) {
  event.preventDefault();

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTextInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function displayWeatherCondition(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);

    document.querySelector("h2").innerHTML = response.data.name;
    searchTextInput.value = null;

    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("#feelsLike").innerHTML = Math.round(
      response.data.main.feels_like
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
  });
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  if (currentUnit === "fahrenheit") return console.log("is F already");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  currentUnit = "fahrenheit";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  if (currentUnit === "celsius") return console.log("is C already");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  currentUnit = "celsius";
}

let celsiusLink = document.querySelector("#celsius-link");
console.log(celsiusLink);
celsiusLink.addEventListener("click", convertToCelsius);

// HOMEWORK WEEK 5 bonus
// function searchLocation(position) {
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(displayWeatherCondition);
// }

// function chooseCurrentLocation(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(searchLocation);
// }

// let currentLocationButton = document.querySelector("#current-location-button");
// currentLocationButton.addEventListener("click", chooseCurrentLocation);
