const carousel = document.querySelector('.carousel');
let scrollSpeed = 1; // píxeles por frame
let animationFrame;

function autoScroll() {
  carousel.scrollLeft += scrollSpeed;

  // Reiniciar scroll para efecto loop
  if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
    carousel.scrollLeft = 0;
  }

  animationFrame = requestAnimationFrame(autoScroll);
}

// Pausar al pasar el mouse
carousel.addEventListener('mouseenter', () => cancelAnimationFrame(animationFrame));
carousel.addEventListener('mouseleave', autoScroll);


const slides = document.querySelectorAll('.carousel-banner .slide');
const btnCotiza = document.getElementById('btnCotiza');
let index = 0;

function siguienteSlide() {
  slides[index].classList.remove('active');
  index++;
  if(index >= slides.length) index = 0;
  slides[index].classList.add('active');
}

// Cambia automáticamente cada 2.5 segundos
setInterval(siguienteSlide, 2500);

// WhatsApp
btnCotiza.addEventListener('click', () => {
  const mensaje = slides[index].dataset.mensaje;
  const urlWhatsApp = `https://wa.me/525620287619?text=${encodeURIComponent(mensaje)}`;
  window.open(urlWhatsApp, "_blank");
});















const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

