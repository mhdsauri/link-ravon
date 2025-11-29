// SIMPLE VERSION - dengan Coming Soon page dan navigasi yang benar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Hide loader setelah 2 detik
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
    }, 2000);
    
    // Track current page state
    let currentPage = 'main';
    
    // Setup WhatsApp clicks
    var whatsappLinks = document.querySelectorAll('[data-type="whatsapp"]');
    whatsappLinks.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('WhatsApp clicked!');
            showSubpage('whatsappPage');
        });
    });
    
    // Setup Instagram clicks
    var instagramLinks = document.querySelectorAll('[data-type="instagram"]');
    instagramLinks.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Instagram clicked!');
            showSubpage('instagramPage');
        });
    });
    
    // Setup Telegram clicks
    var telegramLinks = document.querySelectorAll('[data-type="telegram"]');
    telegramLinks.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Telegram clicked!');
            showSubpage('telegramPage');
        });
    });
    
    // Setup Coming Soon clicks
    var comingSoonLinks = document.querySelectorAll('[data-type="comingsoon"]');
    comingSoonLinks.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            var serviceName = this.getAttribute('data-service');
            console.log('Coming Soon clicked for:', serviceName);
            showComingSoon(serviceName);
        });
    });
    
    // Setup back buttons
    var backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Back button clicked!');
            goBack();
        });
    });
    
    // Handle mobile back button dengan event listener
    window.addEventListener('popstate', function(event) {
        console.log('Back button detected, current page:', currentPage);
        handleBrowserBack();
    });
    
    // Simpan state ke sessionStorage ketika page unload
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('ravonCurrentPage', currentPage);
        console.log('Saved page state to sessionStorage:', currentPage);
    });
    
    // Handle external link clicks - simpan state sebelum membuka link
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[target="_blank"]');
        if (link && link.getAttribute('href') && !link.getAttribute('href').startsWith('#')) {
            console.log('External link clicked, saving state:', currentPage);
            sessionStorage.setItem('ravonCurrentPage', currentPage);
        }
    });
    
    function showSubpage(pageId) {
        console.log('Showing subpage:', pageId);
        
        // Sembunyikan semua halaman
        hideAllPages();
        
        // Tampilkan subpage yang dipilih
        document.getElementById(pageId).style.display = 'flex';
        
        // Update current page
        currentPage = pageId;
        
        // Tambah state ke history
        window.history.pushState({ page: pageId, timestamp: Date.now() }, '', `#${pageId}`);
        
        console.log('Subpage shown:', pageId, 'Current page:', currentPage);
    }
    
    function showComingSoon(serviceName) {
        console.log('Showing Coming Soon for:', serviceName);
        
        // Update title berdasarkan service
        document.getElementById('comingSoonTitle').textContent = serviceName;
        
        // Sembunyikan semua halaman
        hideAllPages();
        
        // Tampilkan coming soon
        document.getElementById('comingSoonPage').style.display = 'flex';
        
        // Update current page
        currentPage = 'comingSoonPage';
        
        // Tambah state ke history
        window.history.pushState({ page: 'comingSoonPage', timestamp: Date.now() }, '', `#comingsoon`);
        
        console.log('Coming Soon shown for:', serviceName, 'Current page:', currentPage);
    }
    
    function goBack() {
        console.log('Manual back clicked. Current page:', currentPage);
        
        if (currentPage === 'main') {
            console.log('Already at main page');
            return;
        }
        
        if (currentPage === 'comingSoonPage') {
            // Kembali dari Coming Soon ke halaman sebelumnya
            const previousPage = getPreviousPageFromHistory();
            console.log('Back from Coming Soon to:', previousPage);
            
            if (previousPage && previousPage !== 'main') {
                showSubpage(previousPage);
            } else {
                goBackToMain();
            }
        } else {
            // Kembali dari subpage ke main
            goBackToMain();
        }
    }
    
    function handleBrowserBack() {
        console.log('Browser back button. Current page:', currentPage);
        
        if (currentPage === 'main') {
            console.log('Already at main page');
            return;
        }
        
        if (currentPage === 'comingSoonPage') {
            // Browser back dari Coming Soon
            const previousPage = getPreviousPageFromHistory();
            console.log('Browser back from Coming Soon to:', previousPage);
            
            if (previousPage && previousPage !== 'main') {
                showSubpageWithoutHistory(previousPage);
            } else {
                goBackToMainWithoutHistory();
            }
        } else {
            // Browser back dari subpage
            goBackToMainWithoutHistory();
        }
    }
    
    function getPreviousPageFromHistory() {
        // Cari halaman sebelum Coming Soon dari history state
        if (window.history.state && window.history.state.previousPage) {
            return window.history.state.previousPage;
        }
        
        // Fallback: tebak berdasarkan URL atau sessionStorage
        const savedPage = sessionStorage.getItem('ravonPreviousPage');
        return savedPage || 'whatsappPage'; // default fallback
    }
    
    function showSubpageWithoutHistory(pageId) {
        console.log('Showing subpage without history:', pageId);
        
        // Sembunyikan semua halaman
        hideAllPages();
        
        // Tampilkan subpage yang dipilih
        document.getElementById(pageId).style.display = 'flex';
        
        // Update current page
        currentPage = pageId;
        
        // Replace state tanpa menambah history baru
        window.history.replaceState({ page: pageId, timestamp: Date.now() }, '', `#${pageId}`);
        
        console.log('Subpage shown without history:', pageId);
    }
    
    function goBackToMain() {
        console.log('Going back to main page');
        
        // Sembunyikan semua halaman
        hideAllPages();
        
        // Tampilkan main container
        document.getElementById('mainContainer').style.display = 'flex';
        
        // Update current page
        currentPage = 'main';
        
        // Replace URL tanpa menambah history
        window.history.replaceState({ page: 'main', timestamp: Date.now() }, '', '#main');
        
        console.log('Back to main completed');
    }
    
    function goBackToMainWithoutHistory() {
        console.log('Going back to main page without history');
        
        // Sembunyikan semua halaman
        hideAllPages();
        
        // Tampilkan main container
        document.getElementById('mainContainer').style.display = 'flex';
        
        // Update current page
        currentPage = 'main';
        
        console.log('Back to main without history completed');
    }
    
    function hideAllPages() {
        document.querySelectorAll('.subpage').forEach(function(page) {
            page.style.display = 'none';
        });
        document.getElementById('mainContainer').style.display = 'none';
    }
    
    // Restore page state dari sessionStorage ketika page load
    function restorePageState() {
        const savedPage = sessionStorage.getItem('ravonCurrentPage');
        console.log('Restoring page state from sessionStorage:', savedPage);
        
        if (savedPage && savedPage !== 'main') {
            if (savedPage === 'comingSoonPage') {
                showComingSoon('Coming Soon');
            } else if (['whatsappPage', 'instagramPage', 'telegramPage'].includes(savedPage)) {
                showSubpage(savedPage);
            }
        } else {
            // Default ke main page
            goBackToMainWithoutHistory();
        }
    }
    
    // Handle page load dengan hash
    function handleInitialLoad() {
        const hash = window.location.hash.substring(1);
        console.log('Initial hash detected:', hash);
        
        if (hash === 'whatsappPage' || hash === 'instagramPage' || hash === 'telegramPage') {
            showSubpage(hash);
        } else if (hash === 'comingsoon') {
            showComingSoon('Coming Soon');
        } else {
            restorePageState();
        }
    }
    
    // Initialize
    handleInitialLoad();
    
    console.log('Navigation system initialized!');
});