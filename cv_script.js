// Hamburger Menu Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  burger.classList.toggle('toggle');
});

// Smooth Scroll for Navigation Links
const links = document.querySelectorAll('.nav-links li a');

for (const link of links) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Close menu on mobile after click
    if (navLinks.classList.contains('nav-active')) {
      navLinks.classList.remove('nav-active');
      burger.classList.remove('toggle');
    }
  });
}

// Scroll Reveal Animation
const sections = document.querySelectorAll('.section, .home-content, .project, .timeline-item, .skills-grid div');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const revealPoint = 150; // Adjust trigger point
    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add('reveal');
    } else {
      section.classList.remove('reveal');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // Trigger on load

// Active Link Highlighting on Scroll
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});
const timelineItems = document.querySelectorAll('.timeline-item');

function revealTimeline() {
  const triggerBottom = window.innerHeight * 0.85;
  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if(itemTop < triggerBottom){
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealTimeline);
window.addEventListener('load', revealTimeline);

const canvas = document.getElementById("fractalCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let t = 0; // time for animation

function drawFractal() {
  const w = canvas.width;
  const h = canvas.height;
  const img = ctx.createImageData(w, h);
  const data = img.data;

  const zoom = 200 + 50 * Math.sin(t * 0.01);
  const moveX = 0.5 * Math.cos(t * 0.005);
  const moveY = 0.5 * Math.sin(t * 0.005);

  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
      let a = (x - w / 2) / zoom + moveX;
      let b = (y - h / 2) / zoom + moveY;

      let ca = a, cb = b;
      let n = 0, maxIter = 30;
      while (n < maxIter) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) break;
        n++;
      }

      const pix = (x + y * w) * 4;
      const color = n === maxIter ? 0 : 255 - (n * 255) / maxIter;
      data[pix] = color;     // Red
      data[pix + 1] = 128;   // Green
      data[pix + 2] = 255 - color; // Blue
      data[pix + 3] = 255;   // Alpha
    }
  }

  ctx.putImageData(img, 0, 0);
  t++;
  requestAnimationFrame(drawFractal);
}

drawFractal();

