function initializeCountdown() {
    const startingMinutes = 15;
    let time = startingMinutes * 60;
    let timer = null;
    let audioContext = null;

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

    function playAlarm() {
        if (!audioContext || audioContext.state !== "running") {
            console.error("Alarmet kunde inte spelas upp eftersom ljudet inte är tillgängligt.");
            return;
        }

        const oscillator = audioContext.createOscillator();
        const volume = audioContext.createGain();
        const now = audioContext.currentTime;

        oscillator.frequency.setValueAtTime(880, now);
        volume.gain.setValueAtTime(0.0001, now);
        volume.gain.exponentialRampToValueAtTime(0.25, now + 0.03);
        volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
        oscillator.connect(volume);
        volume.connect(audioContext.destination);
        oscillator.start(now);
        oscillator.stop(now + 0.8);
    }

    function updateCountdown() {
        if (time > 0) {
            time--;
            showTime();
        }

        if (time === 0) {
            clearInterval(timer);
            timer = null;
            playAlarm();
        }
    }

    showTime();

    button.addEventListener("click", function () {
        if (timer === null && time > 0) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass && !audioContext) {
                audioContext = new AudioContextClass();
            }
            if (audioContext?.state === "suspended") {
                audioContext.resume().catch(function (error) {
                    console.error("Kunde inte aktivera ljudet:", error);
                });
            }

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
