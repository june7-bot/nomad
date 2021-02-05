function onClickLabel(e) { 

document.getElementById("labelYello").style.fontSize = 16;   
document.getElementById("labelRed").style.fontSize = 16;   
document.getElementById("labelGreen").style.fontSize = 16;   

document.getElementById(e.target.id).style.fontSize = 20;   
}
