(function () {
  const path = location.pathname.toLowerCase();

  // Treat "/" and "/index.html" as home
  const isHomePath = path.endsWith('/') || path.endsWith('/index.html');

  document.querySelectorAll('nav a[data-nav]').forEach(a => {
    const href = a.getAttribute('href').toLowerCase();
    const isHomeLink = href.endsWith('index.html');
    if ((isHomePath && isHomeLink) || path.endsWith(href)) {
      a.classList.add('active');
    }
  });

  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();
