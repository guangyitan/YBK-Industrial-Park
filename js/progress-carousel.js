// Progress Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
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
    nextBtn.addEventListener('click', function() {
        const maxSlide = Math.max(0, totalSlides - getSlidesPerView());
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    });
    
    // Previous button functionality
    prevBtn.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', function() {
        updateCarousel();
    });
    
    // Indicator click functionality
    indicators.addEventListener('click', function(e) {
        if (e.target.classList.contains('indicator')) {
            currentSlide = parseInt(e.target.dataset.slide);
            updateCarousel();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
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
    
    carouselTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carouselTrack.addEventListener('touchend', function(e) {
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
