const apiKey = "53f43851772de39a52d865ab7fc77fd2";

async function getWeather() {
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();
    const weatherResult = document.getElementById("weatherResult");

    if (!city) {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    // show loading
    weatherResult.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                weatherResult.innerHTML = "<p>❌ City not found.</p>";
            } else {
                weatherResult.innerHTML = `<p>⚠ Error fetching weather data (status ${response.status}).</p>`;
            }
            return;
        }

        const data = await response.json();

        // guard for unexpected response shape
        if (!data || !data.main || !data.weather) {
            weatherResult.innerHTML = "<p>⚠ Unexpected response from weather service.</p>";
            return;
        }

        weatherResult.innerHTML = `
            <h2>${data.name || city}${data.sys && data.sys.country ? ', ' + data.sys.country : ''}</h2>
            <p>🌡 <strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p>🤗 <strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
            <p>☁ <strong>Weather:</strong> ${data.weather[0].description}</p>
            <p>💧 <strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p>🌬 <strong>Wind Speed:</strong> ${data.wind && data.wind.speed ? data.wind.speed + ' m/s' : 'N/A'}</p>
            <p>📊 <strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        `;

    } catch (error) {
        weatherResult.innerHTML = "<p>⚠ Error fetching weather data.</p>";
        console.error(error);
    }
}

// allow pressing Enter in the input to search
const cityEl = document.getElementById("city");
if (cityEl) {
    cityEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') getWeather();
    });
}

// ensure the function is available for inline onclick handlers
window.getWeather = getWeather;