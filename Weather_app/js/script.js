const apiKey = "21f343534545fe31a83c7ffe6873f333";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "˚C"; //data.main a JSON formátumon belüli objektum egy tömb eleme
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + "km/h"; //data.wind a JSON formátumon belüli objektum egy másik tömb eleme

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/cloudy.png";
    } else if (data.weather[0].main == "Mist") {
      //data.weather.main a JSON formátumon belüli objektum egy másik tömb eleme
      weatherIcon.src = "images/foggy_animated.gif";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rainy.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snowy.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/sunny.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
    searchBox.value = "";
  }
});
