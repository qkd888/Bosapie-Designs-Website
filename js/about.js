document.addEventListener('DOMContentLoaded', () => {
    // Stat Counter Animation
    /***********************/
    /***********************/
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element, start = 0, end, duration = 2000) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const value = parseInt(stat.dataset.finalValue || stat.textContent);
                    animateCounter(stat, 0, value);
                });
                observer.disconnect();
            }
        });
    }, observerOptions);

    // Team Member Hover Effects
    /***********************/
    /***********************/
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach(member => {
        const overlay = member.querySelector('.member-overlay');

        member.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            member.style.transform = 'scale(1.05)';
        });

        member.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            member.style.transform = 'scale(1)';
        });
    });

    // Testimonial Carousel
    /***********************/
    /***********************/
    class TestimonialCarousel {
        constructor(containerSelector) {
            this.container = document.querySelector(containerSelector);
            this.testimonials = this.container.querySelectorAll('.testimonial-card');
            this.currentIndex = 0;
            this.autoSlideInterval = null;

            this.init();
        }

        init() {
            // Only activate carousel if more than one testimonial
            /***********************/
            /***********************/
            if (this.testimonials.length > 1) {
                this.showTestimonial(this.currentIndex);
                this.startAutoSlide();
            }
        }

        showTestimonial(index) {
            this.testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }

        nextTestimonial() {
            this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
            this.showTestimonial(this.currentIndex);
        }

        startAutoSlide() {
            this.autoSlideInterval = setInterval(() => {
                this.nextTestimonial();
            }, 5000);
        }

        stopAutoSlide() {
            clearInterval(this.autoSlideInterval);
        }
    }

    // Values Card Interaction
    /***********************/
    /***********************/
    const valueCards = document.querySelectorAll('.value-card');

    valueCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            card.querySelector('svg').style.stroke = '#2c2c2c';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
            card.querySelector('svg').style.stroke = '#FF3366';
        });
    });

    // Parallax Effect for Section Background
    /***********************/
    /***********************/
    const parallaxSection = document.querySelector('.section-about');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        parallaxSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // CTA Button Interaction
    /***********************/
    /***********************/
    const ctaButton = document.querySelector('.cta-button');

    ctaButton.addEventListener('click', () => {
        // Example interaction - could be replaced with actual contact form or modal
        /***********************/
        /***********************/
        ctaButton.textContent = 'Sending...';
        setTimeout(() => {
            ctaButton.textContent = 'Message Sent!';
            ctaButton.style.backgroundColor = '#4CAF50';
        }, 1500);
    });

    // Observers
    /***********************/
    /***********************/
    if (statNumbers.length) {
        statsObserver.observe(statNumbers[0]);
    }

    // Create Testimonial Carousel
    /***********************/
    /***********************/
    const testimonialCarousel = new TestimonialCarousel('.testimonial-grid');
});

// Add mouse move effect
/***********************/
/***********************/
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    overlay.style.background = `radial-gradient(
      circle at ${mouseX * 100}% ${mouseY * 100}%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.16) 30%,
      transparent 70%
  )`;
});