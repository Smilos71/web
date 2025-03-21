document.addEventListener("DOMContentLoaded", function () {
    console.log("Inject.js byl úspěšně načten!");

    // Přidání stylů
    let style = document.createElement("style");
    style.innerHTML = `
        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(0, -10px); }
        }
        #watermark {
            position: fixed;
            left: 20px;
            bottom: 20px;
            background-color: rgba(128, 0, 128, 0.8);
            color: white;
            padding: 5px 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            opacity: 0.9;
            font-family: 'Poppins', sans-serif;
            font-size: 16px;
            transform: scale(0.6);
            animation: float 3s ease-in-out infinite;
        }
        .sticky-ad {
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 728px;
            height: 90px;
            z-index: 9999;
            background: transparent;
            text-align: center;
        }
    `;
    document.head.appendChild(style);

    // Přidání watermarku
    let watermark = document.createElement("div");
    watermark.id = "watermark";
    watermark.innerHTML = `<p>Hosted with <a href="https://grapehost.rf.gd" style="color: white; text-decoration: underline;" target="_blank">GrapeHost</a></p>`;
    document.body.appendChild(watermark);

    // Přidání reklamy
    let adContainer = document.createElement("div");
    adContainer.className = "sticky-ad";
    adContainer.innerHTML = `<iframe data-aa='2383938' src='//ad.a-ads.com/2383938?size=728x90' 
            style='width:728px; height:90px; border:0px; padding:0; overflow:hidden; background-color: transparent;'></iframe>`;
    document.body.appendChild(adContainer);
});
