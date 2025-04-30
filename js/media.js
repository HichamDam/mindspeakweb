/**
 * MindSpeak - Media Page Scripts
 * Version: 1.0.0
 * Author: MindSpeak Team
 */

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initGallery();
    initVideoControls();
});

/**
 * Initialize Tabs Functionality
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (!tabButtons.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the tab to activate
            const tabToActivate = this.dataset.tab;
            
            // Get the parent tab container
            const tabContainer = this.closest('.tabs');
            
            if (!tabContainer) return;
            
            // Remove active class from all buttons
            tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab panes
            tabContainer.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the selected tab pane
            document.getElementById(tabToActivate + '-tab').classList.add('active');
        });
    });
}

/**
 * Initialize Gallery Functionality
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) return;
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        
    `;
    
    document.body.appendChild(modal);
    
    // Get modal elements
    const modalContent = modal.querySelector('.gallery-modal-content');
    const modalClose = modal.querySelector('.gallery-modal-close');
    const modalImage = modal.querySelector('.gallery-modal-image');
    const modalCaption = modal.querySelector('.gallery-modal-caption');
    const modalPrev = modal.querySelector('.gallery-modal-prev');
    const modalNext = modal.querySelector('.gallery-modal-next');
    
    let currentIndex = 0;
    
    // Open modal when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            openModal(this);
        });
    });
    
    // Close modal when close button is clicked
    modalClose.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicked outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Navigate to previous image
    modalPrev.addEventListener('click', function() {
        navigateGallery(-1);
    });
    
    // Navigate to next image
    modalNext.addEventListener('click', function() {
        navigateGallery(1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                navigateGallery(-1);
                break;
            case 'ArrowRight':
                navigateGallery(1);
                break;
        }
    });
    
    // Open modal with gallery item
    function openModal(item) {
        const image = item.querySelector('.gallery-image');
        const overlay = item.querySelector('.gallery-overlay');
        
        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalCaption.innerHTML = `
            <h3>${overlay.querySelector('h3').textContent}</h3>
            <p>${overlay.querySelector('p').textContent}</p>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Update navigation buttons visibility
        updateNavigationButtons();
    }
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Navigate to previous/next image
    function navigateGallery(direction) {
        // Update current index
        currentIndex += direction;
        
        // Loop back to the end if we go past the beginning
        if (currentIndex < 0) {
            currentIndex = galleryItems.length - 1;
        }
        // Loop back to the beginning if we go past the end
        if (currentIndex >= galleryItems.length) {
            currentIndex = 0;
        }
        
        // Update modal content
        const item = galleryItems[currentIndex];
        const image = item.querySelector('.gallery-image');
        const overlay = item.querySelector('.gallery-overlay');
        
        // Create transition effect
        modalContent.classList.add('transitioning');
        
        setTimeout(() => {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modalCaption.innerHTML = `
                <h3>${overlay.querySelector('h3').textContent}</h3>
                <p>${overlay.querySelector('p').textContent}</p>
            `;
            
            // Update navigation buttons visibility
            updateNavigationButtons();
            
            // Remove transition class
            modalContent.classList.remove('transitioning');
        }, 300);
    }
    
    // Update navigation buttons visibility
    function updateNavigationButtons() {
        // Hide prev button if at first image
        modalPrev.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        
        // Hide next button if at last image
        modalNext.style.visibility = currentIndex === galleryItems.length - 1 ? 'hidden' : 'visible';
    }
}

/**
 * Initialize Video Controls
 */
function initVideoControls() {
    const videoFrame = document.getElementById('promo-video-iframe');
    const quickPreviewBtn = document.getElementById('quick-preview');
    
    if (!videoFrame || !quickPreviewBtn) return;
    
    // Original video URL
    const originalUrl = videoFrame.src;
    
    // Quick preview functionality
    quickPreviewBtn.addEventListener('click', function() {
        // Change button text to indicate loading
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregant...';
        this.disabled = true;
        
        // Extract video ID and create new URL with start and end parameters
        const videoId = extractVideoId(originalUrl);
        if (!videoId) return;
        
        // Create URL for 30-second preview
        const previewUrl = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&start=0&end=30`;
        
        // Update iframe source
        videoFrame.src = previewUrl;
        
        // Reset button after 31 seconds (30 seconds preview + 1 second buffer)
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-bolt"></i> Previsualització Ràpida (30s)';
            this.disabled = false;
            
            // Restore original URL
            videoFrame.src = originalUrl;
        }, 31000);
    });
}

/**
 * Extract the video ID from a YouTube URL
 * @param {string} url - The YouTube URL
 * @returns {string|null} - The extracted video ID or null if not found
 */
function extractVideoId(url) {
    const videoIdRegex = /v=([^&]+)/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
}