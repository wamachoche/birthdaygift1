// --- 1. Countdown Timer Logic ---
// UPDATED YEAR TO 2026: Targets midnight on August 13th of this year
const birthdayDate = new Date("2026-08-13T00:00:00").getTime();

const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display outputs
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // If countdown expires (August 13, 2026 hits)
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center;">
                <h3 style="color:#e05375; font-size:2.5rem; font-family:'Dancing Script', cursive; margin-bottom: 10px;">
                    🎉 Happy 18th Birthday, My Queen! 🎉
                </h3>
                <p style="font-size: 1.2rem; font-weight: 600; color: #dfb15b;">
                    Official Chapter 18 • Cheers to 18 Years of Absolute Perfection! ✨
                </p>
            </div>
         `;
    }

}, 1000);

// --- 2. Background Floating Hearts Generator ---
function createHeart() {
    const heartBg = document.getElementById('heartBg');
    if (!heartBg) return;

    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    
    // Randomize choice of emojis for visual texture
    const heartTypes = ['❤️', '💖', '💝', '💕', '🌸'];
    heart.innerText = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    
    // Random position and scaling variables
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 5 + 's'; // 5s to 8s range
    heart.style.fontSize = Math.random() * 15 + 15 + 'px'; // 15px to 30px range
    
    heartBg.appendChild(heart);

    // Remove element safely after animation finishes
    setTimeout(() => {
        heart.remove();
    }, 8000);
}
// Generate a floating entity every 400 milliseconds
setInterval(createHeart, 400);


// --- 3. Sequential Playlist Logic ---

const music = document.getElementById("bgMusic");
const selector = document.getElementById("musicSelector");
const toggleBtn = document.getElementById("musicToggleBtn");

// Event listener that fires exactly when the current song finishes
music.addEventListener('ended', function() {
    playNextSong();
});

function playNextSong() {
    // Get the current selected index in the dropdown
    let currentIndex = selector.selectedIndex;
    
    // Calculate next index; if it's the last song, it will loop back to the first
    let nextIndex = (currentIndex + 1) % selector.options.length;
    
    // Update dropdown selection visually
    selector.selectedIndex = nextIndex;
    
    // Change the source and play the next song
    music.src = selector.options[nextIndex].value;
    music.load();
    music.play().then(() => {
        if (toggleBtn) toggleBtn.innerText = "⏸️";
    }).catch(err => console.log("Sequential playback failed: ", err));
}

function toggleMusic() {
    if (music.paused) {
        music.play().then(() => {
            if (toggleBtn) toggleBtn.innerText = "⏸️";
        }).catch(err => console.log("Playback error: ", err));
    } else {
        music.pause();
        if (toggleBtn) toggleBtn.innerText = "▶️";
    }
}

function changeTrack() {
    music.src = selector.value;
    music.load();
    music.play().then(() => {
        if (toggleBtn) toggleBtn.innerText = "⏸️";
    }).catch(err => console.log("Track change error: ", err));
}

const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("totalDuration");

// Update progress bar as music plays
music.addEventListener('timeupdate', () => {
    if (music.duration) {
        // Calculate progress percentage
        const progressPercent = (music.currentTime / music.duration) * 100;
        progressBar.value = progressPercent;

        // Update time display
        currentTimeEl.innerText = formatTime(music.currentTime);
        durationEl.innerText = formatTime(music.duration);
    }
});

// Allow clicking on the bar to seek (skip) through the song
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * music.duration;
    music.currentTime = seekTime;
});

// Helper function to format seconds into MM:SS
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}



// --- 4. Interactive Surprise Modal Toggles ---
function revealSecret(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    
    // Automatically pause voice player if closing the audio modal box
    if(modalId === 'audio-modal') {
        const player = document.querySelector('.voice-note-player');
        if(player) player.pause();
    }
}

// Close modal instantly if clicking outside the card window area
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        const player = document.querySelector('.voice-note-player');
        if(player) player.pause();
    }
}

// --- 5. Password Security Lock ---
function checkPassword() {
    const userInput = document.getElementById("passwordInput").value;
    // CHANGE THIS: Put your desired password inside the quotes (keeps it lowercase)
    const correctPassword = "machakos"; 

    if (userInput.toLowerCase() === correctPassword) {
         const music = document.getElementById("bgMusic");
        const toggleBtn = document.getElementById("musicToggleBtn");
        
        if (music) {
            music.play().then(() => {
                if (toggleBtn) toggleBtn.innerText = "⏸️";
            }).catch(err => console.log("Audio failed to start: ", err));
        }
        // Fade out and remove the lock screen instantly if correct
        const lockScreen = document.getElementById("lockscreen");
        lockScreen.style.transition = "opacity 0.5s ease";
        lockScreen.style.opacity = "0";
        setTimeout(() => {
            lockScreen.remove();
        }, 5000);
    } else {
        // Show error message if incorrect
        document.getElementById("loginError").style.display = "block";
    }

}

// Allow pressing the 'Enter' key to unlock as well
document.getElementById("passwordInput")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
});

// --- 6. Virtual Candle Microphone Detection ---
let micActive = false;

// Request microphone access
function initMicrophone() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

                analyser.smoothingTimeConstant = 0.8;
                analyser.fftSize = 1024;

                microphone.connect(analyser);
                analyser.connect(scriptProcessor);
                scriptProcessor.connect(audioContext.destination);

                scriptProcessor.onaudioprocess = function() {
                    const array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    let values = 0;

                    for (let i = 0; i < array.length; i++) {
                        values += array[i];
                    }

                    const average = values / array.length;
                    
                    // "Blowing" detection threshold (adjust between 50-100 if needed)
                    if (average > 70) { 
                        extinguish();
                    }
                };
            })
            .catch(err => console.log("Microphone access denied or unavailable."));
    }
}


function extinguish() {
    const flame = document.getElementById('flame');
    const glow = document.getElementById('glow');
    const wishArea = document.getElementById('wish-area');
    const micBtn = document.getElementById('mic-btn');
    
    // Extinguish the visuals instantly
    if (flame) flame.style.display = 'none';
    if (glow) glow.style.display = 'none';
    if (micBtn) micBtn.style.display = 'none';

    // Fire the confetti particle canvas explosion engine
    if (typeof triggerConfetti === "function") {
        triggerConfetti(
            {
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#ff7597', '#e05375', '#dfb15b', '#ffffff'] // Romantic color mix
            }
        );
    } else {
        // Fallback default confetti if library is loading slowly
        console.log("Confetti burst triggered!");
    }
    
    // Bring the private wish letter onto her viewport screen surface area
    if (wish-area) {
        wishArea.style.display = 'block';
    }
}



function saveWish() {
    const wishText = document.getElementById('secret-wish').value;
    if(wishText.trim() !== "") {
        // You could send this to Formspree just like the other messages!
        alert("Your 18th wish has been locked and sent to the stars! ✨");
        document.getElementById('wish-area').innerHTML = "<h3 style='color: #e05375;'>Wish Locked. ❤️</h3>";
    } else {
        alert("Don't forget to actually type a wish!");
    }
}


function triggerConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Call initMicrophone when the page is unlocked or clicked
// (Browsers require a click before allowing microphone)
document.addEventListener('click', () => {
    if(!micActive) {
        initMicrophone();
        micActive = true;
    }
}, { once: true });
