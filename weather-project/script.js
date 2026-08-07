let currentWeatherData = null;
let currentUnit = 'C';

async function getWeather(city) {
  const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
  if (!response.ok) throw new Error("City not found");
  return await response.json();
}

function celsiusToFahrenheit(c) {
  return ((c * 9) / 5 + 32).toFixed(1);
}

function formatTemp(tempC) {
  if (currentUnit === 'C') return `${tempC}°C`;
  return `${celsiusToFahrenheit(tempC)}°F`;
}

function setUnit(unit) {
  currentUnit = unit;
  document.getElementById('btn-c').className = unit === 'C'
    ? 'text-xs text-blue-300 font-semibold border-b border-blue-300 pb-0.5'
    : 'text-xs text-white/40';
  document.getElementById('btn-f').className = unit === 'F'
    ? 'text-xs text-blue-300 font-semibold border-b border-blue-300 pb-0.5'
    : 'text-xs text-white/40';

  if (currentWeatherData) updateDisplay(currentWeatherData);
}

function updateDisplay(data) {
  const temp = data.main?.temp ?? null;
  const feelsLike = data.main?.feels_like ?? null;

  document.getElementById("main-temperature").textContent = temp !== null ? formatTemp(temp) : "N/A";
  document.getElementById("feels-like").textContent = feelsLike !== null ? formatTemp(feelsLike) : "N/A";
  document.getElementById("humidity").textContent = data.main?.humidity != null ? `${data.main.humidity}%` : "N/A";
  document.getElementById("wind").textContent = data.wind?.speed != null ? `${data.wind.speed} m/s` : "N/A";
  document.getElementById("wind-gust").textContent = data.wind?.gust != null ? `${data.wind.gust} m/s` : "N/A";
  document.getElementById("weather-main").textContent = data.weather[0]?.description ?? "N/A";
  document.getElementById("location").textContent = data.name ?? "N/A";
  document.getElementById("weather-icon").src = data.weather[0]?.icon ?? "";
}

function showError(msg) {
  const el = document.getElementById("error-msg");
  el.textContent = msg;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 4000);
}

async function showWeather(city) {
  if (!city.trim()) return;

  const spinner = document.getElementById("spinner");
  const card = document.getElementById("weather-card");

  spinner.classList.add("show");
  card.classList.remove("show");

  try {
    const data = await getWeather(city);
    currentWeatherData = data;
    updateDisplay(data);
    card.classList.add("show");
  } catch (err) {
    showError("City not found. Try another name.");
  } finally {
    spinner.classList.remove("show");
  }
}

function quickSearch(city) {
  document.getElementById("city-input").value = city;
  showWeather(city);
}

document.getElementById("get-weather-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  showWeather(city);
});

document.getElementById("city-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    showWeather(e.target.value);
  }
});