function attachEvents() {
    const forecastBaseUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    const forecastTodayUrl = 'http://localhost:3030/jsonstore/forecaster/today/';
    const forecastUpcomingUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming/';

    const elements = {
        locationInput: document.getElementById('location'),
        getWeatherBtn: document.getElementById('submit'),
        current: document.getElementById('current'),
        upcoming: document.getElementById('upcoming'),
        forecast: document.getElementById('forecast'),
    };

    elements.getWeatherBtn.addEventListener('click', getWeather);

    async function getWeather() {
        const location = elements.locationInput.value;
        const locations = await getLocations(location);

        if (locations.length === 0) {
            return alert('Location not found!');
        }

        const [locationData] = locations;
        const [today, upcoming] = await Promise.all([
            getTodayForecast(locationData.code),
            getUpcomingForecast(locationData.code),
        ]);

        elements.forecast.style.display = 'block';
        displayTodayForecast(today);
        displayUpcomingForecast(upcoming);
    }

    async function getLocations(location) {
        const response = await fetch(`${forecastBaseUrl}?where=name=${location}`);
        const data = await response.json();

        return data;
    }

    async function getTodayForecast(code) {
        const response = await fetch(`${forecastTodayUrl}${code}`);
        const data = await response.json();

        return data;
    }

    async function getUpcomingForecast(code) {
        const response = await fetch(`${forecastUpcomingUrl}${code}`);
        const data = await response.json();

        return data;
    }

    function displayTodayForecast(today) {
        const div = createElement('div', 'forecasts');
        const symbolSpan = createElement('span', 'condition symbol', getSymbol(today.forecast.condition));
        const conditionSpan = createElement('span', 'condition');
        const citySpan = createElement('span', 'forecast-data', today.name);
        const degreesSpan = createElement('span', 'forecast-data', `${today.forecast.low}°/${today.forecast.high}°`);
        const conditionSpanText = createElement('span', 'forecast-data', today.forecast.condition);

        conditionSpan.appendChild(citySpan);
        conditionSpan.appendChild(degreesSpan);
        conditionSpan.appendChild(conditionSpanText);

        div.appendChild(symbolSpan);
        div.appendChild(conditionSpan);
        elements.current.appendChild(div);
    }

    function displayUpcomingForecast(upcoming) {
        const div = createElement('div', 'forecast-info');

        upcoming.forecast.forEach(f => {
            const upcomingSpan = createElement('span', 'upcoming');
            const symbolSpan = createElement('span', 'symbol', getSymbol(f.condition));
            const degreesSpan = createElement('span', 'forecast-data', `${f.low}°/${f.high}°`);
            const conditionSpan = createElement('span', 'forecast-data', f.condition);

            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(degreesSpan);
            upcomingSpan.appendChild(conditionSpan);
            div.appendChild(upcomingSpan);
        });

        elements.upcoming.appendChild(div);
    }

    function getSymbol(condition) {
        const symbols = {
            'Sunny': '☀',
            'Partly sunny': '⛅',
            'Overcast': '☁',
            'Rain': '☂',
            'Degrees': '°',
        };

        return symbols[condition];
    }

    function createElement(type, className, textContent) {
        const element = document.createElement(type);

        if (className) {
            element.className = className;
        }

        if (textContent) {
            element.textContent = textContent;
        }

        return element;
    }

    return {
        getLocations,
        getTodayForecast,
        getUpcomingForecast,
        displayTodayForecast,
        displayUpcomingForecast,
        getSymbol,
        createElement,
    };
}

attachEvents();