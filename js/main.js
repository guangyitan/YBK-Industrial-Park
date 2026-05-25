// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const desktopLinks = document.querySelectorAll('.nav-links a:not(.btn)');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const loadMoreBtn = document.getElementById('load-more-progress');

// Sticky Navbar Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow-md)';
        navbar.classList.add('scrolled');
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'var(--shadow-sm)';
        navbar.classList.remove('scrolled');
    }
});

// ScrollSpy Navigation (Active Link Highlighting)
const sections = document.querySelectorAll('section[id], header[id]');

function highlightNavigation() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150; // Offset for sticky header
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            desktopLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
            mobileLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);
// Run once on load
highlightNavigation();

// Click to Scroll & Set Active
desktopLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Only prevent default if it's an anchor link on the same page
        if (this.getAttribute('href').startsWith('#')) {
            desktopLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close Mobile Menu on Link Click & Set Active
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        if (this.getAttribute('href').startsWith('#')) {
            mobileLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Unit Types Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Load More Progress (Mock functionality)
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        const track = document.getElementById('progress-track');
        
        // Create a new card mock
        const newCard = document.createElement('div');
        newCard.className = 'carousel-card';
        newCard.style.animation = 'fadeIn 0.5s ease-out';
        newCard.innerHTML = `
            <img src="https://images.unsplash.com/photo-1541888079737-25e2ebfc8ad6?q=80&w=2070&auto=format&fit=crop" class="carousel-img" alt="Future Progress">
            <div class="carousel-content">
                <div class="carousel-date">Upcoming</div>
                <h4>Next Phase</h4>
                <p class="text-grey" style="font-size: 0.875rem;">Anticipated milestone for structural completion.</p>
            </div>
        `;
        
        track.appendChild(newCard);
        
        // Hide button after loading mock items
        loadMoreBtn.style.display = 'none';
    });
}
