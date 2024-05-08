const apiKey='your api key'
const defaultCity="Highland"
async function fetchData(cityName){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    try {
        const response=await fetch(url)  //fetching ma take some time so using await
        if (!response.ok) { //.ok returns true boolean value when fetched successfully
            throw new Error("Error While Fetching data")
        }
        const data= await response.json() //converting data into json format
        console.log(data);
        updateWeather(data)
    } catch (err) {
        console.log('ERROR'+ err); 
    }
}
// selecting and storing dynamic contents in variable
const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const pressure = document.querySelector(".pressure-level");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity-level");
const date = document.querySelector(".date");
const Icon = document.querySelector(".icon");
//function to update weather data takes json data from the api as parameters
function updateWeather(data) {
    cityElement.textContent = data.name;
    const currentDate = new Date();
    date.textContent = currentDate.toDateString(); //.toDateString gives only date excluding the GMT
    Icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                      <span class="description-text">${data.weather[0].description}</span>`
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    pressure.textContent= `${data.main.pressure}`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
}
// selecting and storing search box and search button
const searchButton = document.querySelector(".search-button");
const input = document.querySelector(".search-box");

searchButton.addEventListener("click", ()=> { //for fetching the data of city typed in search box
    const cityName=input.value;
    if (cityName!="") {
        fetchData(cityName);
        input.value = "";
    }
});
fetchData(defaultCity) //Default city
