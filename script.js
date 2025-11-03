window.addEventListener("popstate", function(event) {
  event.preventDefault();
  alert("Use site back button. but site ka back button only works at gifts section. hehehe");
});

let candlleslit = true;

const dialogContent = document.getElementById("dialogContent");
const hawwDialog = document.getElementById("hawwDialog");
let step = 0;

const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => {
  // get all scenes

  const iconScene = document.getElementById("iconScene");
  const letterScene = document.getElementById("letterScene");
  const musicOverlay = document.getElementById("musicOverlay");
  const photosScene = document.getElementById("polaroidScene");


  const allScenes = [
    iconScene,
    letterScene,
    musicOverlay,
    photosScene,
  ];

  // 🔍 Step 1: find which scene is currently visible
  const currentScene = allScenes.find(scene => scene && !scene.classList.contains("hidden"));
  if (!currentScene) {
    console.log("No visible scene found.");
    return;
  }

  // 🔄 Step 2: hide all scenes
   if (currentScene === letterScene || currentScene === musicOverlay || currentScene === photosScene){
  allScenes.forEach(scene => {
    if (scene) scene.classList.add("hidden");
  });}

  // 🔙 Step 3: decide where to go manually
  if (currentScene === letterScene || currentScene === musicOverlay || currentScene === photosScene) {
    iconScene.classList.remove("hidden");
  } else {
    console.log("No previous scene defined for current scene");
  }
});



// 🌟 Music toggle button
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');

  let isMusicOn = false;
  bgMusic.volume = 0.02;
  // Start playing automatically when page loads
  window.addEventListener('load', () => {

    bgMusic.play().catch(() => {
      // Some browsers block autoplay — only play after user interaction
      console.log("Autoplay blocked. Will start after first toggle.");
    });
  });

  musicToggle.addEventListener('click', () => {
    isMusicOn = !isMusicOn;

    if (isMusicOn) {
      bgMusic.play();
      musicToggle.src = 'assests/music_on.png';
    } else {
      bgMusic.pause();
      musicToggle.src = 'assests/music_off.png';
    }
  });


// Array of instructions
const instructions = [
    {
  html: `
      <p>Click on this -><button class="bgm-btn" id="bgmBtn"></button> and turn up the vol.<br>
      Hehe twankss. You can turn off bgm anytime from top right.</p>
      <button id="okkaBtn">Okka</button>
    `
  },
  {
    html: `
      <p>On some popups you'll see a play button <span class="play-btn"></span> like this.<br>
      If you click on it you'll hear it in my voice.</p>
      <button id="okkaBtn">Okka?</button>
      <button id="noBtn">No, Don't wan</button>
    `
  },

  {
    html: `
      <p>After this, it will ask you for mic permission, so click on allow button.</p>
      <button id="okkaBtn">Okka!</button>
      <button id="noBtn">I don't trust you!</button>
    `
  },
  {
    html: `
      <p>Also, after you allow mic, no loud noises yaa? <br>Just blow phuuuu on yo mic when we get on the main screen.</p>
      <button id="okkaBtn">Okka!</button>
    `,
    final: true
  }
];


function showStep() {
  const instruction = instructions[step];

  // Fade out
  dialogContent.classList.remove("fade-in");
  dialogContent.classList.add("fade-out");

  setTimeout(() => {
    dialogContent.innerHTML = instruction.html;

    // Force reflow
    void dialogContent.offsetWidth;

    dialogContent.classList.remove("fade-out");
    dialogContent.classList.add("fade-in");

    // Add button listeners
    const okkaBtn = document.getElementById("okkaBtn");
    if (okkaBtn) {
      okkaBtn.addEventListener("click", () => nextStep(true));
    }
    if (step === 0) {
      const bgmbtn = document.getElementById("bgmBtn");
      bgmbtn.addEventListener("click", () => {
      bgMusic.play();
      isMusicOn=false;
      });
    }
    const noBtn = document.getElementById("noBtn");
    if (noBtn) {
      // Show “Haww” only for steps 0 and 1
      if (step === 1 || step === 2) {
        noBtn.addEventListener("click", () => showHawwDialog());
      } else {
        noBtn.addEventListener("click", () => nextStep(false));
      }
    }
  }, 300);
}

function nextStep(okClicked) {
  if (instructions[step].final) {
    document.getElementById("entry-popup").classList.add("hidden");
    window.micAllowedByUser = true;
    startMicDetection();
    return;
  }

  step++;
  showStep();
}

// Initial click on first button
document.getElementById("popup-next").addEventListener("click", () => {
  showStep();
});

function showHawwDialog() {
  const hawwDialog = document.getElementById("hawwDialog");
  const frame = document.getElementById("hawwFrame");
  const frames = [
    "assests/h4.png",
    "assests/h3.png",
    "assests/h2.png",
    "assests/h1.png",
    "assests/h0.png"
  ];

  let i = 0;
  frame.src = frames[i];

  hawwDialog.showModal();

  // Sequentially show frames once
  function nextFrame() {
    i++;
    if (i < frames.length) {
      frame.src = frames[i];
      setTimeout(nextFrame, 500); // change frame every 300ms
    }
  }

  setTimeout(nextFrame, 600);
  // Play button functionality
  const playBtn = hawwDialog.querySelector(".play-btn");
  const audio = new Audio("audios/marungi.m4a");
  let playing = false;

  playBtn.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playing = true;

      // Add pulse animation
      playBtn.classList.add("playing");
    } else {
      audio.pause();
      audio.currentTime = 0;
      playing = false;
      playBtn.classList.remove("playing");
    }

    audio.onended = () => {
      playing = false;
      playBtn.classList.remove("playing");
    };
  });
  // Ok button to close dialog
  const okBtn = document.getElementById("hawwOkBtn");
  okBtn.onclick = () => {
    hawwDialog.close();
    showStep(); // go back to the previous instruction dialog
  };
}



let balloonInterval;
const balloonContainer = document.getElementById("balloonContainer");
const balloonImages = [
  "assests/baloon1.png",
  "assests/baloon2.png",
  "assests/baloon3.png",
  "assests/baloon4.png"
];

function startBalloons() {
  if (balloonInterval) return; // already running

  balloonInterval = setInterval(() => {
    const balloon = document.createElement("img");
    balloon.src = balloonImages[Math.floor(Math.random() * balloonImages.length)];
    balloon.className = "balloon";

    // Random start position and small size variance
    const startX = Math.random() * (window.innerWidth * 0.9);
    const size = 30 + Math.random() * 15; // 30–55px
    balloon.style.left = `${startX}px`;
    balloon.style.width = `${size}px`;

    // Random float duration (slower)
    const duration = 9000 + Math.random() * 5000; // 9–14s
    balloon.style.animation = `floatUp ${duration}ms linear forwards`;

    balloonContainer.appendChild(balloon);

      // Random pop timing (mid-air)
  if (Math.random() > 0.5) {
    const popTime = Math.random() * (duration * 0.8);
    setTimeout(() => {
      const rect = balloon.getBoundingClientRect();

      // Freeze current position so it doesn’t teleport upward
      balloon.style.animation = "none";
      balloon.style.position = "fixed";
      balloon.style.left = `${rect.left}px`;
      balloon.style.top = `${rect.top}px`;

      // Now apply pop animation cleanly
      balloon.style.animation = "pop 400ms ease-out forwards";

      setTimeout(() => balloon.remove(), 400);
    }, popTime);
  } else {
    // No pop — just float away
    setTimeout(() => balloon.remove(), duration);
  }

  }, 1300); // new balloon every ~1.3 seconds
}

function stopBalloons() {
  clearInterval(balloonInterval);
  balloonInterval = null;
  balloonContainer.innerHTML = "";
}



const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "BROOOO";
let candleCount = 3; // force 3 candles


const colors = ["green-candle","purple-candle","blue-candle","yellow-candle"];

function createCandles() {
  startBalloons();
  // Do NOT auto-start mic here. Mic permission should only be requested
  // when the user explicitly retries. Keep the flag reset so we don't
  // accidentally re-trigger elsewhere.
  const cakeImg = document.querySelector('.cake-img');
  const overlay = document.getElementById('cake');
  overlay.innerHTML = '';

  const numCandles = 3;
  const spacingFrac = 0.14;
  const centerFrac = 0.4;
const fracs = [0.25, 0.40, 0.55]; // horizontal positions of 3 candles
const yFrac = -0.06; // move candles a bit higher on cake


  const cakeWidth = cakeImg.clientWidth;
  const cakeHeight = cakeImg.clientHeight;

  for (let i = 0; i < numCandles; i++) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('candle-wrapper');
    wrapper.style.position = 'absolute';
    wrapper.style.left = `${fracs[i] * cakeWidth}px`;
    wrapper.style.top = `${yFrac * cakeHeight}px`;
    wrapper.style.transform = 'translateX(-50%)';

    const candle = document.createElement('div');
    candle.classList.add(colors[i % colors.length]);
    wrapper.appendChild(candle);

    overlay.appendChild(wrapper);
  }
  candlleslit = true;
}

// Initialize candles
const cakeImg = document.querySelector('.cake-img');
if (cakeImg.complete && cakeImg.naturalWidth !== 0) {
  createCandles();
} else {
  cakeImg.addEventListener('load', () => createCandles());
}

// Resize handler
window.addEventListener('resize', () => createCandles());

// --- Microphone / Blow Detection ---
let audioContext, analyser, source, micStream;
let isDetecting = false;

// --- Microphone / Blow Detection ---
async function startMicDetection() {
  
  if (!window.micAllowedByUser) {
    console.log('startMicDetection: skipped because user did not explicitly allow mic yet');
    return;
  }
  if (isDetecting) return;
  isDetecting = true;

  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    source = audioContext.createMediaStreamSource(micStream);
    source.connect(analyser);

    analyser.fftSize = 256; // smaller for quicker response
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    let lastTrigger = 0;
    const subTitle = document.getElementById("subTitle");
    function detectBlow() {
      if (!isDetecting) return;
      analyser.getByteFrequencyData(dataArray);

      // --- Repo logic: average frequency energy ---
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;

      const now = performance.now();
      // --- tuned threshold (experiment between 35–45) ---

      if (average > 85 && now - lastTrigger > 1000) {
        console.log("Blow detected, avg:", average);
        if (candlleslit) {
          subTitle.textContent = 'Yayyyyyyy!!!'
          blowOutCandles();
          stopMicDetection();
          lastTrigger = now;
          

        }
      }else if(average > 65 && average<85 && now - lastTrigger > 1000){
        console.log("Blow detected, avg:", average);
        subTitle.textContent = 'tch tch bunty hawa ni h pet me? \n zor se'
      }

      requestAnimationFrame(detectBlow);
    }

    detectBlow();
  } catch (err) {
    console.error("Mic access error:", err);
  }
}

function blowOutCandles() { 
  candlleslit = false;
  const wrappers = document.querySelectorAll(".candle-wrapper div"); 
  const delays = []; 
  wrappers.forEach((candle) => { 
    const delay = Math.random() * 1000; 
    delays.push(delay); 
    setTimeout(() => candle.classList.add("blown"), delay); 
    launchPixelConfetti();
  }); 
  const maxDelay = Math.max(...delays); 
  setTimeout(() => { showBirthdayDialog(); 
    if (typeof birthdayDialog.showModal === "function") { 
      birthdayDialog.showModal(); 
       } }, 
      maxDelay + 1500); 
    }
function stopMicDetection() {
  
  isDetecting = false;
  if (micStream) {
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}

const birthdayDialog = document.getElementById("birthdayDialog");
const nawDialog = document.getElementById("nawDialog");
const celebrationDialog = document.getElementById("celebrationDialog");

function showBirthdayDialog() {
  birthdayDialog.showModal();

  const yesBtn = birthdayDialog.querySelector("#yesBtn");
  const noBtn = birthdayDialog.querySelector("#noBtn");

  yesBtn.onclick = () => {
    birthdayDialog.close();
    showCelebrationDialog();
  };

  noBtn.onclick = () => {
    birthdayDialog.close();
    showNawDialog();
  };
}

let animationId;
let canvas, ctx;

function launchPixelConfetti() {

  if (animationId){
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } 

  canvas = document.getElementById("confettiCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#ffadad","#ffd6a5","#fdffb6","#caffbf","#9bf6ff","#a0c4ff","#bdb2ff"];
  const confettiCount = 120;
  const confetti = [];
  // store animation frame id

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 3 + 2,
      dx: Math.random() * 2 - 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.size, c.size);
      c.y += c.speed;
      c.x += c.dx;
      if (c.y > canvas.height) {
        c.y = -c.size;
        c.x = Math.random() * canvas.width;
      }
    });
    animationId = requestAnimationFrame(draw);
  }

  draw();
}

function showNawDialog() {
  nawDialog.showModal();

  const playBtn = nawDialog.querySelector(".play-btn");
  const retryBtn = nawDialog.querySelector("#retryBtn");
  const audio = new Audio("audios/blowcandle.m4a");
  let isPlaying = false;

  playBtn.onclick = () => {
    playBtn.classList.remove("playing");
    void playBtn.offsetWidth;
    playBtn.classList.add("playing");

    if (!isPlaying) {
      audio.play();
      isPlaying = true;
    } else {
      audio.pause();
      audio.currentTime = 0;
      isPlaying = false;
    }
  };

  audio.onended = () => {
    isPlaying = false;
    playBtn.classList.remove("playing");
  };

  retryBtn.onclick = () => {
    nawDialog.close();
    retry();
  };
}    
function retry() {
    setTimeout(() => {
    createCandles(); 
  // start mic detection only after user explicitly retried
  window.micAllowedByUser = true;
    try { startMicDetection(); } catch (e) { console.warn('startMicDetection error', e); }
  }, 300); 
}
function showCelebrationDialog() {
  const dialog = document.getElementById("celebrationDialog");
  const song = dialog.querySelector("#birthdaySong");
  const playBtn = dialog.querySelector("#musicBtn");
  const eatCakeBtn = dialog.querySelector("#eatCakeBtn");
  const tune = new Audio("audios/tune.mp3");
  // Safeguard
  if (!dialog || !song || !tune || !playBtn || !eatCakeBtn) return;
  tune.volume = 0.04;
  song.volume = 1;
  dialog.showModal();
  song.play();
  tune.play();
  let isPlaying = true;

  // Toggle music
  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      song.pause();
      tune.pause();
    } else {
      song.play();
      tune.play();
    }
    isPlaying = !isPlaying;
  });

  // Handle "Let's Eat Cake" click
  // 🎂 When "Eat Cake" is clicked in the celebration dialog
eatCakeBtn.addEventListener("click", () => {
  stopBalloons();
  tune.pause();
  song.pause();
  dialog.close();
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  document.getElementById("celebrationDialog").classList.add("hidden");
  pageContent.classList.add("hidden");
  pageContent2.classList.remove("hidden");

  triggerCakePopIn(); // animate cake slice appearing
});
}


// 🍰 Animate the cake slice zoom-in
function triggerCakePopIn() {
  const cakeslice = document.getElementById("cake_Slice");
  if (!cakeslice) return;

  cakeslice.classList.remove("pop-in"); // reset animation
  cakeslice.style.opacity = "0"; // make sure it’s hidden first
  void cakeslice.offsetWidth; // force reflow
  cakeslice.classList.add("pop-in"); // re-trigger animation
  cakeslice.style.opacity = "1"; // ensure it becomes visible
}

// 🐱 When "Yum Yummm" (eatBtn) is clicked
const eatBtn = document.getElementById("eatBtn");
eatBtn.addEventListener("click", () => {
  showCatScene();
});

const page2 = document.getElementById("pageContent2");
const cakeslice = document.getElementById("cake_Slice");

// 🐈 Show cat scene and animate eating
function showCatScene() {
  const pageContent2 = document.getElementById("pageContent2");
  const catScene = document.getElementById("catScene");
  const yumBtn = document.getElementById("yumBtn");
  const giftBtn = document.getElementById("giftBtn");
  const catFrame = document.getElementById("catFrame");
  const cakeleft = document.getElementById("cakeleft");

  // hide cake scene, show cat scene
  pageContent2.classList.add("hidden");
  catScene.classList.remove("hidden");

  yumBtn.addEventListener("click", () => {
  cakeleft.style.animation = "moveCake 2.5s ease forwards";
  const munch = new Audio("audios/yumyum.m4a");
  munch.play();
  yumBtn.classList.add("hidden");
  setTimeout(() => {
    catFrame.src = "assests/cat-close.png";
    setTimeout(() => {
      catFrame.src = "assests/cat-ht.png";
    }, 700);
  }, 1000);

  setTimeout(() => {
    
    // Instead of showing giftBtn, go to flower scene
    showFlowerScene();
  }, 3000);
});
}


function showFlowerScene() {
  const catScene = document.getElementById("catScene");
  const flowerScene = document.getElementById("flowerScene");
  const takeFlowerBtn = document.getElementById("takeFlowerBtn");

  catScene.classList.add("hidden");
  flowerScene.classList.remove("hidden");
  const playBtn = document.getElementById("flowerBtn");
  const audio = new Audio("audios/prettyflower.m4a");
  let playing = false;

  playBtn.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playing = true;

      // Add pulse animation
      playBtn.classList.add("playing");
    } else {
      audio.pause();
      audio.currentTime = 0;
      playing = false;
      playBtn.classList.remove("playing");
    }

    audio.onended = () => {
      playing = false;
      playBtn.classList.remove("playing");
    };
  });
  takeFlowerBtn.addEventListener("click", () => {
    flowerScene.classList.add("hidden");
    audio.pause();
    showMuscleScene();
  });
}

function showMuscleScene() {
  const muscleScene = document.getElementById("muscleScene");
  const muscleImg = document.getElementById("muscleImg");
  const putFlowerBtn = document.getElementById("putFlowerBtn");
  const muscleCaption = document.getElementById("muscleCaption");
  const giftBtn = document.getElementById("giftBtn");
  const prettyBtn = document.getElementById("prettyBtn");
  muscleScene.classList.remove("hidden");
  const playBtn = document.getElementById("prettyBtn");
  const audio = new Audio("audios/pumpcess.m4a");
  let playing = false;

  playBtn.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playing = true;

      // Add pulse animation
      playBtn.classList.add("playing");
    } else {
      audio.pause();
      audio.currentTime = 0;
      playing = false;
      playBtn.classList.remove("playing");
    }

    audio.onended = () => {
      playing = false;
      playBtn.classList.remove("playing");
    };
  });
  putFlowerBtn.addEventListener("click", () => {
    muscleImg.classList.add("sparkle");

      setTimeout(() => {
      muscleImg.src = "assests/pumpcess_after.png";
      muscleCaption.textContent = "Awww... you look so pretty 💖";
      prettyBtn.classList.remove("hidden");
      muscleImg.classList.remove("sparkle");
      putFlowerBtn.classList.add("hidden");
      giftBtn.classList.remove("hidden");

      }, 800);

  });
}




 const giftBtn = document.getElementById("giftBtn");
const giftDialog = document.getElementById("giftDialog");
const mysteryBtn = document.getElementById("mysteryBtn");
// 1️⃣ Show dialog
giftBtn.addEventListener("click", () => {
  giftDialog.showModal();
});

// 2️⃣ Start countdown
mysteryBtn.addEventListener("click", () => {
  giftDialog.close();
  startCountdown();
});

document.getElementById("takeFlowerBtn").onclick = () => {
  fadeOut("#scene-flower");
  fadeIn("#scene-muscle");
};

document.getElementById("yesBtn").onclick = () => {
  const muscle = document.getElementById("muscleImg");
  muscle.classList.add("add-flower");
  setTimeout(() => {
    muscle.src = "muscle-blush.png";
    // sparkle animation trigger
  }, 600);
};




const countdownOverlay = document.getElementById("countdownOverlay");
const countdownImage = document.getElementById("countdownImage");
const kissGame = document.getElementById("kissGame");
const kissCountDisplay = document.getElementById("kissCount");
const endGameBtn = document.getElementById("endGameBtn");
const cupGame = document.getElementById("cupGame");


function startCountdown() {

  document.getElementById("muscleScene").classList.add("hidden");
  const numbers = [
    "assests/2.png",
    "assests/1.png"
  ];
  let i = 0;
  countdownOverlay.classList.remove("hidden");

  const timer = setInterval(() => {

    if (i < numbers.length) {
      countdownImage.src = numbers[i];
      i++;
    } else {
      clearInterval(timer);
      countdownOverlay.classList.add("hidden");
      startKissGame();
    }
  }, 800);
}

const kissArea = document.getElementById("kissArea");
let timerInterval, kissInterval;
let timeLeft = 45;
let kissCount = 0;
let kissSoundIndex = 0;
const totalKissSounds = 11; // kiss0–kiss10

// Preload sounds
const kissSounds = [];
for (let i = 0; i < totalKissSounds; i++) {
  kissSounds.push(new Audio(`audios/kiss${i}.m4a`));
}
const bombSound = new Audio("audios/bomb.m4a");

function startKissGame() {
  kissGame.classList.remove("hidden");
  kissCount = 0;
  timeLeft = 45;
  kissSoundIndex = 0;
  kissCountDisplay.textContent = `Kisses: ${kissCount}`;
  document.getElementById("timerDisplay").textContent = `Time: ${timeLeft}s`;

  spawnKisses();

  // Countdown timer
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timerDisplay").textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) endKissGame();
  }, 1000);
}

function spawnKisses() {
  kissInterval = setInterval(() => {
    // Decide randomly whether to spawn a kiss or bomb
    const isBomb = Math.random() < 0.3; // ~15% chance bomb appears
    const img = document.createElement("img");
    img.className = "kiss";

    if (isBomb) {
      img.src = "assests/bomb.png";
    } else {
      img.src = "assests/kiss.png";
    }

    const x = Math.random() * (kissArea.clientWidth - 50);
    const y = Math.random() * (kissArea.clientHeight - 50);
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    kissArea.appendChild(img);

    img.addEventListener("click", () => {
      img.classList.add("pop");

      if (isBomb) {
        bombSound.currentTime = 0;
        bombSound.play();
      } else {
        playNextKissSound();
        kissCount++;
        kissCountDisplay.textContent = `Kisses: ${kissCount}`;
      }

      setTimeout(() => img.remove(), 200);
    });

    setTimeout(() => img.remove(), 600);
  }, 1500);
}

// 🔊 Play sequential kiss sounds (0 once, then loop 1–10)
function playNextKissSound() {
  const sound = kissSounds[kissSoundIndex];
  sound.currentTime = 0;
  sound.play();

  kissSoundIndex++;
  if (kissSoundIndex >= totalKissSounds) {
    kissSoundIndex = 1; // skip 0 after first round
  }
}

function endKissGame(bombClicked = false) {
  clearInterval(kissInterval);
  clearInterval(timerInterval);

  const dialog = document.getElementById("kissResultDialog");
  const resultText = document.getElementById("kissResultText");
  const closeBtn = document.getElementById("closeKissDialog");

  let message;
  if (kissCount < 5) {
    message = "Tch tch Bunty yawrr ";
  } else {
    message = "Woah! Purrfect catches";
  }

  resultText.textContent = `Time's up! You collected ${kissCount} kisses.\n${message}`;
  dialog.showModal();

  closeBtn.addEventListener("click", () => {
    resultText.classList.add("fade-out");
    resultText.classList.add("fade-in");
    resultText.textContent = "Yayy! You completed yo first challenge and unlocked yo first gift.\nYou will get all yo gifts at the end.\nKeep going!";
    closeBtn.addEventListener("click", () => {
      dialog.close();
      kissGame.classList.add("hidden");
      card_game();
    });
  });
}

endGameBtn.addEventListener("click", endKissGame);

const superheroGame = document.getElementById("superheroGame");


function card_game() {
  superheroGame.classList.remove("hidden");
  const superheroes = [
    "ironman.png",
    "captain.png",
    "thor.png",
    "hulk.png",
    "spiderman.png",
    "batman.png"
  ];

  const playBtn = document.getElementById("heroaudioBtn");
  const audio = new Audio("audios/flipcard.m4a");
  let playing = false;

  playBtn.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playing = true;

      // Add pulse animation
      playBtn.classList.add("playing");
    } else {
      audio.pause();
      audio.currentTime = 0;
      playing = false;
      playBtn.classList.remove("playing");
    }

    audio.onended = () => {
      playing = false;
      playBtn.classList.remove("playing");
    };
  });
  const grid = document.querySelector(".card-grid");

  let firstCard, secondCard;
  let lock = false;
  let matchedPairs = 0;
  createCards();

function createCards() {
  // clear previous cards (if any)
  grid.innerHTML = '';

  const deck = [...superheroes, ...superheroes]
    .sort(() => Math.random() - 0.5);

  deck.forEach(hero => {
    const card = createCard(hero);
    grid.appendChild(card);
  });
}

function createCard(hero) {
  const card = document.createElement("div");
  card.className = "card";

  const front = document.createElement("div");
  front.className = "card-face card-front";
  front.textContent = "?";

  const back = document.createElement("div");
  back.className = "card-face card-back";
  back.style.backgroundImage = `url('assests/${hero}')`; // ✅ your real folder name
  back.style.backgroundSize = "contain";
  back.style.backgroundRepeat = "no-repeat";
  back.style.backgroundPosition = "center";

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", () => flipCard(card, hero));
  return card;
}

function flipCard(card, hero) {
  if (lock || card === firstCard) return;
  card.classList.add("flip");

  if (!firstCard) {
    firstCard = { card, hero };
  } else {
    secondCard = { card, hero };
    checkMatch();
  }
}

function checkMatch() {
  lock = true;
  if (firstCard.hero === secondCard.hero && firstCard.card !== secondCard.card) {
    matchedPairs++;
  firstCard.card.removeEventListener("click", flipCard);
  firstCard.card.style.animation = "pinkGlow 1.5s ease";
  firstCard.card.style.pointerEvents = "none";
    secondCard.card.removeEventListener("click", flipCard);
  secondCard.card.style.animation = "pinkGlow 1.5s ease";
  secondCard.card.style.pointerEvents = "none";
  // Safely set the front face text — don't assume a `front` property exists on the DOM node
  const firstFront = firstCard.card.querySelector('.card-front');
  if (firstFront) firstFront.textContent = "Yay!";
  const secondFront = secondCard.card.querySelector('.card-front');
  if (secondFront) secondFront.textContent = "Yay!";
    resetTurn();
    if (matchedPairs === superheroes.length) {
      setTimeout(showWinDialog, 800);
    }
  } else {
    setTimeout(() => {
      firstCard.card.classList.remove("flip");
      secondCard.card.classList.remove("flip");
      resetTurn();
    }, 700);
  }
}

function resetTurn() {
  [firstCard, secondCard, lock] = [null, null, false];
}
const herodialog = document.getElementById("heroResultDialog");
  const spidermanscene = document.getElementById("spidermanScene");
function showWinDialog() {
  herodialog.showModal();
  document.getElementById("closeHeroDialog").addEventListener("click", () => {
    herodialog.close();
    superheroGame.classList.add("hidden");
    spidermanscene.classList.remove("hidden");
  });
}
const laterbtn = document.getElementById("laterBtn");
laterbtn.addEventListener("click", () => {
  spidermanscene.classList.add("hidden");
  cupgame();
});
}


function cupgame() {
  const playBtn = document.getElementById("pokeaudioBtn");
  const audio = new Audio("audios/pokemon.m4a");
  let playing = false;

  playBtn.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playing = true;

      // Add pulse animation
      playBtn.classList.add("playing");
    } else {
      audio.pause();
      audio.currentTime = 0;
      playing = false;
      playBtn.classList.remove("playing");
    }

    audio.onended = () => {
      playing = false;
      playBtn.classList.remove("playing");
    };
  });
  cupGame.classList.remove("hidden");
  const startBtn = document.getElementById('startShuffleBtn');
  const easyBtn = document.getElementById('easyBtn');
  const hardBtn = document.getElementById('hardBtn');
  const statusMsg = document.getElementById('cupStatusMsg');
  const cups = [  
    document.getElementById('cupA'),
    document.getElementById('cupB'),
    document.getElementById('cupC'),
    document.getElementById('cupD')
  ];

  const basePositions = [
    { left: '0%', top: '10%' },
    { left: '50%', top: '10%' },
    { left: '25%', top: '50%' },
    { left: '75%', top: '50%' }
  ];

  const treatImages = [
    'assests/treat1.png',
    'assests/treat2.png',
    'assests/treat3.png',
    'assests/treat4.png'
  ];

  let canClick = false, isShuffling = false, difficulty = 'easy';

  easyBtn.disabled = true;
  easyBtn.addEventListener('click', () => {
    difficulty = 'easy';
    easyBtn.disabled = true;
    hardBtn.disabled = false;
  });
  hardBtn.addEventListener('click', () => {
    difficulty = 'hard';
    hardBtn.disabled = true;
    easyBtn.disabled = false;
  });

  function resetState() {
    canClick = false;
    isShuffling = false;
    statusMsg.textContent = 'Try again!';
    cups.forEach((cup) => {
      cup.dataset.hasTreat = 'false';
      const t = cup.querySelector('.treat');
      if (t) t.remove();
      cup.classList.remove('reveal');
    });
    setPositions();
  }

  function setPositions() {
    cups.forEach((cup, i) => {
      cup.style.left = basePositions[i].left;
      cup.style.top = basePositions[i].top;
    });
  }

  setPositions();

  startBtn.addEventListener('click', async () => {
    if (isShuffling) return;
    resetState();
    startBtn.disabled = true;
    await revealTreats();
    await startShuffle();
  });

  cups.forEach((cup) => cup.addEventListener('click', () => onCupClick(cup)));

  function assignTreats() {
    cups.forEach((cup, idx) => {
      const t = document.createElement('img');
      t.src = treatImages[idx];
      t.className = 'treat';
      cup.appendChild(t);
      if (idx === 0) cup.dataset.hasTreat = 'true'; // target treat
    });
  }

  async function revealTreats() {
  assignTreats();
  statusMsg.textContent = 'Watch carefully...';

  for (const cup of cups) {
    const img = cup.querySelector('.cup-img');
    const treat = cup.querySelector('.treat');

    // Step 1: Wiggle
    img.style.animation = 'cupWiggle 0.7s ease-in-out';

    // Step 2: Change image + zoom
    setTimeout(() => {
      img.src = "assests/cup-open.png";
      img.style.animation = 'cupOpenZoom 0.5s ease forwards';
    }, 700);

    // Step 3: Reveal treat softly
    setTimeout(() => {
      treat.style.opacity = '1';
      treat.style.transform = 'translateY(0) scale(1)';
    }, 800);
  }

  // Wait before closing again
   await new Promise(r => setTimeout(r, 3000));

  // Reset cups
  cups.forEach(c => {
    const img = c.querySelector('.cup-img');
    const treat = c.querySelector('.treat');
    img.src = "assests/cup.png";
    img.style.animation = ''; // reset animation
    img.style.transform = 'scale(1)';
    img.style.filter = 'brightness(1)';
    treat.style.opacity = '0';
    treat.style.transform = 'translateY(10px) scale(0.95)';

  });
  await new Promise(r => setTimeout(r, 700));
}
const treatPopups = {
  "treat1.png": {
    image: "assests/blue.png",
    buttonText: "Amen!",
    action: () => resetState()
  },
  "treat2.png": {
    image: "assests/orange.png",
    buttonText: "Woahh!",
    action: () => resetState()
  },
  "treat3.png": {
    image: "assests/green.png",
    buttonText: "Awwww!",
    action: () => resetState()
  },
  "treat4.png": {
    image: "assests/purple.png",
    buttonText: "Open!",
    action: () => {
      goToNextStep(); 
      audio.pause()
    }
  }
};

function onCupClick(cup) {
  if (!canClick) return;
  canClick = false;

  const img = cup.querySelector('.cup-img');
  const treat = cup.querySelector('.treat');

  const treatSrc = treat.src.split('/').pop(); // e.g. "treat2.png"

  // Step 1: Wiggle
  img.style.animation = 'cupWiggle 0.7s ease-in-out';

  // Step 2: Open + zoom
  setTimeout(() => {
    img.src = "assests/cup-open.png";
    img.style.animation = 'cupOpenZoom 0.5s ease forwards';
  }, 700);

  // Step 3: Reveal treat
  setTimeout(() => {
    treat.style.opacity = '1';
    treat.style.transform = 'translateY(0) scale(1)';
  }, 800);

  // Step 4: Show popup after treat is revealed
  setTimeout(() => {
    showTreatPopup(treatSrc);
  }, 1300); // after animations look done

  // Step 5: Reset cup after popup (optional — only if popup closes)
  setTimeout(() => {
    img.src = "assests/cup.png";
    img.style.animation = '';
    img.style.transform = 'scale(1)';
    img.style.filter = 'brightness(1)';
    treat.style.opacity = '0';
    treat.style.transform = 'translateY(10px) scale(0.95)';
    canClick = true;
  }, 1500);
}


function showTreatPopup(treatFileName) {
  const popup = document.getElementById('treatPopup');
  const popupImg = document.getElementById('popupImage');
  const popupBtn = document.getElementById('popupButton');
  const config = treatPopups[treatFileName];

  if (!config) {
    console.warn(`No popup config for ${treatFileName}`);
    return;
  }

  popupImg.src = config.image;
  popupBtn.textContent = config.buttonText;

  // Animate in
  popup.classList.remove('hidden');
  setTimeout(() => popup.classList.add('show'), 10);

  popupBtn.onclick = () => {
    // Animate out
    popup.classList.remove('show');
    setTimeout(() => {
      popup.classList.add('hidden');
      config.action();
    }, 400); // match transition time
  };
}

const lampDialog = document.getElementById('lampDialog');
async function goToNextStep() {
  cupGame.classList.add("hidden");

  const backdrop = document.getElementById("giftBackdrop");
  const gift = document.getElementById("giftImage");
  const lid = document.getElementById("giftLid");
  const reveal = document.getElementById("giftReveal");
  const text = document.getElementById("giftText");
  const button = document.getElementById("giftButton");

  // Step 1: Fade in backdrop
  backdrop.classList.remove("hidden");
  setTimeout(() => backdrop.classList.add("show"), 10);

  // Step 2: Animate gift shaking (1→2→3→2→1)
  const frames = ["assests/gift1.png", "assests/gift2.png", "assests/gift3.png", "assests/gift2.png", "assests/gift1.png", "assests/gift2.png", "assests/gift3.png", "assests/gift2.png", "assests/gift1.png", "assests/gift2.png", "assests/gift3.png", "assests/gift2.png"];
  for (let frame of frames) {
    gift.src = frame;
    await new Promise(r => setTimeout(r, 180));
  }

  // Step 3: Switch to open gift
  gift.src = "assests/gift-open.png";
  lid.classList.remove("hidden");

// Step 4: Move lid up + fade out
setTimeout(() => {
  lid.style.transform = "translate(-50%, -100px)";
  lid.style.opacity = "0";
}, 500);

// Step 5: Reveal magic item (emerges upward and stays centered)
setTimeout(() => {
  reveal.classList.remove("hidden");
  reveal.style.opacity = "1";
  reveal.style.transform = "translateX(-50%) translateY(-15px) scale(1)";
  reveal.style.animation = "levitate 2.5s ease-in-out infinite, giftGlow 1.5s ease-in-out infinite";
}, 1000);

// Step 6: Fade in text and button separately
setTimeout(() => {
  reveal.classList.add("show");
  text.classList.remove("hidden");
  text.style.opacity = "1";
  button.classList.remove("hidden");
  button.style.opacity = "1";
}, 1800);

  // Step 7: Button action
  button.onclick = () => {
    backdrop.classList.remove("show");
    setTimeout(() => backdrop.classList.add("hidden"), 600);
    lampDialog.showModal();
    console.log("🎁 Gift scene complete — proceed to next stage!");
  };
}



  async function startShuffle() {
    isShuffling = true;
    
    statusMsg.textContent = 'Shuffling...';

    let swaps = difficulty === 'easy' ? 12 : 15;
    let delay = difficulty === 'easy' ? 400 : 350;

    for (let i = 0; i < swaps; i++) {
      const a = Math.floor(Math.random() * cups.length);
      let b = Math.floor(Math.random() * cups.length);
      while (a === b) b = Math.floor(Math.random() * cups.length);

      await animateSwap(cups[a], cups[b], delay);
      [cups[a], cups[b]] = [cups[b], cups[a]];
      delay = Math.max(80, delay * 0.9);
    }

    isShuffling = false;
    canClick = true;
    startBtn.disabled = false;
    statusMsg.textContent = 'Pick the ball having yo pokémon';
  }

  async function animateSwap(cup1, cup2, duration) {
    const cup1Start = { left: parseFloat(cup1.style.left), top: parseFloat(cup1.style.top) };
    const cup2Start = { left: parseFloat(cup2.style.left), top: parseFloat(cup2.style.top) };

    const frames = 30;
    for (let f = 0; f <= frames; f++) {
      const t = f / frames;
      const arc = Math.sin(t * Math.PI) * 40; // curved path arc
      const new1Left = cup1Start.left + (cup2Start.left - cup1Start.left) * t;
      const new1Top = cup1Start.top + (cup2Start.top - cup1Start.top) * t - arc / 5;
      const new2Left = cup2Start.left + (cup1Start.left - cup2Start.left) * t;
      const new2Top = cup2Start.top + (cup1Start.top - cup2Start.top) * t + arc / 5;

      cup1.style.left = `${new1Left}%`;
      cup1.style.top = `${new1Top}%`;
      cup2.style.left = `${new2Left}%`;
      cup2.style.top = `${new2Top}%`;

      await new Promise((r) => setTimeout(r, duration / frames));
    }
  }
  const rubLampBtn = document.getElementById('rubLampBtn');
rubLampBtn.onclick = () => {
  startGenieScene();
};
}
function startGenieScene() {
  const lampDialog = document.getElementById("lampDialog");
  const genieScene = document.getElementById("genieScene");
  const lampImg = document.getElementById("lampImg");
  const genieImg = document.getElementById("genieImg");
  const genieDialog = document.getElementById("genieDialog");
  const responseBtn = document.getElementById("responseBtn");
  const giftScene = document.getElementById("iconScene");


  lampDialog.close();
  genieScene.classList.remove("hidden");

  let genieReveal = 100;
  let genieFullyRevealed = false;
  let isRubbing = false;
  let lastX = null;

  function startRub(e) {
    isRubbing = true;
    lastX = e.touches ? e.touches[0].clientX : e.clientX;
    lampImg.classList.add("glow");
  }

  function stopRub() {
    isRubbing = false;
    lastX = null;
    lampImg.classList.remove("glow");
    lampImg.style.transform = "rotate(0deg)";
  }

  function onRubMove(e) {
    if (!isRubbing) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    if (lastX !== null) {
      const diff = Math.abs(currentX - lastX);
      if (diff > 10) {
        genieReveal -= 3;
        if (genieReveal < 0) genieReveal = 0;
        genieImg.style.clipPath = `inset(${genieReveal}% 0 0 0)`;
        genieImg.style.opacity = "1";
        lampImg.style.transform = `rotate(${(Math.random() - 0.5) * 6}deg)`;
      }

      if (genieReveal <= 5 && !genieFullyRevealed) {
        genieFullyRevealed = true;
        showGenieDialog();
      }
    }
    lastX = currentX;
  }

  function showGenieDialog() {
    lampImg.classList.remove("glow");
    setTimeout(() => {
      genieDialog.classList.remove("hidden");
      responseBtn.classList.remove("hidden");
      startDialogueSequence();
    }, 800);
  }

  // 🎭 Multi-step Genie dialogue system
  const dialogues = [
    { text: "Who tf woke me up from my sleep?", button: "I did. Crazy bisheps tho" },
    { text: "Haha, you flatter me pretty boy. You're not that bad either ;)", button: "Twankss!" },
    { text: "I'm a gift genie. I give 1 gift and 1 wish to people who wake me up on their birthday.\n Is it your birthday?", button: "Yea it's my bday" },
    { text: "Great!! I'll unlock your 3rd gift!", button: "Let’s gooo!" },
    { text: "Ah ah.. before you go, take your wish", button: "i wish for...." },
    { text: "Ayyy? What you think of me man? Ik yo wish already. im a pro at this. ", button: "Dayumm what is it?" },
  { text: "See <img src=\"assests/wish.jpeg\" alt=\"gift\" style=\"height:30px;vertical-align:middle;margin:0 6px;border-radius:16px;\" /><br>Told ya I'm a pro.\n Your wish will be granted. Now go to your gifts.", button: "On it!" }
  ];

  let step = 0;

  function startDialogueSequence() {
    genieDialog.innerHTML = `<p>${dialogues[step].text}</p>`;
    responseBtn.textContent = dialogues[step].button;

    responseBtn.onclick = () => {
      step++;
      if (step < dialogues.length) {
        genieDialog.innerHTML = `<p>${dialogues[step].text}</p>`;
        responseBtn.textContent = dialogues[step].button;
      } else {
        // 🌟 Transition to Gift Scene
        genieScene.style.opacity = 0;
        setTimeout(() => {
          genieScene.classList.add("hidden");
          showFinalGenieDialog();
        }, 500);
      }
    };
  }
  



  // Lamp rubbing events (kept exactly as before)
  lampImg.addEventListener("mousedown", startRub);
  lampImg.addEventListener("mouseup", stopRub);
  lampImg.addEventListener("mouseleave", stopRub);
  lampImg.addEventListener("mousemove", onRubMove);
  lampImg.addEventListener("touchstart", startRub);
  lampImg.addEventListener("touchend", stopRub);
  lampImg.addEventListener("touchcancel", stopRub);
  lampImg.addEventListener("touchmove", onRubMove);
}
const giftScene = document.getElementById("iconScene");
function showFinalGenieDialog() {
  const genieDialog = document.getElementById("geniefinalDialog");
  const closeGenieDialogBtn = document.getElementById("closegeniefinalDialog");
 // replace with your gift scene container ID

  // 🪄 Show dialog
  genieDialog.showModal();

  // 🎁 When user closes it, go to gift scene
  closeGenieDialogBtn.addEventListener("click", () => {
    genieDialog.close();
      giftScene.classList.remove("hidden");
      giftScene.style.opacity = 1;
  });
}
  // 🎁 Gift click actions
  const musicGift = document.getElementById("musicGift");
  const cameraGift = document.getElementById("cameraGift");
  const mailGift = document.getElementById("mailGift");
  const letterScene = document.getElementById('letterScene');

  if (musicGift)
    musicGift.addEventListener("click", () => {
      giftScene.classList.add("hidden");
      backBtn.classList.remove("hidden");
      showdisclaimerDialog();
    });
  if (cameraGift)
    cameraGift.addEventListener("click", () => {
      giftScene.classList.add("hidden");
      backBtn.classList.remove("hidden");
      PolaroidStack();
    });
  if (mailGift)
    mailGift.addEventListener("click", () => {
      giftScene.classList.add("hidden");
      letterScene.classList.remove("hidden");
      backBtn.classList.remove("hidden");
    });

function showdisclaimerDialog() {

  const songsDialog = document.getElementById("songsDialog");
  const closedisclaimerDialog = document.getElementById("closedisclaimerDialog");
 // replace with your gift scene container ID

  // 🪄 Show dialog
  songsDialog.showModal();
  const playBtn = document.getElementById("disclaimerBtn");
  const audio = new Audio("audios/disclaimer.m4a");
  let playing = false;

  playBtn.addEventListener("click", () => {
    if (!playing) {
      audio.play();
      playing = true;

      // Add pulse animation
      playBtn.classList.add("playing");
    } else {
      audio.pause();
      audio.currentTime = 0;
      playing = false;
      playBtn.classList.remove("playing");
    }

    audio.onended = () => {
      playing = false;
      playBtn.classList.remove("playing");
    };
  });
  // 🎁 When user closes it, go to gift scene
  closedisclaimerDialog.addEventListener("click", () => {
    audio.pause();
      songsDialog.close();
      setupAudioPlayer();
  });
}

const musicPlayer = document.getElementById('musicOverlay');

function setupAudioPlayer() {

  const playBtn = document.getElementById("songaudioBtn");
  const songaudio = new Audio("audios/interface.m4a");
  let playing = false;
    const songs = [
    "audios/song1.ogg",
    "audios/song2.ogg",
    "audios/song6.m4a",
    "audios/song3.m4a",
    "audios/song4.m4a",
    "audios/song5.ogg"
  ];
  if ( !songaudio || !songs || !musicPlayer) return;
  // Interface sound for button
  playBtn.addEventListener("click", () => {
    if (!playing) {
      songaudio.play();
      playing = true;
      playBtn.classList.add("playing");
    } else {
      songaudio.pause();
      songaudio.currentTime = 0;
      playing = false;
      playBtn.classList.remove("playing");
    }

    songaudio.onended = () => {
      playing = false;
      playBtn.classList.remove("playing");
    };
  });

  // Show overlay
  musicPlayer.classList.remove('hidden');

  // --- 🎵 MAIN PLAYER LOGIC ---
  const playPauseBtn = document.getElementById('play-pause');
  const playIcon = document.getElementById('play');
  const seekbar = document.getElementById('seekbar');
  const audio = document.getElementById('audio');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const coverImg = document.getElementById('cover-img');

  // Your songs (adjust filenames as per your actual folder)

  const covers = [
    "assests/cover1.gif",
    "assests/cover2.gif",
    "assests/cover6.gif",
    "assests/cover3.gif",
    "assests/cover4.gif",
    "assests/cover5.gif"
  ]

  let currentSongIndex = 0;
  audio.src = songs[currentSongIndex];
  coverImg.src = covers[currentSongIndex];
  // Play / Pause toggle
  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playIcon.src = "assests/play.png";
    } else {
      audio.pause();
      playIcon.src = "assests/pause.png";
    }
  });

  // Seekbar progress
  audio.addEventListener('timeupdate', () => {
    seekbar.value = (audio.currentTime / audio.duration) * 100 || 0;
  });

  seekbar.addEventListener('input', () => {
    audio.currentTime = (seekbar.value / 100) * audio.duration;
  });

  // Circular Next / Prev navigation
  nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playNewSong();
  });

  prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playNewSong();
  });

  // Auto-next after song ends
  audio.addEventListener('ended', () => {
    seekbar.value = 0;
    playIcon.src = "assests/pause.png";
  });

  function playNewSong() {
    audio.src = songs[currentSongIndex];
    coverImg.src = covers[currentSongIndex];
    audio.play();
    playIcon.src = "assests/play.png";
    seekbar.value = 0;
  }
    backBtn.addEventListener("click", () => {
    songaudio.pause();
    audio.pause();
    playIcon.src = "assests/pause.png";

  });
}


function PolaroidStack() {
  const polaroidScene = document.getElementById('polaroidScene');
  const polaroidStack = document.getElementById('polaroidStack');
  const photos = Array.from(polaroidStack.querySelectorAll('.polaroid'));

  polaroidScene.classList.remove('hidden');

  let currentIndex = 0;
let toggleSide = true; // true = right, false = left

function showNextPhoto() {
  const current = photos[currentIndex];
  current.classList.add(toggleSide ? 'fly-away-right' : 'fly-away-left');

  setTimeout(() => {
    current.classList.remove('fly-away-right', 'fly-away-left');
    polaroidStack.appendChild(current); // move to end
    resetZIndexes();
    toggleSide = !toggleSide; // switch side for next click
  }, 1000);

  currentIndex = (currentIndex + 1) % photos.length;
}

  function resetZIndexes() {
    const reorderedPhotos = Array.from(polaroidStack.querySelectorAll('.polaroid'));
    reorderedPhotos.forEach((photo, i) => {
      photo.style.zIndex = reorderedPhotos.length - i;
      photo.style.transform = `rotate(${Math.floor(Math.random() * 10 - 3)}deg)`;
    });
  }

  resetZIndexes();

  polaroidStack.addEventListener('click', showNextPhoto);
}



