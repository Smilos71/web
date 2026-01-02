(async function() {
    // SEM VLOŽ TEN ODKAZ NA PUBLIKOVANÉ CSV Z GOOGLE TABULKY
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjtW2ephsRYJmyTIUO8mPM0CAEUuGhk3B1ryB1R4dpUHbtoGhgm8FOq-u9aabbVs1_s0ZJIFYKtcsH/pub?gid=0&single=true&output=tsv';
    
    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        
        // Rozsekáme CSV na řádky a sloupce
        const lines = data.split('\n');
        const map = {};
        
        lines.forEach(line => {
            const [oldPath, newUrl] = line.split(',');
            if (oldPath && newUrl) {
                map[oldPath.trim()] = newUrl.trim();
            }
        });

        const currentPath = window.location.pathname;

        // Pokud najdeme shodu, přesměrujeme
        if (map[currentPath]) {
            window.location.replace(map[currentPath]);
        }
    } catch (error) {
        console.error("Chyba při načítání přesměrování:", error);
    }
})();
