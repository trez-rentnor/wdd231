const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const figCaption = document.querySelector('figcaption');

const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.74&lon=6.63&units=imperial&appid=be03db4043a9866af81afe4883647b88`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayResults(data) {
    currentTemp.textContent = data.main.temp;
    weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    figCaption.textContent = data.weather[0].description;
}

apiFetch();
