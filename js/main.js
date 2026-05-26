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
    link.addEventListener('click', function (e) {
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
    link.addEventListener('click', function () {
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

// Scroll-triggered animations for specs cards and counters
document.addEventListener('DOMContentLoaded', function () {
    // Get all specs cards
    const specsCards = document.querySelectorAll('.specs-card');

    // Create Intersection Observer for cards
    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the card element
                const card = entry.target;

                // Add animation class with delay based on card index
                const cardIndex = Array.from(specsCards).indexOf(card);
                const delay = cardIndex * 0.2; // 0.2s delay between each card

                // Set animation delay and trigger animation
                card.style.animationDelay = `${delay}s`;
                card.classList.add('animate');

                // Stop observing this card once animated
                observer.unobserve(card);
            }
        });
    }, observerOptions);

    // Start observing all specs cards
    specsCards.forEach(card => {
        observer.observe(card);
    });

    // --- Number Counter Animation Logic ---
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;

                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    // Get current value and remove commas if any exist
                    const count = +counter.innerText.replace(/,/g, '');

                    // Adjust speed of incrementing here (lower number = faster)
                    const inc = target / 40;

                    if (count < target) {
                        // Increment and format with commas
                        counter.innerText = Math.ceil(count + inc).toLocaleString();
                        setTimeout(updateCount, 30); // 30ms interval between ticks
                    } else {
                        // Ensure final number is perfectly matched
                        counter.innerText = target.toLocaleString();
                    }
                };

                updateCount();
                // Stop observing so it doesn't count up multiple times
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5 // Trigger when element is 50% in view
    });

    // Start observing all counter elements
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Progress Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const carouselTrack = document.getElementById('progress-carousel-track');
    const prevBtn = document.getElementById('progress-prev');
    const nextBtn = document.getElementById('progress-next');
    const indicators = document.getElementById('progress-indicators');
    const slides = carouselTrack.querySelectorAll('.progress-card');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let slidesPerView = 1; // Default for mobile

    // Function to get slides per view based on screen width
    function getSlidesPerView() {
        if (window.innerWidth >= 1024) {
            return 2; // Desktop shows 2 cards
        }
        return 1; // Mobile shows 1 card
    }

    // Function to update carousel position
    function updateCarousel() {
        slidesPerView = getSlidesPerView();
        const maxSlide = Math.max(0, totalSlides - slidesPerView);

        // Adjust current slide if it exceeds the new maximum
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }

        // Calculate slide width based on view
        let slideWidth;
        if (slidesPerView === 2) {
            // Desktop: each card width including margin
            slideWidth = 53; // 50% + 3% margin approximation
        } else {
            // Mobile: each card width including margin
            slideWidth = 103; // 100% + 3% margin approximation for 20px spacing
        }

        const offset = -currentSlide * slideWidth;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        // Update indicators
        const indicatorButtons = indicators.querySelectorAll('.indicator');
        indicatorButtons.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });

        // Update button states
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= maxSlide;

        // Show/hide indicators based on view
        indicators.style.display = slidesPerView === 1 ? 'flex' : 'none';
    }

    // Next button functionality
    nextBtn.addEventListener('click', function () {
        const maxSlide = Math.max(0, totalSlides - getSlidesPerView());
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    });

    // Previous button functionality
    prevBtn.addEventListener('click', function () {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });

    // Window resize handler
    window.addEventListener('resize', function () {
        updateCarousel();
    });

    // Indicator click functionality
    indicators.addEventListener('click', function (e) {
        if (e.target.classList.contains('indicator')) {
            currentSlide = parseInt(e.target.dataset.slide);
            updateCarousel();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        const maxSlide = Math.max(0, totalSlides - getSlidesPerView());
        if (e.key === 'ArrowLeft' && currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        } else if (e.key === 'ArrowRight' && currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    carouselTrack.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        const maxSlide = Math.max(0, totalSlides - getSlidesPerView());

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSlide < maxSlide) {
                // Swipe left - next slide
                currentSlide++;
                updateCarousel();
            } else if (diff < 0 && currentSlide > 0) {
                // Swipe right - previous slide
                currentSlide--;
                updateCarousel();
            }
        }
    }

    // Initialize carousel
    updateCarousel();
});