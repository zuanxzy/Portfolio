// ---------------- Dark Mode ----------------
const darkToggle = document.getElementById('dark-toggle');
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  darkToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ---------------- Nav ----------------
const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');
function removeActive() {
  navLinks.forEach((link) => link.parentElement.classList.remove('active'));
}
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth',
    });
    removeActive();
    link.parentElement.classList.add('active');
  });
});
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;
  sections.forEach((section) => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      removeActive();
      const activeLink = document.querySelector(
        `.ul-list li a[href="#${section.id}"]`
      );
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });
  if (window.scrollY > 500) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;
    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active-reveal');
    }
  });
});
const revealElements = document.querySelectorAll(
  '.home-container, .about-container, .projects-container, .services-container, .contact-content'
);
revealElements.forEach((el) => el.classList.add('reveal'));
const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = 'back-to-top';
document.body.appendChild(backToTop);
backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
backToTop.addEventListener(
  'mouseover',
  () => (backToTop.style.transform = 'scale(1.2)')
);
backToTop.addEventListener(
  'mouseout',
  () => (backToTop.style.transform = 'scale(1)')
);
const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach((card) => {
  card.addEventListener(
    'mouseenter',
    () => (card.style.transform = 'translateY(-8px) scale(1.05)')
  );
  card.addEventListener(
    'mouseleave',
    () => (card.style.transform = 'translateY(0) scale(1)')
  );
});
const typingElement = document.querySelector('.info-home h3');
const words = [
  'Frontend Developer',
  'UI/UX Designer',
  'Web Enthusiast',
  'React Developer',
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
function type() {
  const currentWord = words[wordIndex];
  let displayedText = currentWord.substring(0, charIndex);
  typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';
  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, typingSpeed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, 1000);
  }
}
document.addEventListener('DOMContentLoaded', type);