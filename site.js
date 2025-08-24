// site.js  — responsive nav / burger
(() => {
  const burger = document.querySelector('.burger');
  const nav    = document.querySelector('.navlinks');

  if (!burger || !nav) return;

  const closeNav = () => {
    nav.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  };

  const toggleNav = () => {
    const nowOpen = !nav.classList.contains('active');
    nav.classList.toggle('active', nowOpen);
    burger.setAttribute('aria-expanded', String(nowOpen));
  };

  // Toggle on button
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNav();
  });

  // Close when clicking a link
  nav.addEventListener('click', (e) => {
    const el = e.target;
    if (el.tagName === 'A') closeNav();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('active')) return;
    if (!nav.contains(e.target) && e.target !== burger) closeNav();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
})();