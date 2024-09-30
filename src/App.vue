<style>
* {
    margin: 0;
    margin-top: 10px;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #2E6582;
    color: white;
}

.topmenu {
  display: flex;
  align-items: center;
  background-color: #132C46;
  padding: 10px;
  position: relative;
  white-space: nowrap; /* Забезпечує горизонтальне розташування */
}

.sities-container {
  flex: 1;
  overflow-x: hidden; /* Вимикає горизонтальний скрол для користувачів */
  white-space: nowrap; /* Всі міста в одну лінію */
  display: flex;
  align-items: center;
}

.sities {
    display: flex;
    justify-content: center;
    gap: 20px; /*Відстань між містами */
    flex-grow: 1; /*Дозволяє містам займати ширину між іконками */
    text-align: center;
    /* pointer-events: none; */
}

.sities div {
    font-size: 25px;
    cursor: pointer;
    padding: 5px 10px; /* Додаємо відступи для кожного міста*/
    margin: 1px 50px 1px 50px;
    border-radius: 10px; /* Округлені краї */
}

.sities div.active {
    background-color: #607ec7; /* Колір фону для вибраного міста*/
    color: black; /* Чорний текст для активного міста*/
    box-shadow: 0px 2px 8px 2px;
}

.sities div:hover {
    text-decoration: underline; /* Ефект при наведенні*/
}

.sities .active {
  font-weight: bold;
  text-decoration: underline;
}

.bx {
  font-size: 30px;
  cursor: pointer;
}

#scrollLeft, #scrollRight {
  color: white;
}

.topmenu i {
    font-size: 40px; /* Розмір іконок */
    cursor: pointer;
    background-color: #132C46; /* Фон під іконками */
    padding: 0 10px 0 10px;
}

.maininf {
  padding: 100px 0 0 100px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 40vh;
  }
.mtemperature {
    font-size: 100px;
    display: flex;
  }
.condition {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    margin-left: 70px;
    margin-top: 47px;
    font-size: 40px;
  }
.mean {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 24px;
  }
.forecast {
    background-color: #132C46;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    justify-content: space-around;
    width: 85%; /* Задаємо ширину блоку на всю ширину viewport */
    margin: 0; /* Прибираємо будь-які відступи */
  }
.forecast-item {
    font-size: 24px;
    text-align: center;
  }
.forecast-block {
    background-color: #132C46;
    border-radius: 20px;
    padding: 20px;
    width: 90%; /* Ширина блоку */
    margin: 0 auto; /* Центрування на сторінці */
}

.forecast-day {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Лінія між днями */
}

.day-name {
    font-size: 30px;
    font-weight: bold;
}

.weather-info {
    display: flex;
    align-items: center;
}

.weather-info .bx {
    font-size: 40px;
    margin-right: 50px; /* Відступ між іконкою і температурою */
}

.temperature {
    font-size: 30px;
    font-weight: bold;
}

.info-blocks {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    padding: 50px 0 20px 0;
    width: 90%;
    margin: 0 auto; /* Центрування на сторінці */
}

.info-card {
    background-color: #0C2A42;
    border-radius: 20px;
    width: 45%;
    height: 150px;
    position: relative;
    padding: 20px;
}

.info-title {
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 30px;
    font-weight: bold;
}

.info-value {
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-size: 28px;
    font-weight: bold;
}

.info-card i {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 70px;
}

.info-description {
  position: absolute;
  top: 50px;
  font-size: 20px;
}

/* Стилі для модального вікна */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #132C46;
  margin: 15% auto;
  padding: 20px;
  border-radius: 20px;
  width: 80%;
  height: 55%;
  max-width: 500px;
  color: white;
  text-align: center;
}

.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

input#citySearch {
  width: 80%;
  padding: 10px;
  border-radius: 10px;
  border: none;
  margin-top: 20px;
}

button#searchCityBtn {
  padding: 10px 20px;
  background-color: #1D3547;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
}

button#searchCityBtn:hover {
  background-color: #0C2A42;
}
</style>
<script setup>
import { ref, computed } from 'vue'
const modal = ref(null)
const citiesPerSlide = 3
const currentSlide = ref(0)
const listPosition = ref([])
const hourlyWeather = ref([])
const dailyWeather = ref([])
const dataLocation = ref(null)
const dataWeather = ref(null)
const citySearchText = ref('')
let id = 0
const cityList = ref([])
const appid = ref('5ecae512c05deedbe3b442ff6e4fb519')
const cityChunks = computed(() => {
  const chunks = []
  for (let i = 0; i < cityList.value.length; i += citiesPerSlide) {
    chunks.push(cityList.value.slice(i, i + citiesPerSlide))
  }
  return chunks
})
const maxSlide = computed(() => cityChunks.value.length - 1)

const nextSlide = () => {
  if (currentSlide.value < maxSlide.value) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}
function openModal () {
  modal.value.style.display = 'block'
}
function closeModal () {
  modal.value.style.display = 'none'
}
function coverterToKm (visibility) {
  return Number(visibility) / 1000
}
function changeCity (city) {
  listPosition.value[0] = city.lat
  listPosition.value[1] = city.lon
  clearWeatherData()
  getTempeturebyCity()
  findElementCity(city.id)
}
function findElementCity (id) {
  for (let i = 0; i < 9; i++) {
    if (cityList.value[i].id === id) {
      cityList.value[i].active = true
    } else {
      cityList.value[i].active = false
    }
  }
}
async function searchCity () {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearchText.value}&limit=1&appid=${appid.value}`
  let response = await fetch(url)
  response = await response.json()
  if (response) {
    let cityData = { id: id++, name: citySearchText.value, lat: response[0].lat, lon: response[0].lon, active: false }
    cityList.value.push(cityData)
  }
}
async function getTempeture () {
  await getLocation()
  let cityData = { id: id++, name: dataLocation.value.address.city, lat: listPosition.value[0], lon: listPosition.value[1], active: true }
  cityList.value.push(cityData)
  callWeatherAPIByLocation()
  callWeatherAPIByHour()
  callWeatherAPIByDay()
}
function clearWeatherData () {
  hourlyWeather.value = []
  dailyWeather.value = []
  dataWeather.value = null
}
async function getTempeturebyCity () {
  callWeatherAPIByLocation()
  callWeatherAPIByHour()
  callWeatherAPIByDay()
}
function filterDate (date) {
  let options = { weekday: 'long' }
  if (date.getDate() === new Date().getDate()) {
    return 'Today'
  } else if (date.getDate() === new Date().getDate() + 1) {
    return 'Tomorrow'
  } else {
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }
}
async function callWeatherAPIByLocation () {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${listPosition.value[0]}&lon=${listPosition.value[1]}&units=metric&appid=${appid.value}`
  const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${listPosition.value[0]}&longitude=${listPosition.value[1]}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1&forecast_hours=6`
  let response = await fetch(url)
  response = await response.json()
  let responseMaxMin = await fetch(url2)
  responseMaxMin = await responseMaxMin.json()
  dataWeather.value = response.main
  dataWeather.value.temp_max = responseMaxMin.daily.temperature_2m_max[0]
  dataWeather.value.temp_min = responseMaxMin.daily.temperature_2m_min[0]
  dataWeather.value.visibility = response.visibility
  dataWeather.value.wind = response.wind
  dataWeather.value.description = response.weather[0].main
}
async function callWeatherAPIByHour () {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${listPosition.value[0]}&longitude=${listPosition.value[1]}&hourly=temperature_2m&timezone=auto&forecast_days=1&forecast_hours=6`
  let response = await fetch(url)
  response = await response.json()
  for (let i = 0; i < 6; i++) {
    let weatherHourData = { id: i, weather: response.hourly.temperature_2m[i], time: response.hourly.time[i] }
    hourlyWeather.value.push(weatherHourData)
  }
}
async function callWeatherAPIByDay () {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${listPosition.value[0]}&longitude=${listPosition.value[1]}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_hours=6`
  let response = await fetch(url)
  response = await response.json()
  for (let i = 0; i < 6; i++) {
    let weatherDayData = { id: i, weather_max: response.daily.temperature_2m_max[i], weather_min: response.daily.temperature_2m_min[i], date: response.daily.time[i] }
    dailyWeather.value.push(weatherDayData)
  }
}
function getPosition () { // потрібно повернути значення довготи та широти з функції getCurrentPosition,для цього обернув її в Promise
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
async function getLocation () { // отримання даних містознаходження
  await getPosition().then((position) => {
    listPosition.value.push(position.coords.latitude)
    listPosition.value.push(position.coords.longitude)
  })
  const url = `https://nominatim.openstreetmap.org/reverse.php?lat=${listPosition.value[0]}&lon=${listPosition.value[1]}&zoom=18&format=jsonv2`
  const response = await fetch(url)
  dataLocation.value = await response.json()
}
getTempeture()

window.onclick = function (event) {
  if (event.target === modal.value) {
    modal.value.style.display = 'none'
  }
}

</script>
<template>
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <title>Weather</title>
</head>
<body>
  <div class="topmenu">
    <i class='bx bx-chevron-left-circle' id="scrollLeft"  @click="prevSlide"></i>
    <div class="sities-container">
        <div class="sities" id="citiesList" v-for="(chunk, index) in cityChunks" :key="index" v-show="index === currentSlide">
            <div :class="{ active: city.active }" v-for="city in chunk" :key="city.id" @click="changeCity(city)">{{city.name}}</div>
        </div>
    </div>
    <i class='bx bx-plus' id="openModal" @click="openModal"></i>
    <i class='bx bx-chevron-right-circle' id="scrollRight" @click="nextSlide"></i>
  </div>

    <div id="myModal" class="modal" ref="modal">
      <div class="modal-content" >
          <span class="close" @click="closeModal">&times;</span>
          <h2>Search for City</h2>
          <input type="text" id="citySearch" placeholder="Enter city name..." v-model="citySearchText"/>
          <button id="searchCityBtn" @click="searchCity">Search</button>
      </div>
    </div>

      <div class="maininf">
        <div class="mtemperature">{{Math.round(Number(dataWeather.temp))}}°C <p class="condition">{{ dataWeather.description }}</p></div>
        <div class="mean">{{Math.round(Number(dataWeather.temp_min))}} / {{Math.round(Number(dataWeather.temp_max))}}</div>
      </div>
    <div class="container">
        <div class="forecast">
          <div v-for="weather in hourlyWeather" v-bind:key="weather.id" class="forecast-item">
            <div>{{ new Date(weather.time).getHours() === new Date().getHours()? "Now":`${new Date(weather.time).getHours()}:00` }}</div>
            <div>{{ new Date(weather.time).getHours() === new Date().getHours()? Math.round(Number(dataWeather.temp)) : Math.round(Number(weather.weather))  }}</div>
          </div>
          <!-- <div class="forecast-item">
            <div>16:00</div>
            <div>25</div>
          </div>
          <div class="forecast-item">
            <div>17:00</div>
            <div>26</div>
          </div>
          <div class="forecast-item">
            <div>18:00</div>
            <div>26</div>
          </div>
          <div class="forecast-item">
            <div>19:00</div>
            <div>26</div>
          </div>
          <div class="forecast-item">
            <div>20:00</div>
            <div>26</div>
          </div> -->
        </div>
      </div>
      <div class="forecast-block">
        <div v-for="weather in dailyWeather" :key="weather.id" class="forecast-day">
            <span class="day-name">{{filterDate(new Date(weather.date))}}</span>
            <div class="weather-info">
                <i class='bx bx-sun'></i>
                <span class="temperature">{{Math.round(Number(weather.weather_min))}}/{{Math.round(Number(weather.weather_max))}}</span>
            </div>
        </div>
        <!-- <div class="forecast-day">
            <span class="day-name">Tomorrow</span>
            <div class="weather-info">
              <i class='bx bx-cloud-light-rain'></i>
                <span class="temperature">25/13</span>
            </div>
        </div>
        <div class="forecast-day">
            <span class="day-name">Monday</span>
            <div class="weather-info">
              <i class='bx bx-cloud-lightning'></i>
                <span class="temperature">25/13</span>
            </div>
        </div>
        <div class="forecast-day">
            <span class="day-name">Tuesday</span>
            <div class="weather-info">
                <i class='bx bx-sun'></i>
                <span class="temperature">25/13</span>
            </div>
        </div>
        <div class="forecast-day">
            <span class="day-name">Wednesday</span>
            <div class="weather-info">
                <i class='bx bx-sun'></i>
                <span class="temperature">25/13</span>
            </div>
        </div>
        <div class="forecast-day">
            <span class="day-name">Thursday</span>
            <div class="weather-info">
                <i class='bx bx-sun'></i>
                <span class="temperature">25/17</span>
            </div>
        </div> -->
    </div>
    <div class="info-blocks">
      <div class="info-card">
          <span class="info-title">Humidity</span>
          <i class='bx bx-droplet'></i>
          <span class="info-value">{{dataWeather.humidity}}%</span>
      </div>
      <div class="info-card">
          <span class="info-title">Wind</span>
          <span class="info-description">Southwest</span>
          <i class='bx bx-wind'></i>
          <span class="info-value">{{Math.round(dataWeather.wind.speed)}} m/s</span>
      </div>
      <div class="info-card">
          <span class="info-title">Pressure</span>
          <i class='bx bx-water'></i>
          <span class="info-value">{{dataWeather.pressure}} hPa</span>
      </div>
      <div class="info-card">
          <span class="info-title">Visibility</span>
          <i class='bx bx-show-alt'></i>
          <span class="info-value">{{coverterToKm(dataWeather.visibility)}}km</span>
      </div>
  </div>
</body>
</html>
</template>
