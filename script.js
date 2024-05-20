document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '18ef107e32964a409eb51020241905';
    const defaultCity = 'Dhaka';
    
    const cityInput = document.getElementById('cityInput');
    const searchButton = document.getElementById('searchButton');
    const locationElem = document.getElementById('location');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperatureElem = document.getElementById('temperature');
    const conditionElem = document.getElementById('condition');
    const detailsElem = document.getElementById('details');
    const feelsElem = document.getElementById('feels');
    const weatherInfo = document.querySelector('.weather-info');
    const themeButton = document.getElementById('themeButton');
    const body = document.body;

    const fetchWeather = (city) => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
            .then(response => {
                if (!response.ok) {
                    if (response.status >= 400 && response.status < 500) {
                        throw new Error('Client Error: Please check the city name and try again.');
                    } else if (response.status >= 500) {
                        throw new Error('Server Error: Please try again later.');
                    } else {
                        throw new Error('Unexpected Error: Please try again.');
                    }
                }
                return response.json();
            })
            .then(data => {
                const { location, current } = data;
                locationElem.textContent = `${location.name}, ${location.country}`;
                weatherIcon.src = `http:${current.condition.icon}`;
                temperatureElem.textContent = `Temperature: ${current.temp_c}°C / ${current.temp_f}°F`;
                conditionElem.textContent = `Condition: ${current.condition.text}`;
                detailsElem.textContent = `Humidity: ${current.humidity}% | Wind: ${current.wind_kph} kph`;
                feelsElem.textContent = `Feels like: ${current.feelslike_c}°C`;
                weatherInfo.style.display = 'block';
            })
            .catch(error => {
                alert(error.message);
                console.error(error);
            });
    };

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name');
        }
    });

    themeButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = themeButton.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    fetchWeather(defaultCity);
});
