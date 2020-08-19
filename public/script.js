const searchEl = document.getElementById('index-input-city-search');
const searchBox = new google.maps.places.SearchBox(searchEl);

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];
    if (place == null) 
    return;
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    console.log(lat, lng)

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            latitude: lat,
            longitude: lng 
        })
    })
    .then(res => res.json())
    .then(data => {
        setWeatherData(data, place.formatted_address);
    })
    .catch(err => console.error(err, "THE FETCH FAILED"))
});

const dataAttributes = {
    condition:  'condition',
    location:   'location',
    pressure:   'pressure',
    temp_f:     'temperature',
    wind_dir:   'wind_dir',
    wind_mph:   'wind_mph'
}

const DOMOutputs = {
    pressure:           document.getElementById(dataAttributes.pressure),
    currentCondition:   document.getElementById(dataAttributes.condition),
    currentTemperature: document.getElementById(dataAttributes.temp_f),
    currentWind:        document.getElementById(dataAttributes.wind_mph),
    location:           document.getElementById(dataAttributes.location),
    wind_dir:           document.getElementById(dataAttributes.wind_dir)
}

setWeatherData = (data, name) => {
    DOMOutputs.currentWind.textContent          = 'Wind: ' + `${Math.round(data.wind_mph)} mph`,
    DOMOutputs.currentTemperature.textContent   = 'Temperature: ' + `${Math.round(data.temp_f)}°F`,
    DOMOutputs.currentCondition.textContent     = data.condition.text,
    DOMOutputs.wind_dir.textContent             = data.wind_dir,
    DOMOutputs.pressure.textContent             = 'Pressure: ' + data.pressure_in + 'in',
    DOMOutputs.location.textContent             = 'in ' + name
}
