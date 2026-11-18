function initializeCountdown() {
    const startingMinutes = 10;
    let time = startingMinutes * 60;
    let timer = null;

    const button = document.getElementById("myButton");
    const stopButton = document.getElementById("stopButton");
    const countdownEl = document.getElementById("countdown");

    if (!button || !stopButton || !countdownEl) {
        console.error("Timern kunde inte starta: en knapp eller nedräkningselementet saknas.");
        return;
    }

    function showTime() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        countdownEl.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
    }

    function updateCountdown() {
        if (time > 0) {
            time--;
            showTime();
        }

        if (time === 0) {
            clearInterval(timer);
            timer = null;
        }
    }

    showTime();

    button.addEventListener("click", function () {
        if (timer === null && time > 0) {
            timer = setInterval(updateCountdown, 1000);
            updateCountdown();
        }
    });

    stopButton.addEventListener("click", function () {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    });
}

initializeCountdown();
