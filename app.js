window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.weatherapi.com/v1/current.json?key=784fea702ea64b51bb5123205230507&q=${lat},${long}&aqi=no;`
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temp_f,temp_c } = data.current;
                    const { text, icon } = data.current.condition;

                    //Set DOM Elements from the api
                    temperatureDegree.textContent = temp_f;
                    temperatureDescription.textContent = text;
                    locationTimezone.textContent = data.location.country;

                    //Set Icon
                    const weatherIconUrl = `https:${icon}`;
                    const weatherIconElement = document.createElement('img');
                    weatherIconElement.src = weatherIconUrl;
                    document.getElementById('weather-icon-container').appendChild(weatherIconElement);

                    //Change temperature to Celsius/Farenhit
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = temp_c;

                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temp_f;

                        }
                    })
                });
        });
    }
}); 