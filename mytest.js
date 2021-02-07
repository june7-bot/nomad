function onClickLabel(event) { 

document.getElementById("labelYello").style.fontSize = 16
document.getElementById("labelRed").style.fontSize = 16 
document.getElementById("labelGreen").style.fontSize = 16  

document.getElementById(event.target.id).style.fontSize = 20
}

function init(){

}

init();
