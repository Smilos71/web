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
(function securityShield() {
    const CONFIG = {
        overlayId: 'beeguard-overlay',
        styleId: 'beeguard-security-logic',
        origin: 'https://smilos.is-a.dev'
    };

    // 1. Listen for the success message from your iframe
    window.addEventListener("message", (event) => {
        if (event.origin !== CONFIG.origin) return;

        if (event.data.type === "beeguard-success") {
            const overlay = document.getElementById(CONFIG.overlayId);
            const shieldStyle = document.getElementById(CONFIG.styleId);
            
            if (overlay) {
                overlay.style.transition = "opacity 0.5s ease";
                overlay.style.opacity = "0";
                setTimeout(() => {
                    // Critical: Remove the security style ONLY after verified success
                    if (shieldStyle) shieldStyle.remove();
                    overlay.remove();
                    document.body.style.overflow = "";
                }, 500);
            }
        }
    }, false);

    // 2. Watchdog: If someone deletes the Overlay or CSS via Inspect Element
    setInterval(() => {
        const overlayExists = document.getElementById(CONFIG.overlayId);
        const styleExists = document.getElementById(CONFIG.styleId);
        const isVerified = !document.getElementById(CONFIG.styleId) && !document.getElementById(CONFIG.overlayId);

        // If elements are missing and we didn't trigger the unlock, punish the user
        if (!isVerified && (!overlayExists || !styleExists)) {
            document.body.innerHTML = `
                <div style="background:#000;color:#ff0000;height:100vh;display:flex;align-items:center;justify-content:center;font-family:monospace;text-align:center;flex-direction:column;padding:20px;">
                    <h1>[ SECURITY BREACH DETECTED ]</h1>
                    <p>BeeGuard protection tampered with. Access denied.</p>
                    <button onclick="location.reload()" style="background:#ff0000;color:#000;border:none;padding:10px 20px;cursor:pointer;font-weight:bold;">RELOAD SYSTEM</button>
                </div>`;
            document.body.style.background = "#000";
        }
    }, 1000);
})();


    // --- BEEGUARD SECURITY CORE ---
const targetNode = document.documentElement;
const config = { attributes: true, childList: true, subtree: true };

const securityCallback = (mutationsList, observer) => {
    const overlayExists = document.getElementById('beeguard-overlay');
    // Pokud overlay zmizí nebo mu někdo nastaví display: none
    if (!overlayExists || overlayExists.style.display === 'none' || overlayExists.style.visibility === 'hidden') {
        // Totální destrukce stránky při pokusu o obejití
        document.body.innerHTML = "<h1>[ SECURITY BREACH ]</h1><p>Tampering detected. System locked.</p>";
        window.location.reload();
    }
};

const observer = new MutationObserver(securityCallback);
observer.observe(targetNode, config);


    function unlockWeb(overlay) {
    // 1. DŮLEŽITÉ: Vypneme hlídače, aby nás neukončil
    if (typeof observer !== 'undefined') observer.disconnect();

    // 2. Animace zmizení
    overlay.style.transition = "opacity 0.6s ease";
    overlay.style.opacity = "0";
    document.body.style.overflow = ""; 

    setTimeout(() => {
        overlay.remove();
        // Pokud jsi přidal ten zneviditelňující styl do hlavičky, smaž ho taky:
        const initStyle = document.getElementById('beeguard-init-hide');
        if (initStyle) initStyle.remove();
    }, 600);
}

    
