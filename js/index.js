function toggleMenu() {
    var navLinks = document.getElementById("navLinks");
    var menuIcon = document.querySelector(".menu-icon");
    if (navLinks.style.maxHeight) {
        navLinks.style.maxHeight = null;
        menuIcon.classList.remove("change");
    } else {
        navLinks.style.maxHeight = navLinks.scrollHeight + "px";
        menuIcon.classList.add("change");
    }
}

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    var navLinks = document.getElementById("navLinks");
    var menuIcon = document.querySelector(".menu-icon");
    navLinks.style.maxHeight = null;
    menuIcon.classList.remove("change");
}

document.querySelector('.menu-icon').addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        var sectionId = this.getAttribute('href').substring(1);
        // Remove smooth scroll behavior from scrollIntoView since we're using custom smooth scroll
        document.getElementById(sectionId).scrollIntoView();
        showSection(sectionId);
    });
});

window.onclick = function(event) {
    var navLinks = document.getElementById("navLinks");
    var menuIcon = document.querySelector(".menu-icon");
    if (!event.target.matches('.menu-icon') && navLinks.style.maxHeight) {
        navLinks.style.maxHeight = null;
        menuIcon.classList.remove("change");
    }
}

//**************************** */
//**************************** */
/***************************** */



// Advanced Smooth Scrolling System
(function() {
    // State management
    const state = {
        currentY: window.scrollY,
        targetY: window.scrollY,
        velocity: 0,
        lastScrollTime: Date.now(),
        isScrolling: false,
        scrollDirection: 0
    };

    // Configurable parameters
    const config = {
        sensitivity: 0.5, // How much each scroll event affects movement
        maxSpeed: 50, // Maximum scrolling speed
        acceleration: 0.12, // How quickly we reach target speed
        deceleration: 0.95, // How quickly we slow down (higher = smoother)
        dampening: 0.9, // Reduces bouncing at scroll boundaries
        smoothness: 16 // Frame smoothing (higher = smoother but slower)
    };

    // Smoothing buffer for frame interpolation
    const smoothingBuffer = new Array(config.smoothness).fill(0);
    let smoothingIndex = 0;

    // Utility functions
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function getAverageMovement() {
        return smoothingBuffer.reduce((a, b) => a + b, 0) / config.smoothness;
    }

    // Handle mouse wheel events
    window.addEventListener('wheel', (e) => {
        e.preventDefault();

        // Update scroll direction
        state.scrollDirection = Math.sign(e.deltaY);

        // Calculate new target position with sensitivity
        const delta = e.deltaY * config.sensitivity;
        state.targetY = Math.max(0, Math.min(
            state.targetY + delta,
            document.documentElement.scrollHeight - window.innerHeight
        ));

        // Reset velocity if direction changed
        if (Math.sign(state.velocity) !== Math.sign(delta) && Math.abs(state.velocity) > 1) {
            state.velocity *= 0.5;
        }

        state.isScrolling = true;
        state.lastScrollTime = Date.now();
    }, { passive: false });

    // Touch support for mobile devices
    let touchStartY = 0;
    let lastTouchY = 0;

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touchY = e.touches[0].clientY;
        const deltaY = (lastTouchY - touchY) * 2;

        state.targetY = Math.max(0, Math.min(
            state.targetY + deltaY,
            document.documentElement.scrollHeight - window.innerHeight
        ));

        lastTouchY = touchY;
        state.isScrolling = true;
        state.lastScrollTime = Date.now();
    }, { passive: false });

    // Animation loop
    function animate() {
        if (state.isScrolling) {
            // Calculate distance to target
            const distance = state.targetY - state.currentY;

            // Apply acceleration based on distance
            state.velocity += distance * config.acceleration;

            // Apply speed limits
            state.velocity = Math.max(-config.maxSpeed, Math.min(config.maxSpeed, state.velocity));

            // Apply deceleration
            state.velocity *= config.deceleration;

            // Update position
            state.currentY += state.velocity;

            // Prevent overscroll
            if (state.currentY <= 0) {
                state.currentY = 0;
                state.velocity *= config.dampening;
            } else if (state.currentY >= document.documentElement.scrollHeight - window.innerHeight) {
                state.currentY = document.documentElement.scrollHeight - window.innerHeight;
                state.velocity *= config.dampening;
            }

            // Update smoothing buffer
            smoothingBuffer[smoothingIndex] = state.velocity;
            smoothingIndex = (smoothingIndex + 1) % config.smoothness;

            // Apply smoothed movement
            const smoothedMove = getAverageMovement();
            window.scrollTo(0, state.currentY);

            // Check if scrolling should stop
            if (Math.abs(state.velocity) < 0.1 && Math.abs(distance) < 0.1 &&
                Date.now() - state.lastScrollTime > 150) {
                state.isScrolling = false;
                state.velocity = 0;
            }
        }
        requestAnimationFrame(animate);
    }

    // Initialize
    animate();
})();