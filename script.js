var i = 0;
var welcome_txt = "Hi, my name is Quillan. Welcome to My Portfolio." 
var speed = 50; 

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typewrite").innerHTML += welcome_txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
  window.onload = typeWriter;
}