// Mesure d'audience du site (Google Analytics et Meta Pixel), chargée uniquement après
// consentement explicite. Sans réponse ou en cas de refus, aucun traceur n'est chargé.
// L'app Intimory elle-même ne contient aucun traceur.
(function () {
  const GA_ID = 'G-GTFM3S7ZV4';
  const PIXEL_ID = '768080352778758';
  const KEY = 'cookies_accepted';
  let loaded = false;

  function getConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setConsent(val) {
    try { localStorage.setItem(KEY, val ? 'true' : 'false'); } catch (e) { }
  }

  function loadTrackers() {
    if (loaded) return;
    loaded = true;
    // Google Analytics
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
    // Meta Pixel
    !function (f, b, e, v, n, t, x) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      x = b.getElementsByTagName(e)[0]; x.parentNode.insertBefore(t, x);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
  }

  const lang = (document.documentElement.lang || 'en').slice(0, 2);
  const L = {
    en: { text: 'We use audience measurement cookies (Google Analytics, Meta) only if you agree. The app itself never tracks you.', more: 'Learn more', ok: 'Accept', no: 'Refuse', href: '/privacy.html' },
    fr: { text: 'Nous utilisons des cookies de mesure d’audience (Google Analytics, Meta) seulement si vous l’acceptez. L’app elle-même ne vous piste jamais.', more: 'En savoir plus', ok: 'Accepter', no: 'Refuser', href: '/fr/privacy.html' },
    es: { text: 'Usamos cookies de medición de audiencia (Google Analytics, Meta) solo si lo aceptas. La app nunca te rastrea.', more: 'Más información', ok: 'Aceptar', no: 'Rechazar', href: '/es/privacy.html' },
  }[lang] || null;

  function renderBanner() {
    const t = L || { text: 'We use audience measurement cookies only if you agree.', more: 'Learn more', ok: 'Accept', no: 'Refuse', href: '/privacy.html' };
    document.getElementById('cookie-banner')?.remove();
    const html = `
      <div id="cookie-banner" role="dialog" aria-live="polite" style="
        position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;max-width:860px;margin:0 auto;
        background:#15151d;color:#fff;display:flex;gap:12px;flex-wrap:wrap;
        align-items:center;justify-content:space-between;border:1px solid rgba(255,255,255,.12);
        padding:14px 16px;border-radius:14px;box-shadow:0 10px 40px rgba(0,0,0,.5);
        font:14px/1.45 Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial">
        <span style="flex:1 1 320px">${t.text} <a href="${t.href}" style="color:#ffd1ec">${t.more}</a></span>
        <span style="white-space:nowrap">
          <button id="cookie-reject" style="margin-right:8px;background:#2a2a35;color:#fff;border:0;padding:9px 14px;border-radius:10px;cursor:pointer">${t.no}</button>
          <button id="cookie-accept" style="background:linear-gradient(135deg,#e94aa6,#9b5cf6);color:#fff;border:0;padding:9px 14px;border-radius:10px;cursor:pointer">${t.ok}</button>
        </span>
      </div>`;
    (document.getElementById('cookie-root') || document.body).insertAdjacentHTML('beforeend', html);
    document.getElementById('cookie-accept').onclick = () => {
      setConsent(true);
      document.getElementById('cookie-banner')?.remove();
      loadTrackers();
    };
    document.getElementById('cookie-reject').onclick = () => {
      setConsent(false);
      document.getElementById('cookie-banner')?.remove();
    };
  }

  // Lien « Gérer les cookies » du pied de page : permet de revenir sur son choix.
  document.querySelectorAll('[data-cookie-settings]').forEach((b) => {
    b.addEventListener('click', (ev) => { ev.preventDefault(); renderBanner(); });
  });

  const saved = getConsent();
  if (saved === 'true') loadTrackers();
  else if (saved !== 'false') renderBanner();
})();
