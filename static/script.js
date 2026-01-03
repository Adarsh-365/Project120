// ===== FEATURE TABS FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.feature-content');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 1. Remove 'active' class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // 2. Add 'active' class to clicked tab
                tab.classList.add('active');

                // 3. Remove 'active' from all contents (this hides them via CSS)
                contents.forEach(content => content.classList.remove('active'));

                // 4. Add 'active' to the target content (this shows it via CSS)
                const targetId = tab.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});

// ===== NAVBAR INTERACTIONS =====
document.addEventListener('DOMContentLoaded', function () {
    const authButtons = document.querySelectorAll('.auth-buttons button');
    
    authButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            if (this.textContent.includes('Join Free')) {
                window.location.href = '/signup';
            } else if (this.textContent.includes('Log In')) {
                window.location.href = '/login';
            }
        });
    });
});

// ===== SMOOTH SCROLL FOR HERO TAGS =====
document.addEventListener('DOMContentLoaded', function () {
    const heroTags = document.querySelectorAll('.hero-tags span');
    
    heroTags.forEach(tag => {
        tag.addEventListener('click', function () {
            const searchTerm = this.textContent.trim();
            const searchInput = document.querySelector('.search-container input');
            if (searchInput) {
                searchInput.value = searchTerm;
            }
        });
    });
});

// ===== SEARCH FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function () {
    const searchButtons = document.querySelectorAll('.search-container button, .lookup-input button');
    
    searchButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const searchContainer = this.closest('.search-container') || this.closest('.lookup-input').parentElement;
            const searchInput = searchContainer.querySelector('input');
            
            if (searchInput && searchInput.value.trim()) {
                window.location.href = '/?q=' + encodeURIComponent(searchInput.value.trim());
            }
        });
    });

    // Also allow Enter key to search
    const allSearchInputs = document.querySelectorAll('.search-container input, .lookup-input input');
    allSearchInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const button = this.parentElement.querySelector('button') || 
                             this.closest('.search-container').querySelector('button') ||
                             this.closest('.lookup-input').querySelector('button');
                if (button) {
                    button.click();
                }
            }
        });
    });
});

// ===== TOGGLE SECTION BUTTONS =====
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// ===== CATEGORY SIDEBAR INTERACTIONS =====
document.addEventListener('DOMContentLoaded', function () {
    const categoryLinks = document.querySelectorAll('.cat-list li a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const category = this.textContent.split(' ')[0];
            // You can navigate or filter by category here
            // window.location.href = '/category/' + category;
        });
    });
});

// ===== SECTOR CARD INTERACTIONS =====
document.addEventListener('DOMContentLoaded', function () {
    const sectorCards = document.querySelectorAll('.sector-card:not(.blue-card)');
    
    sectorCards.forEach(card => {
        card.addEventListener('click', function () {
            const sector = this.querySelector('h3').textContent;
            // Navigate to sector page
            window.location.href = '/sector/' + sector.toLowerCase().replace(/\s+/g, '-');
        });
    });
});

// ===== FREIGHT QUOTE BUTTON =====
document.addEventListener('DOMContentLoaded', function () {
    const freightButton = document.querySelector('.freight-inputs .btn-primary');
    
    if (freightButton) {
        freightButton.addEventListener('click', function (e) {
            e.preventDefault();
            const from = document.querySelector('.freight-inputs input:nth-of-type(1)').value;
            const to = document.querySelector('.freight-inputs input:nth-of-type(2)').value;
            const weight = document.querySelector('.freight-inputs input:nth-of-type(3)').value;
            
            if (from && to && weight) {
                // You can add functionality to filter quotes here
                console.log('Get quotes for:', { from, to, weight });
            } else {
                alert('Please fill in all fields');
            }
        });
    }
});

// ===== FORM VALIDATION =====
document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#d32f2f';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    });
});

// ===== PRODUCT CARD HOVER EFFECTS =====
document.addEventListener('DOMContentLoaded', function () {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ===== SMOOTH SCROLL NAVIGATION =====
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links li');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const text = this.textContent.toLowerCase();
            // Add navigation logic here if needed
        });
    });
});

// ===== DYNAMIC CONTENT LOADING =====
function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<i class="fa-solid fa-spinner"></i>';
    document.body.appendChild(spinner);
}

function hideLoadingSpinner() {
    const spinner = document.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// ===== HANDLE EXTERNAL LINK CLICKS =====
document.addEventListener('DOMContentLoaded', function () {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // You can add analytics or logging here if needed
        });
    });
});

// ===== WINDOW RESIZE HANDLER =====
let resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        // Handle responsive adjustments here if needed
    }, 250);
});

console.log('NamsteChina application scripts loaded successfully!');
