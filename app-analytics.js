(function () {
  const GA_ID = 'G-GTFM3S7ZV4';          // ← remplace si besoin
  const KEY = 'cookies_accepted';
  let gtagLoaded = false;

  function hasConsent() { return localStorage.getItem(KEY) === 'true'; }
  function setConsent(val) { localStorage.setItem(KEY, val ? 'true' : 'false'); }

  function loadGA() {
    if (gtagLoaded) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    s.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){ dataLayer.push(arguments); };
      gtag('js', new Date());
      gtag('config', GA_ID);
      gtagLoaded = true;
    };
    document.head.appendChild(s);
  }

  function renderBanner() {
    // FR si première partie du path == 'fr'
    const firstSegment = location.pathname.replace(/^\/+/,'').split('/')[0];
    const isFR = firstSegment === 'fr';

    const privacyHref = isFR ? '/fr/privacy.html' : '/privacy.html';
    const text = isFR
      ? `Ce site utilise des cookies de mesure d’audience. <a href="${privacyHref}" style="color:#f3d7ff">En savoir plus</a>`
      : `This site uses analytics cookies. <a href="${privacyHref}" style="color:#f3d7ff">Learn more</a>`;

    const html = `
      <div id="cookie-banner" style="
        position:fixed;left:0;right:0;bottom:0;z-index:9999;
        background:#111; color:#fff; display:flex; gap:12px; 
        align-items:center; justify-content:space-between;
        padding:14px 16px; box-shadow:0 -6px 30px rgba(0,0,0,.35);
        font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial">
        <span>${text}</span>
        <span style="white-space:nowrap">
          <button id="cookie-accept" style="margin-right:8px;background:#f3d7ff;color:#111;border:0;padding:8px 12px;border-radius:8px;cursor:pointer">
            ${isFR ? 'Accepter' : 'Accept'}
          </button>
          <button id="cookie-reject" style="background:#333;color:#fff;border:0;padding:8px 12px;border-radius:8px;cursor:pointer">
            ${isFR ? 'Refuser' : 'Refuse'}
          </button>
        </span>
      </div>`;

    (document.getElementById('cookie-root') || document.body)
      .insertAdjacentHTML('beforeend', html);

    document.getElementById('cookie-accept').onclick = () => {
      setConsent(true);
      document.getElementById('cookie-banner')?.remove();
      loadGA();
    };
    document.getElementById('cookie-reject').onclick = () => {
      setConsent(false);
      document.getElementById('cookie-banner')?.remove();
    };
  }

  // Init
  const saved = localStorage.getItem(KEY);
  if (saved === 'true') { loadGA(); return; }
  if (saved === 'false') { return; }
  renderBanner();
})();