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
