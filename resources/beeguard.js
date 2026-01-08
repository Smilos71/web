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


        // --------------------
/* --- BEEGUARD SECURITY FINAL SHIELD --- */
// Definujeme proměnné vně, aby na ně viděly všechny funkce
let securityObserver; 

(function securityShield() {
    const CONFIG = {
        overlayId: 'beeguard-overlay',
        origin: 'https://smilos.is-a.dev'
    };

    // 1. MutationObserver - Hlídá smazání overlaye
    securityObserver = new MutationObserver((mutationsList) => {
        const overlay = document.getElementById(CONFIG.overlayId);
        // Kontrolujeme přítomnost i viditelnost
        if (!overlay || overlay.style.display === 'none' || overlay.style.visibility === 'hidden') {
            document.body.innerHTML = `
                <div style="background:#000;color:#ff0000;height:100vh;display:flex;align-items:center;justify-content:center;font-family:monospace;text-align:center;flex-direction:column;padding:20px;">
                    <h1>[ SECURITY BREACH DETECTED ]</h1>
                    <p>BeeGuard protection tampered with. Access denied.</p>
                    <button onclick="location.reload()" style="background:#ff0000;color:#000;border:none;padding:10px 20px;cursor:pointer;font-weight:bold;">RELOAD SYSTEM</button>
                </div>`;
            document.body.style.background = "#000";
            location.reload();
        }
    });

    securityObserver.observe(document.documentElement, { attributes: true, childList: true, subtree: true });

    // 2. Naslouchání na zprávu (Stačí JEDNOU v celém souboru)
    window.addEventListener("message", (event) => {
        if (event.origin !== CONFIG.origin) return;
        if (event.data.type === "beeguard-success") {
            const overlay = document.getElementById(CONFIG.overlayId);
            if (overlay) unlockWeb(overlay);
        }
    }, false);
})();

// 3. Sjednocená funkce pro odemčení
function unlockWeb(overlay) {
    // Odpojíme hlídače dřív, než začneme mazat
    if (securityObserver) securityObserver.disconnect();

    overlay.style.transition = "opacity 0.6s ease";
    overlay.style.opacity = "0";
    document.body.style.overflow = ""; 

    setTimeout(() => {
        overlay.remove();
        // Smažeme případný inicializační styl, pokud existuje
        const initStyle = document.getElementById('beeguard-init-hide') || document.getElementById('beeguard-nojs-lock');
        if (initStyle) initStyle.remove();
    }, 600);
}
}

    
