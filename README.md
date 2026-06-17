# 🌦️ Aplicación Web de Consulta Meteorológica

## 📚 Materia

**Seminario de Sistemas**

## 👨‍🎓 Estudiante

**José Gabriel Flores Cardozo**

---

# 🌍 Weather App

Aplicación web desarrollada con **TypeScript**, **HTML** y **CSS** que permite consultar información meteorológica en tiempo real utilizando las APIs de **Open-Meteo**.

La aplicación obtiene las coordenadas geográficas de una ciudad mediante un servicio de geolocalización y posteriormente consulta las condiciones climáticas actuales para mostrar temperatura, humedad y estado del tiempo de manera amigable para el usuario.

---

## ✨ Características

- 🔎 Búsqueda de ciudades por nombre.
- 🌡️ Consulta de temperatura actual.
- 💧 Visualización de humedad relativa.
- ☁️ Interpretación de códigos meteorológicos.
- 😀 Uso de iconos dinámicos mediante emojis convertidos a SVG.
- ⚡ Desarrollo moderno con TypeScript.
- 🛡️ Tipado estricto para mayor seguridad y mantenibilidad.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología     | Descripción                             |
| -------------- | --------------------------------------- |
| TypeScript     | Lenguaje principal del proyecto         |
| HTML5          | Estructura de la interfaz               |
| CSS3           | Estilos y diseño visual                 |
| Vite           | Herramienta de desarrollo y empaquetado |
| Open-Meteo API | Servicio de datos meteorológicos        |
| Geocoding API  | Conversión de ciudades a coordenadas    |

---

## 📂 Estructura General del Proyecto

```text
weather-app/
│
├── src/
│   ├── main.ts
│   ├── types.ts
│   └── style.css
│
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Funcionamiento

### Paso 1: Geolocalización

El usuario introduce el nombre de una ciudad.

```text
La Paz
```

La aplicación consulta la API de Geocoding para obtener:

- Latitud
- Longitud
- Nombre de la ciudad
- País

---

### Paso 2: Consulta Meteorológica

Con las coordenadas obtenidas, se realiza una solicitud a la API de Open-Meteo para recuperar:

- Temperatura actual
- Humedad relativa
- Código meteorológico

---

### Paso 3: Visualización

Los datos se presentan en una tarjeta informativa mostrando:

```text
Ciudad: La Paz, Bolivia
Temperatura: 12°C
Condición: Parcialmente Nublado
Humedad: 55%
```

---

## 🔒 Uso de TypeScript

El proyecto implementa interfaces para garantizar la correcta estructura de los datos recibidos desde la API.

### GeocodingResponse

```ts
export interface GeocodingResponse {
  results?: Array<{
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  }>;
}
```

### WeatherResponse

```ts
export interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
  };
}
```

---

## 🚀 Instalación

### Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

### Ingresar al proyecto

```bash
cd weather-app
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

---

## 🎯 Objetivos Académicos

Este proyecto fue desarrollado con fines académicos para la materia **Seminario de Sistemas**, aplicando conceptos de:

- Programación Web Moderna.
- Consumo de APIs REST.
- Programación Asíncrona.
- Manejo de Errores.
- TypeScript.
- Manipulación del DOM.
- Buenas Prácticas de Desarrollo Frontend.

---

## 📖 Aprendizajes Obtenidos

Durante el desarrollo de este proyecto se fortalecieron conocimientos relacionados con:

✔ Tipado estático mediante TypeScript.

✔ Consumo de servicios web utilizando Fetch API.

✔ Validación y manejo de errores.

✔ Organización modular del código.

✔ Integración de APIs externas.

✔ Desarrollo utilizando Vite como entorno moderno.

---

## 🏫 Universidad

**Universidad Autónoma Tomás Frías (UATF)**

Carrera de Ingeniería de Sistemas

Materia: **Seminario de Sistemas**

Gestión 2026

---

<div align="center">

### 🌦️ Weather App

### Desarrollado por José Gabriel Flores Cardozo

_"La información es poder, y los datos climáticos también."_

</div>
