const weatherIcon = document.getElementById('weather-icon');
const currentTemp = document.getElementById('current-temp');
const currentCondition= document.getElementById('current-condition');
const high = document.getElementById('high');
const low = document.getElementById('low');
const currentHumidity = document.getElementById('current-humidity');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

const secondDay = document.getElementById('second-day');
const thirdDay = document.getElementById('third-day');
const todayHigh = document.getElementById('today-high');
const secondDayHigh = document.getElementById('second-day-high');
const thirdDayHigh = document.getElementById('third-day-high');

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=32.71&lon=-117.15&units=imperial&appid=be03db4043a9866af81afe4883647b88`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=32.71&lon=-117.15&cnt=24&units=imperial&appid=be03db4043a9866af81afe4883647b88`;

async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayCurrentWeather(data) {
    const weatherImg = document.createElement('img');
    weatherImg.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherImg.alt = data.weather[0].description;
    weatherIcon.appendChild(weatherImg);

    currentTemp.textContent = Math.round(data.main.temp);
    currentCondition.textContent = data.weather[0].main;
    high.textContent = Math.round(data.main.temp_max);
    low.textContent = Math.round(data.main.temp_min);
    currentHumidity.textContent = Math.round(data.main.humidity);

    const sunriseDate = new Date(data.sys.sunrise * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' });
    sunrise.textContent = sunriseTime;
    const sunsetDate = new Date(data.sys.sunset * 1000);
    let sunsetTime = sunsetDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    sunset.textContent = sunsetTime;
}

function displayForecast(data) {
    const highs = findDailyHighs(data);

    todayHigh.textContent = Math.round(highs[0].high);
    secondDay.textContent = highs[1].date;
    secondDayHigh.textContent = Math.round(highs[1].high);
    thirdDay.textContent = highs[2].date;
    thirdDayHigh.textContent = Math.round(highs[2].high);
}

function findDailyHighs(data) {
    return data.list.reduce(function (acc, day) {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
        const accLast = acc[acc.length - 1];

        if (date == accLast.date) {
            accLast.high = Math.max(accLast.high, day.main.temp_max);
        } else {
            acc.push({ date: date, high: day.main.temp_max });
        }

        return acc;
    }, [{ date: new Date(data.list[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }), high: data.list[0].main.temp_max }]);
}

async function getWeather() {
    weatherData = await apiFetch(weatherUrl);
    displayCurrentWeather(weatherData);
    forecastData = await apiFetch(forecastUrl);
    displayForecast(forecastData);
}

async function populateSpotlights() {
	const response = await fetch('data/members.json');
	const businesses = await response.json();
    const qualifiedBusinesses = businesses.filter(
        business => business.membership_level === 'silver' || business.membership_level === 'gold'
    );

    for (let spotlightIndex = 1; spotlightIndex <= 3; spotlightIndex++) {
        const randomIndex = Math.floor(Math.random() * qualifiedBusinesses.length);
        const spotlightBusiness = qualifiedBusinesses.splice(randomIndex, 1)[0];
        document.getElementById(`spotlight${spotlightIndex}-name`).textContent = spotlightBusiness.name;
        document.getElementById(`spotlight${spotlightIndex}-tag`).textContent = spotlightBusiness.tag;
        document.getElementById(`spotlight${spotlightIndex}-phone`).textContent = spotlightBusiness.phone;

        const spotlightImg = document.getElementById(`spotlight${spotlightIndex}-image`);
        const img = document.createElement('img');
        img.src = spotlightBusiness.image;
        img.alt = `${spotlightBusiness.name} Logo`;
        spotlightImg.appendChild(img);
        
        const emailLink = document.createElement('a');
        emailLink.href = `mailto:${spotlightBusiness.email}`;
        emailLink.textContent = spotlightBusiness.email;
        document.getElementById(`spotlight${spotlightIndex}-email`).appendChild(emailLink);

        const websiteLink = document.createElement('a');
        websiteLink.href = spotlightBusiness.website;
        websiteLink.textContent = spotlightBusiness.website;
        document.getElementById(`spotlight${spotlightIndex}-url`).appendChild(websiteLink);
    }
}

getWeather();
populateSpotlights();