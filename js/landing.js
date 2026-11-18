/* FioTrack — banner dinâmico + interações da landing page */
(() => {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll('.slide'));
  const dots = Array.from(hero.querySelectorAll('.dot'));
  const prevBtn = hero.querySelector('.hero-arrow--prev');
  const nextBtn = hero.querySelector('.hero-arrow--next');
  const progress = hero.querySelector('.hero-progress-bar');

  const INTERVAL = 7000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let timer = null;

  function show(next, { user = false } = {}) {
    index = (next + slides.length) % slides.length;

    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === index);
      d.setAttribute('aria-selected', String(i === index));
    });

    // reinicia a barra de progresso
    if (progress && !reduceMotion) {
      hero.classList.remove('is-playing');
      void progress.offsetWidth; // força reflow para reiniciar a animação
      if (timer) hero.classList.add('is-playing');
    }

    if (user) restart();
  }

  function next() { show(index + 1); }
  function prev() { show(index - 1); }

  function start() {
    if (reduceMotion || slides.length < 2) return;
    stop();
    timer = setInterval(next, INTERVAL);
    hero.classList.add('is-playing');
  }

  function stop() {
    clearInterval(timer);
    timer = null;
    hero.classList.remove('is-playing');
  }

  function restart() { stop(); start(); }

  // --- controles ---
  nextBtn?.addEventListener('click', () => show(index + 1, { user: true }));
  prevBtn?.addEventListener('click', () => show(index - 1, { user: true }));
  dots.forEach(d => d.addEventListener('click', () => show(+d.dataset.go, { user: true })));

  // pausa ao passar o mouse / focar nos controles
  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', start);
  hero.addEventListener('focusin', stop);
  hero.addEventListener('focusout', (e) => {
    if (!hero.contains(e.relatedTarget)) start();
  });

  // teclado
  hero.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1, { user: true }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1, { user: true }); }
  });

  // swipe (toque)
  let startX = null;
  hero.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1), { user: true });
    startX = null;
  }, { passive: true });

  // esconde as setas/viradas quando há um só slide
  if (slides.length < 2) {
    prevBtn?.setAttribute('hidden', '');
    nextBtn?.setAttribute('hidden', '');
  }

  show(0);
  start();

  // --- cabeçalho muda ao rolar ---
  const header = document.querySelector('.site-header');
  const onScroll = () => header?.classList.toggle('is-stuck', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- rolagem suave com foco na seção de notícias ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
      history.replaceState(null, '', id);
    });
  });
})();
