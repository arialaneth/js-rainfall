let canvas, ctx;
const particles = [];
const maxParticles = 1000;

const getRandomInt = (a, b) => Math.floor(Math.random() * (b - a + 1) + a);

const getRandomFloat = (a, b) => (Math.random() * (a - b) + b).toFixed(2);

const generateNewParticle = (init) => {
  const height = getRandomInt(10, 15);
  const y = (init ? getRandomInt(0, canvas.height) : 0) - height;
  return {
    speed: getRandomInt(15, 25),
    opacity: getRandomFloat(0.1, 0.9),
    x: getRandomInt(0, window.innerWidth),
    y, height
  };
};

const resizeCanvas = () => {
  if (canvas.width !== window.innerWidth) canvas.width = window.innerWidth;
  if (canvas.height !== window.innerHeight) canvas.height = window.innerHeight;
};

const draw = () => {
  resizeCanvas();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 1;
  ctx.lineCap = "round";
  
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    ctx.strokeStyle = `rgba(183, 217, 247, ${ p.opacity })`;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x, p.y + p.height);
    ctx.stroke();
    particles[i].y += p.speed;
    if (particles[i].y >= canvas.height) particles[i] = generateNewParticle();
  };

  window.requestAnimationFrame(draw);
};

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");
  resizeCanvas();

  for (let i = 0; i < maxParticles; i++) {
    particles.push(generateNewParticle(true));
  };

  draw();
});