const apiKey='YOUR API KEY HERE'
const defaultCity="Highland"
async function fetchData(cityName){
    
    try {
        if (navigator.onLine) {
            // console.log("gbregr");
            const response = await fetch(`connection.php?q=${cityName}`);  //fetching ma take some time so using await
            if (!response.ok) { //.ok returns true boolean value when fetched successfully
                throw new Error("Error While Fetching data")
            }
            let data= await response.json() //converting data into json format
            console.log(data);
            updateWeather(data)
            localStorage.setItem(cityName,JSON.stringify(data));
        }
    else{
        data=JSON.parse(localStorage.getItem(cityName));
    }
}
catch(err){
console.log("Error Has Occured"+err);
}}
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
    cityElement.textContent = data[0].city;
    const currentDate = new Date();
    date.textContent = currentDate.toDateString(); //.toDateString gives only date excluding the GMT
    Icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data[0].icon_code}@2x.png" alt="">
                      <span class="description-text">${data[0].weather_description}</span>`
    temperature.textContent = `${data[0].temperature}°C`;
    pressure.textContent= `${data[0].pressure}`;
    windSpeed.textContent = `${data[0].wind} km/h`;
    humidity.textContent = `${data[0].humidity}%`;
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
fetchData(defaultCity) //Default 
// } catch (err) {
    //     console.log('ERROR   '+ err); 
    // }
