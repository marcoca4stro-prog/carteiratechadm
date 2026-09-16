const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a')];

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('header[id], section[id]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-38% 0px -55%', threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

const demo = document.querySelector('#product-demo');
const demoButton = demo.querySelector('.demo-button');

demoButton.addEventListener('click', () => {
  const active = demo.classList.toggle('activated');
  demoButton.setAttribute('aria-pressed', String(active));
  demoButton.lastChild.textContent = active ? ' Baixar a alavanca' : ' Levantar a alavanca';
});
