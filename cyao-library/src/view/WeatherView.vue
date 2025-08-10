<template>
    <div class="header" >
        <h1>WEATHER APP</h1>
        <div class="search-bar">
            <input 
                type="text" 
                v-model="city"
                placeholder="Enter city name"
                class="search-input"
            />
            <button @click="searchByCity" class="search-button">
                Search
            </button>
            <br>
            <br>
            <div v-if="weatherData">
                <h2>
                    {{ weatherData.name }}, {{ weatherData.sys.country }}
                </h2>
                <div>
                    <img :src="iconUrl" alt="Weather Icon" />
                    <p>{{ temperature }} °C</p>
                </div>
                <span>
                    {{ weatherData.weather[0].description }}
                </span>
            </div>
        </div>
    </div>

</template>
<style scoped>
    .header {
    display: flex;
    flex-direction: column;  /* Center horizontally *//* Center vertically */
    min-height: 100vh;     /* Full viewport height */
    text-align: center;
}
</style>
<script >
// The info section in 10.1.1 provided detailed information about this package 
  import axios from "axios";

  const apikey = "8dd388fbf91c6eca2cdf4f14ef332734";
  
  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },

    computed: {
       temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273)
          : null;
      },
      iconUrl() {
        return this.weatherData
          ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords; 
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          });
        }
      },
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          //Returned data from API is stored as JSON file in weatherData
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
      async searchByCity() {
        if (this.city) {
          const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        } else {
          alert("Please enter a city name.");
        }
      },
    }
  }
</script>