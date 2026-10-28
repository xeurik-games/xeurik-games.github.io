'use strict';
document.getElementById('year').textContent = new Date().getFullYear();

const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Fade sections in as they scroll into view; without IntersectionObserver everything just shows.
const revealed = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealed.forEach(el => observer.observe(el));
} else {
  revealed.forEach(el => el.classList.add('in'));
}

const lightbox = document.getElementById('lightbox');
const image = lightbox.querySelector('img');
let opener;
document.querySelectorAll('[data-lightbox]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    lightbox.querySelector('p').textContent = image.alt;
    lightbox.showModal();
    document.body.classList.add('modal-open');
  });
});
lightbox.querySelector('.close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    const bounds = lightbox.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
  }
});
lightbox.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  opener?.focus();
});
