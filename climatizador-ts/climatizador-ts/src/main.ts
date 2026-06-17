import { GeocodingResponse, WeatherResponse } from "./types";

// 1. Selección estricta de elementos del DOM especificando su tipo de nodo HTML
const form = document.getElementById("weather-form") as HTMLFormElement;
const cityInput = document.getElementById("city-input") as HTMLInputElement;
const weatherCard = document.getElementById("weather-card") as HTMLDivElement;
const cityName = document.getElementById("city-name") as HTMLHeadingElement;
const weatherIcon = document.getElementById("weather-icon") as HTMLImageElement;
const temperature = document.getElementById(
  "temperature",
) as HTMLParagraphElement;
const condition = document.getElementById("condition") as HTMLParagraphElement;
const humidity = document.getElementById("humidity") as HTMLElement;
const errorMessage = document.getElementById(
  "error-message",
) as HTMLParagraphElement;

// 2. Diccionario dinámico para mapear códigos de Open-Meteo a textos explicativos y emojis
function getWeatherDetails(code: number): { text: string; icon: string } {
  if (code === 0) return { text: "Despejado", icon: "☀️" };
  if (code >= 1 && code <= 3)
    return { text: "Parcialmente Nublado", icon: "⛅" };
  if (code === 45 || code === 48) return { text: "Niebla", icon: "🌫️" };
  if (code >= 51 && code <= 67) return { text: "Lluvia", icon: "🌧️" };
  if (code >= 71 && code <= 77) return { text: "Nieve", icon: "❄️" };
  if (code >= 80 && code <= 82) return { text: "Chubascos", icon: "🌦️" };
  if (code >= 95 && code <= 99) return { text: "Tormenta", icon: "⛈️" };
  return { text: "Nublado", icon: "☁️" };
}

// 3. Orquestador asíncrono central
async function fetchWeather(city: string): Promise<void> {
  try {
    // Inicializamos el estado visual limpiando errores y tarjetas previas
    weatherCard.classList.add("hidden");
    errorMessage.classList.add("hidden");

    // PASO A: Convertir texto de ciudad a Coordenadas Geográficas (Geocoding API)
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`;
    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok)
      throw new Error("Error al conectar con el servicio de geolocalización");

    const geoData: GeocodingResponse = await geoResponse.json();

    // Validamos la existencia de resultados de manera segura gracias al tipado estricto
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Ciudad no encontrada. Intenta con otra.");
    }

    // Desestructuramos los datos del primer elemento obtenido
    const { latitude, longitude, name, country } = geoData.results[0];

    // PASO B: Consultar las métricas del clima usando las coordenadas obtenidas (Forecast API)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok)
      throw new Error("Error al obtener las condiciones meteorológicas");

    const weatherData: WeatherResponse = await weatherResponse.json();

    // PASO C: Renderizar la información final en la UI
    displayWeather(name, country, weatherData);
  } catch (error) {
    // Control y despliegue del flujo de errores en la UI
    errorMessage.textContent =
      error instanceof Error ? error.message : "Ocurrió un error inesperado";
    errorMessage.classList.remove("hidden");
  }
}

// 4. Inyección controlada de datos al DOM
function displayWeather(
  city: string,
  country: string,
  data: WeatherResponse,
): void {
  const details = getWeatherDetails(data.current.weather_code);

  cityName.textContent = `${city}, ${country}`;
  temperature.textContent = `${data.current.temperature_2m}°C`;
  condition.textContent = details.text;
  humidity.textContent = `${data.current.relative_humidity_2m}%`;

  // Técnica Avanzada: Convertimos dinámicamente un emoji en una imagen vectorial inline SVG
  weatherIcon.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='80'>${details.icon}</text></svg>`;
  weatherIcon.alt = details.text;

  // Revelamos la tarjeta de resultados quitando la clase de ocultamiento CSS
  weatherCard.classList.remove("hidden");
}

// 5. Manejador del Evento Submit del Formulario
form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});
