(async function() {
    // Link to your published TSV file
    const dataSourceUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjtW2ephsRYJmyTIUO8mPM0CAEUuGhk3B1ryB1R4dpUHbtoGhgm8FOq-u9aabbVs1_s0ZJIFYKtcsH/pub?gid=0&single=true&output=tsv';
    
    try {
        const response = await fetch(dataSourceUrl);
        const rawText = await response.text();
        
        // Split by lines
        const lines = rawText.split('\n');
        const redirectMap = {};

        lines.forEach(line => {
            // Split by tabulator or multiple spaces
            const columns = line.trim().split(/\s+/); 
            
            if (columns.length >= 2) {
                let sourcePath = columns[0].toLowerCase().trim();
                let targetUrl = columns[1].trim();
                
                // Remove trailing slash for better matching (except for homepage)
                if (sourcePath.endsWith('/') && sourcePath.length > 1) {
                    sourcePath = sourcePath.slice(0, -1);
                }
                
                redirectMap[sourcePath] = targetUrl;
            }
        });

        // Get current URL path and clean it up
        let currentPath = window.location.pathname.toLowerCase().trim();
        if (currentPath.endsWith('/') && currentPath.length > 1) {
            currentPath = currentPath.slice(0, -1);
        }

        // Execute redirection if match is found
        if (redirectMap[currentPath]) {
            window.location.replace(redirectMap[currentPath]);
        }
    } catch (error) {
        console.error("Redirection engine error:", error);
    }
})();
