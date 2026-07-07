(function() {
    document.documentElement.style.display = 'none';

    window.addEventListener('DOMContentLoaded', () => {
        document.documentElement.style.display = '';
        document.body.style.display = 'none';

        // 1. ZÁMEK: Vygenerujeme absolutně náhodné heslo pro tuto konkrétní relaci
        const sessionUnlockCode = "bg_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

        const overlay = document.createElement('div');
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0c0c0c; z-index: 999999999; display: flex; justify-content: center; align-items: center;';

        const iframe = document.createElement('iframe');
        // Předáme unikátní heslo do tvého iframu
        iframe.src = 'https://smilos.is-a.dev/resources/beeguardframe.html?key=' + sessionUnlockCode;
        iframe.style.cssText = 'width: 100%; height: 100%; border: none;';

        overlay.appendChild(iframe);
        document.documentElement.appendChild(overlay);

        window.addEventListener('message', (event) => {
            // 2. ZÁMEK: Zpráva MUSÍ přijít z tvého webu
            if (event.origin !== 'https://smilos.is-a.dev') return;

            // 3. ZÁMEK: Kontrola dynamického hesla. Žádný statický text!
            // Pokud hacker pošle cokoliv z konzole, nikdy se netrefí do sessionUnlockCode.
            if (event.data && event.data.type === sessionUnlockCode) {
                overlay.remove();
                document.body.style.display = '';
            }
        });
    });
})();
