const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");
const repeatBtn = document.getElementById("repeatBtn");
const status = document.getElementById("audioStatus");

function setPlayingUI() {
  playBtn.textContent = "❚❚";
  status.textContent = "Playing...";
}

function setPausedUI(message = "Paused.") {
  playBtn.textContent = "▶";
  status.textContent = message;
}

function setReadyUI() {
  playBtn.disabled = false;
  stopBtn.disabled = false;
  repeatBtn.disabled = false;
  status.textContent = "Ready to play.";
}

function setUnavailableUI() {
  playBtn.disabled = false;
  stopBtn.disabled = true;
  repeatBtn.disabled = true;
  status.textContent = "Can't load audio/song.mp3.";
}

async function playMusic() {
  try {
    // Calling play() directly from the button click works even when
    // canplaythrough hasn't fired yet; the browser will wait for buffering.
    await music.play();
    setPlayingUI();
  } catch (error) {
    console.error("Audio playback error:", error);
    if (music.error) {
      status.textContent = "Can't play song.mp3 — check the MP3 file.";
    } else {
      status.textContent = "Playback was blocked — click Play again.";
    }
  }
}

// These events are more reliable than canplaythrough for local MP3 files.
music.addEventListener("loadedmetadata", setReadyUI);
music.addEventListener("canplay", setReadyUI);
music.addEventListener("error", setUnavailableUI);

playBtn.addEventListener("click", async () => {
  if (music.paused) {
    await playMusic();
  } else {
    music.pause();
    setPausedUI();
  }
});

stopBtn.addEventListener("click", () => {
  music.pause();
  music.currentTime = 0;
  setPausedUI("Stopped.");
});

repeatBtn.addEventListener("click", () => {
  music.loop = !music.loop;
  repeatBtn.classList.toggle("active", music.loop);
  status.textContent = music.loop ? "Repeat on." : "Repeat off.";
});

music.addEventListener("play", setPlayingUI);
music.addEventListener("pause", () => {
  if (!music.ended && music.currentTime > 0) setPausedUI();
});
music.addEventListener("ended", () => setPausedUI("Finished."));

// Try loading the local file immediately.
music.load();
