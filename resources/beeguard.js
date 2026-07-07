(function() {
    // 1. Okamžitě zneviditelníme celý HTML dokument, aby neproblikl obsah
    document.documentElement.style.display = 'none';

    window.addEventListener('DOMContentLoaded', () => {
        // 2. Dokument ukážeme, ale body (obsah) necháme skryté
        document.documentElement.style.display = '';
        document.body.style.display = 'none';

        // 3. Vytvoříme nepřekonatelnou clonu
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0c0c0c; z-index: 999999999; display: flex; justify-content: center; align-items: center;';

        // 4. Vložíme tvůj čistý iframe
        const iframe = document.createElement('iframe');
        iframe.src = 'https://smilos.is-a.dev/resources/beeguardframe.html';
        iframe.style.cssText = 'width: 100%; height: 100%; border: none;';

        overlay.appendChild(iframe);
        document.documentElement.appendChild(overlay);

        // 5. Posloucháme, jestli iframe hlásí úspěch
        window.addEventListener('message', (event) => {
            // BEZPEČNOSTNÍ POJISTKA: Uznáváme zprávy POUZE z tvé domény!
            // Žádný bot nemůže poslat falešnou zprávu z konzole a odemknout to.
            if (event.origin !== 'https://smilos.is-a.dev') return;

            if (event.data && event.data.type === 'beeguard-success') {
                // Odstraníme clonu a ukážeme web
                overlay.remove();
                document.body.style.display = '';
            }
        });
    });
})();
