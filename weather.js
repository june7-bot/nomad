const weather  = document.querySelector(".js-weather")
const APIKEY = '5d00f5b1c49d978513517c9d1621d369'
const COORDS = 'coords'
const body = document.querySelector("body")

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`)
    .then(function(response){
        return response.json()
    }).then(function(json){
        const tmp = json.main.temp
        const place = json.name
        const bg= json.weather[0].description

        paintImage(bg)


        // weather.innerText = `${icon}` 
        // weather.innerText = `${tmp} @ ${place}`
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS , JSON.stringify(coordsObj))
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {  latitude, longitude }

    saveCoords(coordsObj)
    getWeather(latitude, longitude)
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition( handleGeoSuccess , handleGeoError)   
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS)
    if(loadedCords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCords)
        getWeather(parseCoords.latitude , parseCoords.longitude )
    }
}

function paintImage(bg){
    const image = new Image();

    if(bg === 'shower rain' || bg === 'rain'){
        image.src = "https://images.unsplash.com/photo-1515080496064-bf1309a108f6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
    }else if(bg === 'snow'){
        image.src ="https://images.unsplash.com/photo-1477601263568-180e2c6d046e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }else if(bg === 'thunderstorm'){
        image.src ="https://images.unsplash.com/photo-1602088501827-7912e1b4a7bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80"
    }else if(bg ==='broken clouds' || bg==='mist') {
        image.src="https://images.unsplash.com/photo-1593648239473-cfac7805c069?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
    }else{
        image.src ="https://images.unsplash.com/photo-1566928120010-40686b83019e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80"
    }
    
    image.classList.add("bgImage")
    body.appendChild(image)
    }

function init(){
    loadCoords();
    paintImage()
}

init();