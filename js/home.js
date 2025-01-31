// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    initGridBackground();
    initRotatingElements();
    initScrollIndicator();
});

// Dynamic Grid Background
function initGridBackground() {
    const grid = document.querySelector('.design-grid');
    const overlay = document.querySelector('.grid-overlay');

    // Create dynamic grid cells
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        grid.appendChild(cell);
    }


}

// Rotating Elements Animation
function initRotatingElements() {
    const rotatingElements = {
        elements: document.querySelectorAll('.rotating-elements .element'),
        currentIndex: 0,
        interval: null,
        duration: 2000, // 3 seconds per rotation

        init() {
            // Set initial styles
            this.elements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translatex(1000px)';
                if (index === 0) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(200px)';

                }
            });

            // Start rotation
            this.startRotation();

            // Add hover pause functionality
            this.addHoverListeners();
        },

        rotate() {
            // Hide current element
            this.elements[this.currentIndex].style.opacity = '0';
            this.elements[this.currentIndex].style.transform = 'translateY(100px)';

            // Update index
            this.currentIndex = (this.currentIndex + 1) % this.elements.length;

            // Show next element
            this.elements[this.currentIndex].style.opacity = '1';
            this.elements[this.currentIndex].style.transform = 'translateY(0)';
        },

        startRotation() {
            this.interval = setInterval(() => this.rotate(), this.duration);
        },

        stopRotation() {
            clearInterval(this.interval);
        },

        addHoverListeners() {
            const container = document.querySelector('.rotating-elements');
            container.addEventListener('mouseenter', () => this.stopRotation());
            container.addEventListener('mouseleave', () => this.startRotation());
        }
    };

    rotatingElements.init();
}

// Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let lastScroll = 0;
    let isVisible = true;

    // Handle scroll events
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Show/hide scroll indicator based on scroll direction
        if (currentScroll > lastScroll && isVisible) {
            scrollIndicator.style.opacity = '0';
            isVisible = false;
        } else if (currentScroll < lastScroll && !isVisible) {
            scrollIndicator.style.opacity = '1';
            isVisible = true;
        }

        // Hide when scrolled past hero section
        if (currentScroll > window.innerHeight) {
            scrollIndicator.style.opacity = '0';
            isVisible = false;
        }

        lastScroll = currentScroll;
    });

    // Add scroll animation for smooth scrolling
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    const grid = document.querySelector('.design-grid');
    grid.style.height = `${window.innerHeight}px`;
});