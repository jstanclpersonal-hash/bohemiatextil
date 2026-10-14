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
