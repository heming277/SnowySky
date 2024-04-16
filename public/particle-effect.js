const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
resizeCanvas();

function resizeCanvas() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

const particles = [];
const particleCount = 37;
const maxVelocity = 0.3;
const particleSize = 7;

function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * maxVelocity,
      vy: (Math.random() - 0.5) * maxVelocity
    });
  }
}

function initializeParticles() {
  if (!localStorage.getItem('particlesInitialized')) {
    createParticles();
    localStorage.setItem('particlesInitialized', 'true');
  } else {
    // Retrieve particle positions from localStorage
    const storedParticles = JSON.parse(localStorage.getItem('particles'));
    particles.length = 0; // Clear the existing particles array
    particles.push(...storedParticles); // Add the stored particles to the array
  }
}

function moveParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  particles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
    ctx.fill();
  });

  // Store particle positions in localStorage
  localStorage.setItem('particles', JSON.stringify(particles));
}

function repelParticles(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  particles.forEach(particle => {
    const dx = particle.x - mouseX;
    const dy = particle.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) { // Repulsion area
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = 150; // Max distance for repulsion
      const force = (maxDistance - distance) / maxDistance; // Calculate force based on distance

      particle.vx += forceDirectionX * force * 0.037; // Apply force to particle velocity
      particle.vy += forceDirectionY * force * 0.037;
    }
  });
}

function animate() {
  moveParticles();
  requestAnimationFrame(animate);
}

initializeParticles();
animate();

canvas.addEventListener('mousemove', repelParticles);