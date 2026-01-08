(function() {
    // URL, kde hostuješ svůj verify.html
    const VERIFY_URL = "https://smilos.is-a.dev/resources/beeguardframe.html";

    function initBeeGuard() {
        // Zabráníme skrolování původního webu
        document.body.style.overflow = 'hidden';

        // 1. Vytvoření overlaye
        const overlay = document.createElement('div');
        overlay.id = 'beeguard-overlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #0c0c0c; z-index: 9999999; border: none;
        `;

        // 2. Vytvoření iframe, který načte tvou verify stránku
        const iframe = document.createElement('iframe');
        iframe.src = VERIFY_URL;
        iframe.style.cssText = `
            width: 100%; height: 100%; border: none;
        `;

        overlay.appendChild(iframe);
        document.body.appendChild(overlay);

        // 3. Naslouchání na zprávu o úspěchu
        window.addEventListener("message", function(event) {
            // Pro větší bezpečnost můžeš kontrolovat i event.origin
            if (event.data.type === "beeguard-success") {
                unlockWeb(overlay);
            }
        }, false);
    }

    function unlockWeb(overlay) {
        overlay.style.transition = "opacity 0.6s ease";
        overlay.style.opacity = "0";
        document.body.style.overflow = ""; // Vrátíme skrolování

        setTimeout(() => {
            overlay.remove();
        }, 600);
    }

    // Spuštění po načtení DOMu
    if (document.readyState === "complete" || document.readyState === "interactive") {
        initBeeGuard();
})();
// bee meli :3
