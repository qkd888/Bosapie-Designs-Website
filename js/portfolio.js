document.addEventListener('DOMContentLoaded', () => {
    // Portfolio Filtering
    /**********************************/
    /**********************************/
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Add click event listeners to filter buttons
    /**********************************/
    /**********************************/
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            /**********************************/
            /**********************************/
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            /**********************************/
            /**********************************/
            button.classList.add('active');

            // Get the filter category
            /**********************************/
            /**********************************/
            const filter = button.getAttribute('data-filter');

            // Filter portfolio items
            /**********************************/
            /**********************************/
            portfolioItems.forEach(item => {
                // Show all items if 'all' is selected, otherwise match the category
                /**********************************/
                /**********************************/
                const isVisible = filter === 'all' || item.getAttribute('data-category') === filter;

                item.style.display = isVisible ? 'block' : 'none';

                if (isVisible) {
                    // Add a slight fade-in animation
                    /**********************************/
                    /**********************************/
                    item.style.opacity = '0';
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                    });
                }
            });
        });
    });

    // Project Hover Effects
    /**********************************/
    /**********************************/
    portfolioItems.forEach(item => {
        const overlay = item.querySelector('.portfolio-overlay');

        if (overlay) {
            item.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
            });

            item.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            });
        }
    });

    // Smooth Scroll to Contact CTA
    /**********************************/
    /**********************************/
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSectionId = ctaButton.getAttribute('href');
            const contactSection = contactSectionId ? document.querySelector(contactSectionId) : null;

            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.warn('Contact section not found');
            }
        });
    }
});