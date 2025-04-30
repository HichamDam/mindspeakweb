/**
 * MindSpeak - Team Page JavaScript File
 * Version: 1.0.0
 * Author: MindSpeak Team
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize team page specific components
    initTeamCards();
    initTeamRolesTable();
    initLearningItems();
});

/**
 * Initialize the team card interactions
 * Makes the cards flip on hover/click for mobile and desktop
 */
function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    if (teamCards.length > 0) {
        // Check if we're on a touch device
        const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;
        
        teamCards.forEach(card => {
            const cardInner = card.querySelector('.team-card-inner');
            
            if (isTouchDevice) {
                // For touch devices, flip on click
                card.addEventListener('click', function() {
                    cardInner.classList.toggle('flipped');
                });
            } else {
                // For non-touch devices, flip on hover
                card.addEventListener('mouseenter', function() {
                    cardInner.classList.add('flipped');
                });
                
                card.addEventListener('mouseleave', function() {
                    cardInner.classList.remove('flipped');
                });
            }
            
            // Add keyboard accessibility
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    cardInner.classList.toggle('flipped');
                }
            });
            
            // Make cards focusable
            card.setAttribute('tabindex', '0');
        });
    }
}

/**
 * Initialize interactive team roles table
 * Adds sorting, filtering, and responsive adjustments
 */
function initTeamRolesTable() {
    const rolesTable = document.querySelector('.roles-table table');
    
    if (rolesTable) {
        const tableHeaders = rolesTable.querySelectorAll('thead th');
        const tableRows = Array.from(rolesTable.querySelectorAll('tbody tr'));
        
        // Make table headers clickable for sorting
        tableHeaders.forEach((header, index) => {
            header.setAttribute('tabindex', '0');
            header.style.cursor = 'pointer';
            header.setAttribute('data-sort-direction', 'none');
            
            // Add sorting arrows
            const sortIndicator = document.createElement('span');
            sortIndicator.className = 'sort-indicator';
            sortIndicator.innerHTML = ' <i class="fas fa-sort"></i>';
            header.appendChild(sortIndicator);
            
            // Add click event for sorting
            header.addEventListener('click', function() {
                // Get current sort direction
                const currentDirection = this.getAttribute('data-sort-direction');
                let newDirection = 'asc';
                
                // Toggle sort direction
                if (currentDirection === 'asc') {
                    newDirection = 'desc';
                } else if (currentDirection === 'desc') {
                    newDirection = 'none';
                }
                
                // Reset all headers
                tableHeaders.forEach(h => {
                    h.setAttribute('data-sort-direction', 'none');
                    h.querySelector('.sort-indicator').innerHTML = ' <i class="fas fa-sort"></i>';
                });
                
                // Update current header
                this.setAttribute('data-sort-direction', newDirection);
                
                // Update sort indicator
                if (newDirection === 'asc') {
                    this.querySelector('.sort-indicator').innerHTML = ' <i class="fas fa-sort-up"></i>';
                } else if (newDirection === 'desc') {
                    this.querySelector('.sort-indicator').innerHTML = ' <i class="fas fa-sort-down"></i>';
                }
                
                // Sort the table
                if (newDirection !== 'none') {
                    sortTable(index, newDirection);
                } else {
                    // Reset to original order
                    resetTableOrder();
                }
            });
        });
        
        // Function to sort the table
        function sortTable(columnIndex, direction) {
            const sortedRows = tableRows.sort((a, b) => {
                const aValue = a.children[columnIndex].textContent.trim();
                const bValue = b.children[columnIndex].textContent.trim();
                
                // Check if values are numbers
                const aNum = parseFloat(aValue);
                const bNum = parseFloat(bValue);
                
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return direction === 'asc' ? aNum - bNum : bNum - aNum;
                }
                
                // Sort as strings
                return direction === 'asc' 
                    ? aValue.localeCompare(bValue, undefined, { sensitivity: 'base' })
                    : bValue.localeCompare(aValue, undefined, { sensitivity: 'base' });
            });
            
            // Update the DOM
            const tbody = rolesTable.querySelector('tbody');
            sortedRows.forEach(row => tbody.appendChild(row));
        }
        
        // Function to reset table to original order
        function resetTableOrder() {
            const tbody = rolesTable.querySelector('tbody');
            tableRows.forEach(row => tbody.appendChild(row));
        }
        
        // Add responsive table behavior
        makeTableResponsive(rolesTable);
    }
}

/**
 * Make tables responsive on small screens
 * @param {HTMLElement} table - The table element to make responsive
 */
function makeTableResponsive(table) {
    // Get all headers
    const headers = Array.from(table.querySelectorAll('thead th')).map(
        header => header.textContent.trim()
    );
    
    // Add data attributes to each cell with its header
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
            if (headers[index]) {
                cell.setAttribute('data-label', headers[index]);
            }
        });
    });
}

/**
 * Initialize learning items with animation and interaction
 */
function initLearningItems() {
    const learningItems = document.querySelectorAll('.learning-item');
    
    if (learningItems.length > 0) {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const learningObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Staggered animation with delay based on index
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, index * 200);
                        
                        // Unobserve after animation is triggered
                        learningObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            learningItems.forEach(item => {
                learningObserver.observe(item);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            learningItems.forEach(item => {
                item.classList.add('animate');
            });
        }
        
        // Add hover effect
        learningItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('hover');
            });
            
            item.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
            });
        });
    }
}

/**
 * Handle tutor message animations
 */
document.addEventListener('DOMContentLoaded', function() {
    const tutorsMessage = document.querySelector('.tutors-message');
    
    if (tutorsMessage) {
        // Add animation when scrolled into view
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    tutorsMessage.classList.add('animate');
                    observer.unobserve(tutorsMessage);
                }
            }, { threshold: 0.3 });
            
            observer.observe(tutorsMessage);
        } else {
            // Fallback
            tutorsMessage.classList.add('animate');
        }
    }
});