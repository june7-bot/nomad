const clockTitle = document.querySelector(".js-clock");

function getTime(){
   const date = new Date(),
    hours = date.getHours(), 
    minute = date.getMinutes()
    seconds = date.getSeconds()
    clockTitle.innerHTML = `${ hours > 9 ? hours : `0${hours}` } : 
                            ${minute > 9 ? minute : `0${minute}`}`  
}


//    :  ${seconds > 9 ? seconds : `0${seconds}`}`}

function init() {
    getTime()
    setInterval(getTime, 1000)
}

init();