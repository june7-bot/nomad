const getForm = document.querySelector(".js-form"),
        getInput = getForm.querySelector("input"),
        greeting = document.querySelector(".js-greetings")

const USER_LS = "currentUser";
const SHOW = "showing"

function paintGritting(text){
    greeting.classList.add('showing')
    greeting.innerText = `Hello ${text}`
}

function handleSubmit(event){
   event.preventDefault();
   const InputName = getInput.value
   localStorage.setItem(USER_LS , InputName)
   window.location.reload()
}

function askForName(){
    getForm.classList.add(SHOW)
    getForm.addEventListener("submit" , handleSubmit)
}

function LoadUser(){
    const currentUser = localStorage.getItem(USER_LS)
    if(currentUser === null){
        askForName();
    }else{
    
    paintGritting(currentUser); 
    }
}


function init(){
    LoadUser()
}

init();