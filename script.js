const apiKey = "53f43851772de39a52d865ab7fc77fd2";

async function getWeather() {

    const city = document.getElementById("city").value;
    const weatherResult = document.getElementById("weatherResult");

    if(city === ""){
        weatherResult.innerHTML =
        "<p>Please enter a city name.</p>";
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if(data.cod != 200){
            weatherResult.innerHTML =
            "<p>❌ City not found.</p>";
            return;
        }

        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>🌡 <strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p>🤗 <strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
            <p>☁ <strong>Weather:</strong> ${data.weather[0].description}</p>
            <p>💧 <strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p>🌬 <strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            <p>📊 <strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        `;

    } catch(error) {

        weatherResult.innerHTML =
        "<p>⚠ Error fetching weather data.</p>";

        console.log(error);
    }
}