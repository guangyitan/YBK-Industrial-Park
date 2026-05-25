// Scroll-triggered animations for specs cards and counters
document.addEventListener('DOMContentLoaded', function() {
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
