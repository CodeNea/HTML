// Find the button in the HTML document
const button = document.getElementById("myButton");
 
// Add a click event listener
button.addEventListener("click", function() {
 
    // Display a message
    alert("Hello! JavaScript is working!");
 
});

// Uppdatera varje sekund; 1000 = millisekunder...
const timer = setInterval(updateCountdown, 1000);
 
// tid i minuter hur länge det ska räkna ner
const startingMinutes = 30;
 
// räknar om antal minuter i sekunder
let time = startingMinutes * 60;
 
// vad kallas elementet i HTML-filen, hämta det
const countdownEL = document.getElementById('countdown');
 
function updateCountdown() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
 
    // visa tiden i HTML-elementet
    countdownEL.textContent = `${minutes}:${seconds}`;
 
    // avsluta nedräkningen vid noll
    if (time <= 0) {
        clearInterval(timer);
        return;
    }
 
    time--;
}
