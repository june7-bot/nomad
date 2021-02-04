const title = document.querySelector("#title")
function clickEvent(){
    title.classList.toggle("clicked")
}

title.addEventListener("click" , clickEvent)