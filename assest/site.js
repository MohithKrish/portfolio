<script>
  (function() {
    const path = location.pathname.toLowerCase();
    document.querySelectorAll('nav a[data-nav]').forEach(a => {
      const href = a.getAttribute('href').toLowerCase();
      // Treat "/" and "/index.html" as home
      const isHome = (path.endsWith('/') || path.endsWith('/index.html')) && href.endsWith('index.html');
      if (href && (path.endsWith(href) || isHome)) a.classList.add('active');
    });
    const y = document.getElementById('y'); if (y) y.textContent = new Date().getFullYear();
  })();
</script>
