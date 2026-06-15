/* LEFT WORDS */
const words = [
  'INFORMATICS STUDENT',
  'WEB DEVELOPER',
  'GAME DEVELOPER',
  'DATA ANALYST',
  'UI/UX DESIGNER'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typing = document.getElementById('typing');

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typing.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typing.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex++;

      if (wordIndex >= words.length) {
        wordIndex = 0;
      }
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

/* Skills */

const skillSection = document.querySelector('#skills');
const bars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      bars.forEach((bar) => {
        bar.classList.add('animate');
      });
    }
  });
});

skillObserver.observe(skillSection);

const skillCards = document.querySelectorAll('.skill-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

skillCards.forEach((card) => {
  cardObserver.observe(card);
});

/* Portfolio */

const buttons = document.querySelectorAll('.portfolio-filter button');
const items = document.querySelectorAll('.portfolio-item');

function jalankanFilter(kategori) {
  items.forEach((item) => {
    if (kategori === 'all' || item.dataset.category === kategori) {
      item.style.display = 'block'; // Ini yang memicu 'redraw' layout di HP
    } else {
      item.style.display = 'none';
    }
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    jalankanFilter(filter);
  });
});

const tombolAktifAwal = document.querySelector('.portfolio-filter button.active');
if (tombolAktifAwal) {
  jalankanFilter(tombolAktifAwal.dataset.filter);
}

items.forEach((item) => {
  item.addEventListener('click', function(e) {
    items.forEach((el) => {
      if (el !== this) el.classList.remove('show-overlay');
    });
    this.classList.toggle('show-overlay');
  });
});

/* BACK TO TOP */

const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
});

topBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/* REVEAL */

const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: 'translateY(50px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: 700,
          fill: 'forwards'
        }
      );
    }
  });
});

sections.forEach((section) => {
  observer.observe(section);
});

/* MOBILE MENU */

const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

if (menuToggle && navbar) {
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('open');

    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navbar.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.navbar a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navbar.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
