'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
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
