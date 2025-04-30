/**
 * MindSpeak - Functionality Page Scripts
 * Version: 1.0.0
 * Author: MindSpeak Team
 */

document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initCodeHighlight();
    initAnimations();
});

/**
 * Initialize Tab Functionality
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
            const targetPane = document.getElementById(tabToActivate + '-tab');
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

/**
 * Initialize Code Highlighting
 */
function initCodeHighlight() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    if (!codeBlocks.length) return;
    
    codeBlocks.forEach(block => {
        // Simple syntax highlighting for demonstration purposes
        const code = block.innerHTML;
        
        // Highlight keywords
        const keywords = ['fun', 'val', 'var', 'suspend', 'if', 'else', 'try', 'catch', 'return', 'class', 'import', 'await', 'const', 'let'];
        let highlightedCode = code;
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlightedCode = highlightedCode.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        // Highlight strings
        highlightedCode = highlightedCode.replace(/(["'])(.*?)\1/g, '<span class="string">$&</span>');
        
        // Highlight comments
        highlightedCode = highlightedCode.replace(/(\/\/.*)/g, '<span class="comment">$1</span>');
        
        // Highlight function calls
        highlightedCode = highlightedCode.replace(/(\w+)(\s*\()/g, '<span class="function">$1</span>$2');
        
        block.innerHTML = highlightedCode;
    });
}

/**
 * Initialize Feature List Animation
 */
function initAnimations() {
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (!featureCards.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 150);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    // Animate flow steps
    const flowSteps = document.querySelectorAll('.flow-step');
    
    if (!flowSteps.length) return;
    
    const flowObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    flowSteps.forEach(step => {
        flowObserver.observe(step);
    });
}