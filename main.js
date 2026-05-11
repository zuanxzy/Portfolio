const darkToggle = document.getElementById('dark-toggle');
const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('main section');
const revealElements = document.querySelectorAll('.reveal');
const typingText = document.getElementById('typing-text');
const backToTop = document.createElement('button');

function setThemeIcon(isDark) {
  darkToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  setThemeIcon(true);
}

darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  setThemeIcon(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function removeActive() {
  navLinks.forEach((link) => link.parentElement.classList.remove('active'));
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (!targetSection) return;

    window.scrollTo({
      top: targetSection.offsetTop - 76,
      behavior: 'smooth',
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

function updateActiveSection() {
  const scrollPos = window.scrollY + 120;

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
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < window.innerHeight - 120) {
      element.classList.add('active-reveal');
    }
  });
}

backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  updateActiveSection();
  revealOnScroll();
  backToTop.style.display = window.scrollY > 500 ? 'grid' : 'none';
});

const words = [
  'Frontend Developer',
  'UI Builder',
  'Web Enthusiast',
  'React Learner',
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex += 1;
    setTimeout(type, 95);
    return;
  }

  if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(type, 45);
    return;
  }

  isDeleting = !isDeleting;
  if (!isDeleting) {
    wordIndex = (wordIndex + 1) % words.length;
  }
  setTimeout(type, 900);
}

document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  updateActiveSection();
  type();
});
