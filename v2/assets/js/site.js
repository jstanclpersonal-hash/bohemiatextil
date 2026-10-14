// Bohemia Textil – v2: rok v patičce, jemné odhalování při scrollu, mobilní menu, kontaktní formulář.
(function () {
  'use strict';
  var root = document.documentElement;

  // 1) Aktuální rok v patičce (statická hodnota v HTML platí i bez JS)
  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });

  // 2) Odhalování při scrollu: posun 12 px, 450 ms, rozestup 60 ms, nejvýš 4 prvky po sobě.
  //    Hlídá jen [data-reveal] a potomky [data-stagger]; bez podpory nebo s omezeným pohybem je vše vidět hned.
  clearTimeout(window.__rvT);
  if (root.classList.contains('js-reveal')) {
    if (!('IntersectionObserver' in window)) {
      root.classList.remove('js-reveal');
    } else {
      var io = new IntersectionObserver(function (entries) {
        var shown = entries.filter(function (e) { return e.isIntersecting; });
        shown.forEach(function (entry, i) {
          var el = entry.target;
          io.unobserve(el);
          el.style.setProperty('--d', Math.min(i, 3) * 60 + 'ms');
          el.classList.add('is-in');
          setTimeout(function () { el.classList.add('rv-done'); el.style.removeProperty('--d'); }, 700);
        });
      }, { rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('[data-reveal], [data-stagger] > *').forEach(function (el) { io.observe(el); });
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
