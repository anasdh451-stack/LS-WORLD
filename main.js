// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Scroll indicator functionality
const scrollIndicator = document.querySelector('.discover-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Gallery Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateCarousel(slideIndex) {
    // Ensure valid slide index
    if (slideIndex < 0) slideIndex = slides.length - 1;
    if (slideIndex >= slides.length) slideIndex = 0;
    
    // Remove active class from all elements
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
    
    // Add active class to current elements
    if (slides[slideIndex]) slides[slideIndex].classList.add('active');
    if (indicators[slideIndex]) indicators[slideIndex].classList.add('active');
    if (thumbnails[slideIndex]) thumbnails[slideIndex].classList.add('active');
    
    currentSlide = slideIndex;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    updateCarousel(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel(prevIndex);
}

// Event listeners for carousel buttons
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextSlide();
    });

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        prevSlide();
    });
}

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
        e.preventDefault();
        updateCarousel(index);
    });
});

// Event listeners for thumbnails
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', (e) => {
        e.preventDefault();
        updateCarousel(index);
    });
});

// Auto-play carousel
let autoPlayInterval;

function startAutoPlay() {
    if (slides.length > 1) {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Start autoplay when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        updateCarousel(0); // Initialize first slide
        startAutoPlay();
    }
});

// Pause auto-play on hover
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
    
    // Touch support for mobile
    let startX = 0;
    let endX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoPlay();
    });
    
    carouselContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });
    
    carouselContainer.addEventListener('touchend', () => {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
        
        startAutoPlay();
    });
}

// Feature cards intersection observer for staggered animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize feature cards animation
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('.newsletter-input').value;
        
        if (email && email.includes('@')) {
            // Show success message (you can customize this)
            const btn = this.querySelector('.newsletter-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribed!';
            btn.style.background = '#28a745';
            
            // Reset after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                this.reset();
            }, 3000);
        } else {
            // Show error message
            const input = this.querySelector('.newsletter-input');
            input.style.borderColor = '#dc3545';
            input.placeholder = 'Please enter a valid email';
            
            setTimeout(() => {
                input.style.borderColor = '';
                input.placeholder = 'Enter your email...';
            }, 3000);
        }
    });
}

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Add smooth scroll behavior for all internal links
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all animations are reset on page load
    const animatedElements = document.querySelectorAll('.feature-card, .hero-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });
    
    // Trigger hero animation
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 100);
});