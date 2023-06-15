function showRegistrationForm() {
    var popup = document.getElementById("form-ct");
    popup.style.display = "block";
    popup.style.opacity = "1"; 
    var homepage = document.getElementById("homepage");
    homepage.style.overflow = "hidden"; 
    homepage.style.filter = "blur(5px)";
}
  
function hideRegistrationForm() {
    var popup = document.getElementById("form-ct");
    popup.style.display = "none";
    var homepage = document.getElementById("homepage");
    homepage.style.overflow = "auto"; 
    homepage.style.filter = "none"; 
}