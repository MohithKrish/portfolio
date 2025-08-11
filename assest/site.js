(function () {
  // Active nav highlighting
  const path = location.pathname.toLowerCase();
  const isHomePath = path.endsWith('/') || path.endsWith('/index.html');
  document.querySelectorAll('nav a[data-nav]').forEach(a => {
    const href = a.getAttribute('href')?.toLowerCase() || '';
    const isHomeLink = href.endsWith('index.html');
    if ((isHomePath && isHomeLink) || path.endsWith('/' + href) || path.endsWith(href)) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // Scroll reveal animations
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Current year
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();

  // Projects loader (if projects grid exists)
  const grid = document.getElementById('projects-grid');
  if (grid) {
    fetch('assets/projects.json')
      .then(r => r.ok ? r.json() : [])
      .then(items => {
        if (!Array.isArray(items) || items.length === 0) {
          grid.innerHTML = '<p class="muted">No projects to show yet.</p>';
          return;
        }
        grid.innerHTML = '';
        for (const p of items) {
          const card = document.createElement('article');
          card.className = 'card reveal is-visible';
          card.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.summary || ''}</p>
            <p class="stack">${p.stack || ''}</p>
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
            ${p.demo ? ` · <a href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>` : ''}
          `;
          grid.appendChild(card);
        }
      })
      .catch(() => {
        grid.innerHTML = '<p class="muted">Could not load projects.</p>';
      });
  }
})();
