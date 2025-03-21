document.addEventListener("DOMContentLoaded", function () {
    let adDiv = document.createElement("div");
    adDiv.className = "sticky-ad";
    adDiv.innerHTML = `<iframe data-aa='2383938' src='//ad.a-ads.com/2383938?size=728x90' 
                        style='width:728px; height:90px; border:0px; padding:0; overflow:hidden; background-color: transparent;'></iframe>`;

    let style = document.createElement("style");
    style.innerHTML = `
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
    document.body.appendChild(adDiv);
});
