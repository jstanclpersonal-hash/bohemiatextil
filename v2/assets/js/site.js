// Bohemia Textil – v2: rok v patičce, decentní pohyb, mobilní menu, kontaktní formulář.
(function () {
  'use strict';
  var root = document.documentElement;

  // 1) Aktuální rok v patičce (statická hodnota v HTML platí i bez JS)
  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });

  // 2) Pohyb („mild“, jen bez omezeného pohybu): odhalení se staggerem 80 ms, kreslení ilustrací,
  //    postup, loga, lesk CTA a count-up čísel. Co je vidět už při načtení, ukáže se bez animace;
  //    jednorázové efekty se pak spustí po 300 ms. Bez JS / bez podpory je vše vidět a nakreslené.
  clearTimeout(window.__rvT);
  if (root.classList.contains('js-reveal')) {
    if (!('IntersectionObserver' in window)) {
      root.classList.remove('js-reveal', 'js-draw');
    } else {
      var observe = function (sel, threshold, fn, atLoad) {
        var io = new IntersectionObserver(function (entries) {
          var n = 0;
          entries.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); fn(e.target, n++); } });
        }, { threshold: threshold, rootMargin: '0px 0px -8% 0px' });
        document.querySelectorAll(sel).forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < innerHeight && r.bottom > 0) atLoad(el); else io.observe(el);
        });
      };
      var play = function (el) { el.classList.add('is-in'); };
      var draw = function (el) { el.classList.add('is-drawn'); };
      var later = function (fn) { return function (el) { setTimeout(function () { fn(el); }, 300); }; };
      var countUp = function (box, delay) {
        box.querySelectorAll('[data-count]').forEach(function (el) {
          var end = el.textContent;
          el.style.minWidth = el.offsetWidth + 'px';
          el.textContent = end.replace(/\d+/g, '0');
          setTimeout(function () {
            var t0;
            requestAnimationFrame(function step(t) {
              t0 = t0 || t;
              var k = Math.min(1, (t - t0) / 900), e = 1 - Math.pow(1 - k, 3);
              el.textContent = k < 1 ? end.replace(/\d+/g, function (n) { return Math.round(n * e); }) : end;
              if (k < 1) requestAnimationFrame(step);
            });
          }, delay || 0);
        });
      };
      observe('[data-reveal], [data-stagger] > *', 0.15, function (el, i) {
        el.style.setProperty('--d', Math.min(i, 5) * 80 + 'ms');
        play(el);
        setTimeout(function () { el.classList.add('rv-done'); el.style.removeProperty('--d'); }, 1300);
      }, function (el) { el.classList.add('is-in', 'rv-done'); });
      observe('.steps[data-anim]', 0.3, play, later(play));
      observe('.clients__list[data-anim], .cta-band[data-anim]', 0.2, play, later(play));
      observe('svg.ill', 0.25, draw, later(draw));
      observe('.hero__facts[data-anim]', 0.5, function (el) { countUp(el); }, function (el) { countUp(el, 300); });
    }
  }

  // 3) Mobilní menu (≤ 960 px): fokus zůstává v hlavičce, zbytek stránky je inert
  var header = document.querySelector('.site-header');
  var nav = document.getElementById('menu');
  var burger = header && header.querySelector('.burger');
  if (header && nav && burger) {
    var outside = [document.querySelector('.skip-link'), document.querySelector('main'), document.querySelector('.site-footer')]
      .filter(Boolean);
    var isOpen = function () { return header.classList.contains('is-open'); };
    var setOpen = function (open, returnFocus) {
      header.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Zavřít menu' : 'Menu');
      outside.forEach(function (el) { el.inert = open; });
      if (open) nav.querySelector('a').focus();
      else if (returnFocus) burger.focus();
    };
    burger.addEventListener('click', function () { setOpen(!isOpen(), true); });
    nav.addEventListener('click', function (e) { if (isOpen() && e.target.closest('a')) setOpen(false, false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) setOpen(false, true); });
    var mq = window.matchMedia('(min-width: 961px)');
    var onWide = function () { if (mq.matches && isOpen()) setOpen(false, false); };
    if (mq.addEventListener) mq.addEventListener('change', onWide); else mq.addListener(onWide);
  }

  // 4) Kontaktní formulář (FormSubmit přes AJAX; bez JS se odešle klasicky s nativní validací)
  var form = document.getElementById('contact-form');
  if (!form) return;
  var view = document.getElementById('form-view') || form;
  var success = document.getElementById('form-success');
  var alertBox = document.getElementById('form-alert');
  var alertTpl = document.getElementById('form-alert-tpl');
  var statusEl = document.getElementById('form-status');
  var button = form.querySelector('button[type="submit"]');
  var buttonLabel = button.textContent;
  var MESSAGES = {
    email: 'Zadejte prosím platný e-mail, abychom vám mohli odpovědět.'
  };

  form.noValidate = true;

  var other = form.querySelector('input[value="Jiné"]');
  var otherHint = document.getElementById('sluzba-jine-hint');
  if (other && otherHint) {
    var syncHint = function () { otherHint.hidden = !other.checked; };
    other.addEventListener('change', syncHint);
    otherHint.querySelector('a').addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('f-message').focus();
    });
    syncHint();
  }

  function showSuccess() {
    view.hidden = true;
    success.hidden = false;
    success.querySelector('h2').focus();
  }
  // Návrat z odeslání bez JavaScriptu (FormSubmit přesměruje zpět s ?odeslano=1)
  if (/[?&]odeslano=1/.test(location.search)) showSuccess();

  function errorBox(field) { return field.id ? document.getElementById(field.id + '-error') : null; }

  function validate(field) {
    var box = errorBox(field);
    if (!box) return true;
    var ok = field.checkValidity();
    var hints = (field.getAttribute('data-hints') || '').split(' ').filter(Boolean);
    if (ok) {
      field.removeAttribute('aria-invalid');
      box.hidden = true;
      box.querySelector('span').textContent = '';
    } else {
      field.setAttribute('aria-invalid', 'true');
      box.querySelector('span').textContent = MESSAGES[field.name] || 'Vyplňte prosím toto pole.';
      box.hidden = false;
      hints.push(box.id);
    }
    if (hints.length) field.setAttribute('aria-describedby', hints.join(' '));
    else field.removeAttribute('aria-describedby');
    return ok;
  }

  // Inline validace: po opuštění vyplněného pole, a u chybného pole průběžně při psaní
  form.addEventListener('blur', function (e) {
    var f = e.target;
    if (errorBox(f) && (f.value || f.getAttribute('aria-invalid'))) validate(f);
  }, true);
  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') === 'true') validate(e.target);
  });

  function setSending(on) {
    button.disabled = on;
    button.textContent = on ? 'Odesílám…' : buttonLabel;
    statusEl.textContent = on ? 'Odesílám poptávku…' : '';
    form.setAttribute('aria-busy', String(on));
  }

  function showError() {
    alertBox.innerHTML = '';
    alertBox.appendChild(alertTpl.content.cloneNode(true));
    alertBox.hidden = false;
    alertBox.scrollIntoView({ block: 'nearest' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstInvalid = null;
    Array.prototype.forEach.call(form.elements, function (f) {
      if (!validate(f) && !firstInvalid) firstInvalid = f;
    });
    if (firstInvalid) { firstInvalid.focus(); return; }

    // Více hodnot se stejným jménem (zaškrtávací pole „Služba“) spojit čárkou
    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = key in data ? data[key] + ', ' + value : value;
    });

    alertBox.hidden = true;
    setSending(true);
    fetch(form.dataset.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json().then(function (json) { return { ok: res.ok, json: json }; }); })
      .then(function (r) {
        if (!r.ok || String(r.json.success) !== 'true') throw new Error(r.json.message || 'Chyba');
        form.reset();
        setSending(false);
        showSuccess();
      })
      .catch(function () {
        setSending(false);
        showError();
      });
  });
})();
