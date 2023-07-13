let currentDate = new Date();
let day = currentDate.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = currentDate.getMonth();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = currentDate.getDate();

let year = currentDate.getFullYear();

let today = ` ${days[day]}, ${months[month]}  ${date}  ${year} `;
document.getElementById("local-time").innerHTML = today;

//
function search(event) {
  event.preventDefault();
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let city = document.querySelector("#city-input").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(function (response) {
    displayWeatherCondition(response);
  });
}

function displayWeatherCondition(response) {
  // Moved the line inside the function so it has access to the response parameter
  document.querySelector("#city-location").innerHTML = response.data.name;
  document.querySelector("#now").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

let searchForm = document.querySelector(".search-engine");

//geolocation
function getGeolocation(position) {
  let apiKey = "bfcac921947e5c88b3a3d8c93cba5462";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(geoUrl).then(displayWeatherCondition);
}
function handleGeo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getGeolocation);
}
// Moved the event listener setup after the function definitions
searchForm.addEventListener("submit", search);

let searchingButton = document.querySelector(".search-button");
searchingButton.addEventListener("click", search);

let geoButton = document.querySelector(".geolocation-button");
geoButton.addEventListener("click", handleGeo);
