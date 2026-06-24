document.querySelectorAll('.nav-link, .footer-link, .scroll-down-btn').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Nur ausführen, wenn der Link wirklich zu einer Sektion auf der Seite führt
        if (targetId && targetId.startsWith('#') && targetId !== '#') {
            e.preventDefault(); // Verhindert das standardmäßige Springen und das '#' in der URL
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 1. Sanftes Scrollen zur Sektion auslösen
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // 2. Offcanvas Navbar schließen, falls sie offen ist
                const offcanvasElement = document.getElementById('offcanvasNavbar');
                if (offcanvasElement) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                    bsOffcanvas.hide();
                }
                
                // 3. URL sauber halten (löscht das #anker aus der Adresszeile ohne die Seite neu zu laden)
                window.history.pushState("", document.title, window.location.pathname + window.location.search);
            }
        }
    });
});