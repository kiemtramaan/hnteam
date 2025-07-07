let isMusicPlaying = false;

window.addEventListener('load', () => {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const cols = canvas.width / 20;
  const drops = Array.from({ length: cols }).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = '16px VT323';

    for (let i = 0; i < drops.length; i++) {
      const text = String.fromCharCode(0x30A0 + Math.random() * 96);
      ctx.fillText(text, i * 20, drops[i] * 20);
      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 33);
});

// Auto music trigger on first user interaction
window.addEventListener('click', () => {
  const audio = document.getElementById('background-music');
  const btn = document.getElementById('toggle-music-btn');
  if (!isMusicPlaying) {
    audio.play();
    btn.textContent = 'Tắt nhạc';
    isMusicPlaying = true;
  }
}, { once: true });

document.getElementById('toggle-music-btn').addEventListener('click', () => {
  const audio = document.getElementById('background-music');
  const btn = document.getElementById('toggle-music-btn');
  if (isMusicPlaying) {
    audio.pause();
    btn.textContent = 'Bật nhạc';
  } else {
    audio.play();
    btn.textContent = 'Tắt nhạc';
  }
  isMusicPlaying = !isMusicPlaying;
});
