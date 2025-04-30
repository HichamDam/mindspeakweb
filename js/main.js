/**
 * MindSpeak - Main JavaScript File
 * Version: 1.0.0
 * Author: MindSpeak Team
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all the components
    initMobileMenu();
    initStickyHeader();
    initAnimations();
    initAccessibility();
    
    // Initialize page specific scripts if their init functions exist
    if (typeof initContactForm === 'function') initContactForm();
    if (typeof initFaqs === 'function') initFaqs();
    if (typeof initGallery === 'function') initGallery();
    if (typeof initTabs === 'function') initTabs();
    if (typeof initTeamCards === 'function') initTeamCards();
    if (typeof initVideoControls === 'function') initVideoControls();
    if (typeof initCharts === 'function') initCharts();
});

/**
 * Initialize Mobile Menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (!menuToggle || !mainMenu) return;
    
    menuToggle.addEventListener('click', function() {
        mainMenu.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = this.querySelector('i');
        if (mainMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mainMenu.contains(event.target) && !menuToggle.contains(event.target) && mainMenu.classList.contains('active')) {
            mainMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when window is resized
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainMenu.classList.contains('active')) {
            mainMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

/**
 * Initialize Sticky Header
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    const sticky = header.offsetTop;
    
    function handleScroll() {
        if (window.pageYOffset > sticky + 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
}

/**
 * Initialize Animations using Intersection Observer
 */
function initAnimations() {
    // Elements to animate when they enter viewport
    const animatedElements = document.querySelectorAll('.feature, .hero-image, .about-text, .download-content, .download-image');
    
    if (!animatedElements.length) return;
    
    // Create the observer options
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px', // margin around root
        threshold: 0.1 // visible amount of item shown in relation to root
    };
    
    // Create the observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Stop observing the element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize Accessibility Enhancements
 */
function initAccessibility() {
    // Add skip link if it doesn't exist
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // Ensure all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    interactiveElements.forEach(element => {
        // Ensure buttons have type attribute
        if (element.tagName === 'BUTTON' && !element.getAttribute('type')) {
            element.setAttribute('type', 'button');
        }
        
        // Ensure all links have readable text
        if (element.tagName === 'A' && !element.textContent.trim() && !element.getAttribute('aria-label')) {
            const ariaLabel = element.querySelector('img') 
                ? element.querySelector('img').getAttribute('alt') 
                : 'Link';
            element.setAttribute('aria-label', ariaLabel);
        }
    });
    
    // Add aria-current to active navigation links
    const activeLinks = document.querySelectorAll('.main-menu a.active');
    activeLinks.forEach(link => {
        link.setAttribute('aria-current', 'page');
    });
}

/**
 * Utility function to smoothly scroll to an element
 * @param {string} elementId - The ID of the element to scroll to
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    
    if (!element) return;
    
    window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
    });
}

/**
 * Utility function to format date
 * @param {Date} date - The date to format
 * @param {string} format - The format string (default: 'dd/mm/yyyy')
 * @returns {string} - The formatted date string
 */
function formatDate(date, format = 'dd/mm/yyyy') {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return format
        .replace('dd', day)
        .replace('mm', month)
        .replace('yyyy', year);
}

/**
 * Utility function to validate email address
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Utility function to add event listeners with debounce
 * @param {Element} element - DOM element to attach listener to
 * @param {string} eventType - Type of event (e.g., 'click', 'resize')
 * @param {Function} callback - Function to call on event
 * @param {number} delay - Debounce delay in milliseconds
 */
function addDebouncedEventListener(element, eventType, callback, delay = 250) {
    let timeout;
    
    element.addEventListener(eventType, function(e) {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(e), delay);
    });
}