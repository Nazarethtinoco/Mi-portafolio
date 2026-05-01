document.addEventListener('DOMContentLoaded', function() {
  const haikyuuCursor = document.getElementById('haikyuuCursor');
  const cursorBall = document.querySelector('.cursor-ball');
  const cursorText = document.getElementById('cursorText');
  
  if (haikyuuCursor) {
    const haikyuuQuotes = ["¡Boom! 🏐", "Tobio-kun!", "¡Vamos!", "¡Recepciona!", "¡Arriba!", "¡Punto!", "¡Oya oya?", "¡Rolling Thunder!", "Hinata Boke!", "¡Kageyama!", "¡Nishinoya!", "¡Vamos a ganar!", "¡Fly High! 🏐", "¡Shoyo!", "¡Sobres!", "🏐🔥"];
    let lastQuote = "";
    
    function getRandomQuote() {
      let quote = haikyuuQuotes[Math.floor(Math.random() * haikyuuQuotes.length)];
      while (quote === lastQuote && haikyuuQuotes.length > 1) quote = haikyuuQuotes[Math.floor(Math.random() * haikyuuQuotes.length)];
      lastQuote = quote;
      return quote;
    }
    
    document.addEventListener('mousemove', (e) => { 
      haikyuuCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; 
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .info-chip, .contact-link-card, .submit-btn, .cta-primary, .cta-ghost, .social-pill, .nav-link, .project-link, .proj-link-primary, .proj-link-ghost');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        haikyuuCursor.classList.add('hover');
        cursorBall.style.transform = 'scale(1.6) rotate(20deg)';
        cursorText.textContent = getRandomQuote();
        if (el.classList.contains('cta-primary')) { 
          cursorBall.innerHTML = '⚔️'; 
          setTimeout(() => { if (haikyuuCursor.classList.contains('hover')) cursorBall.innerHTML = '🏐'; }, 300); 
        } else if (el.classList.contains('project-card')) { 
          cursorBall.innerHTML = '📸'; 
          setTimeout(() => { if (haikyuuCursor.classList.contains('hover')) cursorBall.innerHTML = '🏐'; }, 400); 
        } else { 
          cursorBall.innerHTML = '🔥'; 
          setTimeout(() => { if (haikyuuCursor.classList.contains('hover')) cursorBall.innerHTML = '🏐'; }, 300); 
        }
      });
      
      el.addEventListener('mouseleave', () => {
        haikyuuCursor.classList.remove('hover');
        cursorBall.style.transform = 'scale(1) rotate(0deg)';
        cursorBall.innerHTML = '🏐';
        cursorText.textContent = '¡Vamos!';
      });
    });
  }
});

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('mainNav');
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  const scrollPosition = window.scrollY + 200;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

const fadeElements = document.querySelectorAll('.fade-in');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
fadeElements.forEach(el => revealObserver.observe(el));

const skillBars = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = getComputedStyle(entry.target).getPropertyValue('--w');
      if (width) entry.target.style.width = width;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(bar => skillObserver.observe(bar));

const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const resetErrors = () => {
      document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('show'));
      document.querySelectorAll('.custom-input').forEach(input => input.classList.remove('is-invalid'));
    };
    const showError = (id) => document.getElementById(id).classList.add('show');
    
    resetErrors();
    let isValid = true;
    
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const asunto = document.getElementById('asunto');
    const mensaje = document.getElementById('mensaje');
    
    if (!nombre.value.trim() || nombre.value.trim().length < 3) { 
      showError('nombreError'); 
      nombre.classList.add('is-invalid'); 
      isValid = false; 
    } else nombre.classList.remove('is-invalid');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) { 
      showError('emailError'); 
      email.classList.add('is-invalid'); 
      isValid = false; 
    } else email.classList.remove('is-invalid');
    
    if (!asunto.value.trim() || asunto.value.trim().length < 3) { 
      showError('asuntoError'); 
      asunto.classList.add('is-invalid'); 
      isValid = false; 
    } else asunto.classList.remove('is-invalid');
    
    if (!mensaje.value.trim() || mensaje.value.trim().length < 10) { 
      showError('mensajeError'); 
      mensaje.classList.add('is-invalid'); 
      isValid = false; 
    } else mensaje.classList.remove('is-invalid');
    
    if (isValid) {
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Enviando...</span><i class="bi bi-hourglass-split"></i>';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        successMsg.classList.remove('d-none');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        setTimeout(() => successMsg.classList.add('d-none'), 5000);
      }, 1500);
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId !== '#' && targetId !== '') {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
        history.pushState(null, null, targetId);
      }
    }
  });
});

const heroSection = document.querySelector('.hero-section');
if (heroSection) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) heroSection.style.transform = `translateY(${scrolled * 0.4}px)`;
  });
}

const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  const currentYear = new Date().getFullYear();
  footerCopy.innerHTML = footerCopy.innerHTML.replace('2025', currentYear);
}

window.addEventListener('load', () => console.log('🏐 Portafolio de Alejandra Tinoco cargado'));

const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');
if (navbarToggler && navbarCollapse) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => { if (navbarCollapse.classList.contains('show')) navbarToggler.click(); });
  });
}

document.querySelectorAll('a[href="#"]').forEach(emptyLink => {
  emptyLink.addEventListener('click', (e) => e.preventDefault());
});

const inputs = document.querySelectorAll('.custom-input');
inputs.forEach(input => {
  input.addEventListener('focus', () => input.style.transform = 'translateX(4px)');
  input.addEventListener('blur', () => input.style.transform = '');
});