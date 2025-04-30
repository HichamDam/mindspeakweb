/**
 * MindSpeak - Contact Page Scripts
 * Version: 1.0.0
 * Author: MindSpeak Team
 */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFaqs();
    initMapInteraction();
});

/**
 * Initialize Contact Form Validation and Submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error messages
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
        
        // Get form fields
        const nameField = contactForm.querySelector('#name');
        const emailField = contactForm.querySelector('#email');
        const subjectField = contactForm.querySelector('#subject');
        const messageField = contactForm.querySelector('#message');
        const privacyCheckbox = contactForm.querySelector('#privacy');
        
        let isValid = true;
        
        // Validate name (required)
        if (!nameField.value.trim()) {
            displayError(nameField, 'Si us plau, introdueix el teu nom');
            isValid = false;
        }
        
        // Validate email (required and format)
        if (!emailField.value.trim()) {
            displayError(emailField, 'Si us plau, introdueix el teu correu electrònic');
            isValid = false;
        } else if (!isValidEmail(emailField.value.trim())) {
            displayError(emailField, 'Si us plau, introdueix un correu electrònic vàlid');
            isValid = false;
        }
        
        // Validate subject (required)
        if (subjectField.value === '') {
            displayError(subjectField, 'Si us plau, selecciona un assumpte');
            isValid = false;
        }
        
        // Validate message (required and minimum length)
        if (!messageField.value.trim()) {
            displayError(messageField, 'Si us plau, introdueix el teu missatge');
            isValid = false;
        } else if (messageField.value.trim().length < 10) {
            displayError(messageField, 'El missatge ha de tenir almenys 10 caràcters');
            isValid = false;
        }
        
        // Validate privacy policy (must be checked)
        if (!privacyCheckbox.checked) {
            displayError(privacyCheckbox, 'Has d\'acceptar la política de privacitat');
            isValid = false;
        }
        
        // If form is valid, simulate submission
        if (isValid) {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviant...';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Show success message
                contactForm.reset();
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Missatge enviat amb èxit!</h3>
                    <p>Gràcies per contactar amb nosaltres. Ens posarem en contacte amb tu tan aviat com sigui possible.</p>
                `;
                
                // Insert success message
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                contactForm.style.display = 'none';
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // After 5 seconds, show the form again
                setTimeout(() => {
                    successMessage.classList.add('fade-out');
                    
                    // After animation, remove success message and show form
                    setTimeout(() => {
                        successMessage.remove();
                        contactForm.style.display = 'block';
                    }, 500);
                }, 5000);
            }, 2000);
        }
    });
    
    // Function to display error messages
    function displayError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (field.type === 'checkbox') {
            // For checkboxes, insert after the label
            const label = field.nextElementSibling;
            label.parentNode.insertBefore(errorElement, label.nextSibling);
        } else {
            // For other inputs, insert after the field
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        // Add error class to field
        field.classList.add('error');
        
        // Remove error class when field value changes
        field.addEventListener('input', function() {
            this.classList.remove('error');
            if (errorElement.parentNode) {
                errorElement.remove();
            }
        });
    }
}

/**
 * Initialize FAQ Accordion
 */
function initFaqs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        // Initially hide all answers except the first one
        if (item !== faqItems[0]) {
            answer.style.maxHeight = '0';
            answer.style.opacity = '0';
        } else {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.opacity = '1';
            toggle.innerHTML = '<i class="fas fa-minus"></i>';
        }
        
        question.addEventListener('click', function() {
            // Toggle active class
            item.classList.toggle('active');
            
            // If the item is active, expand the answer
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                toggle.innerHTML = '<i class="fas fa-minus"></i>';
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                toggle.innerHTML = '<i class="fas fa-plus"></i>';
            }
            
            // Close other FAQs when one is opened
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                    otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
                }
            });
        });
    });
}

/**
 * Initialize Map Interaction
 */
/**
 * Initialize Map Interaction
 */
function initMapInteraction() {
    const map = document.querySelector('.map-container iframe');
    
    if (!map) return;
    
    // Add placeholder before map loads
    const mapContainer = map.parentNode;
    
    // Get current language for placeholder text
    const currentLanguage = getCurrentLanguage();
    const placeholderText = getMapPlaceholderText(currentLanguage);
    
    // Create placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'map-placeholder';
    placeholder.innerHTML = `
        <div class="map-placeholder-content">
            <i class="fas fa-map-marker-alt"></i>
            <p>${placeholderText}</p>
        </div>
    `;
    
    // Hide map and show placeholder
    map.style.display = 'none';
    mapContainer.appendChild(placeholder);
    
    // Load map when placeholder is clicked
    placeholder.addEventListener('click', function() {
        map.style.display = 'block';
        placeholder.remove();
    });
}

/**
 * Get current language from URL or HTML lang attribute
 * @returns {string} - Current language code (ca, es, en)
 */
function getCurrentLanguage() {
    // First check URL path
    const path = window.location.pathname;
    if (path.includes('/en/')) return 'en';
    if (path.includes('/es/')) return 'es';
    
    // Then check HTML lang attribute
    const htmlLang = document.documentElement.lang.toLowerCase();
    if (htmlLang === 'en') return 'en';
    if (htmlLang === 'es') return 'es';
    
    // Default to Catalan
    return 'ca';
}

/**
 * Get map placeholder text based on language
 * @param {string} language - Language code (ca, es, en)
 * @returns {string} - Map placeholder text
 */
function getMapPlaceholderText(language) {
    const texts = {
        'ca': 'Clica per carregar el mapa',
        'es': 'Haz clic para cargar el mapa',
        'en': 'Click to load the map'
    };
    
    return texts[language] || texts['ca']; // Default to Catalan if language not found
}


/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}