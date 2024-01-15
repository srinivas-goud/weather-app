function getWeather()
{
    const apiKey = "bd5e378503939ddaee76f12ad7a97608";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
  
const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


async function getWeatherByLocation(city){
     
         const resp = await fetch(url(city), {
             origin: "cros" });
         const respData = await resp.json();
     
           addWeatherToPage(respData);
           displayWeather(respData)
          
     }

      function addWeatherToPage(data){
          const temp = Ktoc(data.main.temp);

          const weather = document.createElement('div')
          weather.classList.add('weather');
          const weatherInfoContainer = document.getElementById('weather-info');
          const temperature = Math.round(data.main.temp - 273.15);

          weather.innerHTML = `
          <h1><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h1>
    
              <h2>${data.name}, ${data.sys.country}</h2>
              <p>Temperature: ${temperature}°C</p>
              <p>Weather: ${data.weather[0].description}</p>          
          `;



        //   cleanup 
          main.innerHTML= "";
           main.appendChild(weather);
      };


     function Ktoc(K){
         return Math.floor(K - 273.15);
     }



     form.addEventListener('submit',(e) =>{
        e.preventDefault();

        const city = search.value;

        if(city){
            getWeatherByLocation(city)
        }

     });
    }
