// Plynulé odhalování obsahu při scrollování.
// Animují se prvky s atributem data-reveal a potomci prvků s data-stagger;
// co se objeví na obrazovce současně, najede postupně jedno po druhém.
(function () {
  var root = document.documentElement;
  clearTimeout(window.__rvT);
  if (!root.classList.contains('js-reveal')) return;
  if (!('IntersectionObserver' in window)) { root.classList.remove('js-reveal'); return; }

  var STEP = 110;      // rozestup mezi prvky (ms)
  var MAX_STEPS = 6;   // nejdelší čekání = 6 × STEP

  function finish(el) {
    if (el.classList.contains('rv-done')) return;
    el.classList.remove('is-in');
    el.classList.add('rv-done');
    el.style.removeProperty('--d');
  }

  var io = new IntersectionObserver(function (entries) {
    var shown = entries
      .filter(function (e) { return e.isIntersecting; })
      .map(function (e) { return e.target; })
      .sort(function (a, b) { return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1; });

    shown.forEach(function (el, i) {
      io.unobserve(el);
      var delay = Math.min(i, MAX_STEPS) * STEP;
      el.style.setProperty('--d', delay + 'ms');
      el.classList.add('is-in');
      if (el.parentElement.hasAttribute('data-stagger')) el.parentElement.classList.add('stagger-in');
      el.addEventListener('animationend', function onEnd(e) {
        if (e.target !== el || e.pseudoElement) return;
        el.removeEventListener('animationend', onEnd);
        finish(el);
      });
      setTimeout(function () { finish(el); }, delay + 1500);
    });
  }, { rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll('[data-reveal], [data-stagger] > *').forEach(function (el) { io.observe(el); });
})();

// Mobilní menu + odeslání kontaktního formuláře
(function () {
  var nav = document.getElementById('menu');
  var burger = document.querySelector('.burger');
  var closeBtn = document.querySelector('.nav-close');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
    if (open) nav.querySelector('a').focus();
  }
  if (nav && burger) {
    burger.addEventListener('click', function () { setMenu(true); });
    closeBtn.addEventListener('click', function () { setMenu(false); burger.focus(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); burger.focus(); }
    });
  }

  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');
  var THANKS = 'Děkujeme za Váš zájem, v blízké době se Vám ozveme zpět';

  // Návrat z odeslání bez JavaScriptu (FormSubmit přesměruje zpět s ?odeslano=1)
  if (/[?&]odeslano=1/.test(location.search)) status.textContent = THANKS;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = value; });
    button.disabled = true;
    status.classList.remove('is-error');
    status.textContent = 'Odesílám…';
    fetch(form.dataset.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json().then(function (json) { return { ok: res.ok, json: json }; }); })
      .then(function (r) {
        if (!r.ok || String(r.json.success) !== 'true') throw new Error(r.json.message || 'Chyba');
        form.reset();
        status.textContent = THANKS;
      })
      .catch(function () {
        status.classList.add('is-error');
        status.textContent = 'Zprávu se nepodařilo odeslat. Napište nám prosím na vaclav.stancl@tiscali.cz.';
      })
      .finally(function () { button.disabled = false; });
  });
})();
