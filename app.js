window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
        ".temp-description"
    );
    let temperatureDegree = document.querySelector(
        '.temp-degree'
    );
    let locationTimezone = document.querySelector(
        '.location-timezone'
    );

    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy='https://agile-gorge-15882-7ea074a34302.herokuapp.com/'
            const api=`${proxy}https://api.pirateweather.net/forecast/[apikeyfrompirateweather]/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                //Set dom elements from api 
                temperatureDegree.textContent = Math.round(temperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //set icon
                setIcons(icon, document.querySelector(".icon"))

                //change temperature to celcius/farenheit
                temperatureSection.addEventListener('click',() => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.round((temperature - 32) * 5/9);
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = Math.round(temperature)
                    }
                });
            });
        });
    }else{
        h1.textContent ='Please reload and enable geolocation'
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color:'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});