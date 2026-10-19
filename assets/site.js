(function () {
  // ---- highlight the download row for the visitor's OS ----
  var ua = (navigator.userAgent || '').toLowerCase();
  var os = /windows/.test(ua) ? 'win' : /mac os|macintosh/.test(ua) ? 'mac' : /linux|x11/.test(ua) && !/android/.test(ua) ? 'linux' : null;
  var osName = { win: 'Windows', mac: 'macOS', linux: 'Linux' }[os];
  if (os) {
    document.querySelectorAll('table.dl tr[data-os="' + os + '"]').forEach(function (r) { r.classList.add('mine'); });
    var cta = document.getElementById('cta-download');
    if (cta) cta.textContent = 'Download for ' + osName;
    var tab = document.getElementById('t-' + os);
    if (tab) selectTab(tab);
  }

  // ---- tabs ----
  function selectTab(tab) {
    var list = tab.parentElement;
    list.querySelectorAll('[role=tab]').forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  document.querySelectorAll('[role=tablist]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role=tab]'));
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { selectTab(t); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!n) return;
        var next = tabs[(i + n + tabs.length) % tabs.length];
        selectTab(next); next.focus(); e.preventDefault();
      });
    });
  });

  // ---- copy buttons on code blocks ----
  document.querySelectorAll('pre').forEach(function (pre) {
    if (!navigator.clipboard) return;
    var b = document.createElement('button');
    b.className = 'copy-btn'; b.type = 'button'; b.textContent = 'Copy';
    b.addEventListener('click', function () {
      navigator.clipboard.writeText(pre.innerText.replace(/\nCopied$|\nCopy$/, '')).then(function () {
        b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1400);
      });
    });
    pre.appendChild(b);
  });

  // ---- lightbox ----
  var dlg = document.querySelector('.lightbox');
  if (dlg && dlg.showModal) {
    var img = dlg.querySelector('img'), cap = dlg.querySelector('.lb-cap');
    document.querySelectorAll('.zoom').forEach(function (z) {
      z.addEventListener('click', function () {
        img.src = z.dataset.src; img.alt = z.querySelector('img').alt; cap.textContent = z.dataset.cap || '';
        dlg.showModal();
      });
    });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === img) dlg.close(); });
  }

  // ---- mobile menu ----
  var btn = document.querySelector('.menu-btn'), side = document.getElementById('sidebar');
  if (btn) {
    btn.addEventListener('click', function () {
      var open = side.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      btn.textContent = open ? 'Close' : 'Menu';
    });
    side.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { side.classList.remove('open'); btn.setAttribute('aria-expanded', false); btn.textContent = 'Menu'; });
    });
  }

  // ---- highlight the current section in the sidebar ----
  var links = {};
  side.querySelectorAll('a[href^="#"]:not(.brand)').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || !links[e.target.id]) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });
  }
})();
