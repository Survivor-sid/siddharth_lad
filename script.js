const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(
  '.section-heading, .about-copy, .info-card, .skill-card, .project-card, .timeline-item, .credential-card, .practice-panel'
);
revealItems.forEach(item => item.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Certificate popup functionality

const certificateModal =
  document.getElementById('certificateModal');

const certificateImage =
  document.getElementById('certificateImage');

const certificateTitle =
  document.getElementById('certificateTitle');

const certificateTriggers =
  document.querySelectorAll('.certificate-trigger');

let lastCertificateTrigger = null;

// Open certificate
function openCertificate(trigger) {
  lastCertificateTrigger = trigger;

  certificateImage.src = trigger.dataset.certificate;
  certificateImage.alt = trigger.dataset.title + ' certificate';

  certificateTitle.textContent = trigger.dataset.title;

  certificateModal.classList.add('open');
  certificateModal.setAttribute('aria-hidden', 'false');

  document.body.classList.add('modal-open');

  certificateModal.querySelector('.certificate-close').focus();
}

// Close certificate
function closeCertificate() {
  certificateModal.classList.remove('open');
  certificateModal.setAttribute('aria-hidden', 'true');

  document.body.classList.remove('modal-open');

  certificateImage.src = '';

  if (lastCertificateTrigger) {
    lastCertificateTrigger.focus();
  }
}

// Attach click events
certificateTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    openCertificate(trigger);
  });
});

// Close button and backdrop
certificateModal
  .querySelectorAll('[data-close-certificate]')
  .forEach(control => {
    control.addEventListener('click', closeCertificate);
  });

// Close using Escape key
document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    certificateModal.classList.contains('open')
  ) {
    closeCertificate();
  }
});