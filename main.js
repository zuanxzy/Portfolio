const darkToggle = document.getElementById('dark-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');
const revealElements = document.querySelectorAll('.reveal');
const typingText = document.getElementById('typing-text');
const backToTop = document.createElement('button');

function setThemeIcon(isDark) {
  darkToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

function applySavedTheme() {
  const isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark', isDark);
  setThemeIcon(isDark);
}

function updateActiveSection() {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const isCurrent =
      scrollPosition >= section.offsetTop &&
      scrollPosition < section.offsetTop + section.offsetHeight;

    if (isCurrent) {
      navLinks.forEach((link) => link.parentElement.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight - 110) {
      element.classList.add('active-reveal');
    }
  });
}

darkToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  setThemeIcon(isDark);
});

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 76,
      behavior: 'smooth',
    });
  });
});

backToTop.id = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  updateActiveSection();
  revealOnScroll();
  backToTop.style.display = window.scrollY > 520 ? 'grid' : 'none';
});

const focusWords = [
  'frontend fundamentals',
  'responsive layouts',
  'clean JavaScript',
  'real portfolio projects',
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeFocus() {
  const current = focusWords[wordIndex];
  typingText.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(typeFocus, 80);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeFocus, 38);
    return;
  }

  deleting = !deleting;
  if (!deleting) wordIndex = (wordIndex + 1) % focusWords.length;
  setTimeout(typeFocus, 950);
}

document.addEventListener('DOMContentLoaded', () => {
  applySavedTheme();
  revealOnScroll();
  updateActiveSection();
  typeFocus();
});
