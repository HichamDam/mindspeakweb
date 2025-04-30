/**
 * MindSpeak - Business Model Page JavaScript File
 * Version: 1.0.0
 * Author: MindSpeak Team
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize business page specific components
    initCostCards();
    initGrowthChart();
    initMilestones();
});

/**
 * Initialize interactive cost cards
 * Add hover effects and highlight functionality
 */
function initCostCards() {
    const costCards = document.querySelectorAll('.cost-card, .ongoing-card');
    
    if (costCards.length > 0) {
        costCards.forEach(card => {
            // Add hover effect
            card.addEventListener('mouseenter', function() {
                this.classList.add('highlighted');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('highlighted');
            });
            
            // Add click to highlight functionality
            card.addEventListener('click', function() {
                // Remove highlight from all cards
                costCards.forEach(c => c.classList.remove('pinned'));
                
                // Add highlight to clicked card
                this.classList.add('pinned');
                
                // Scroll to ensure the card is visible
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });
    }
}

/**
 * Initialize growth chart using Chart.js
 * Displays projected user growth and revenue over 3 years
 */
function initGrowthChart() {
    const chartCanvas = document.getElementById('growthChart');
    
    if (chartCanvas && typeof Chart !== 'undefined') {
        const ctx = chartCanvas.getContext('2d');
        
        // Chart data
        const chartData = {
            labels: ['Inici', 'Any 1', 'Any 2', 'Any 3'],
            datasets: [
                {
                    label: 'Usuaris Actius',
                    data: [0, 500, 2000, 5000],
                    backgroundColor: 'rgba(79, 176, 255, 0.2)',
                    borderColor: 'rgba(79, 176, 255, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Ingressos (€)',
                    data: [0, 5000, 20000, 50000],
                    backgroundColor: 'rgba(142, 237, 199, 0.2)',
                    borderColor: 'rgba(142, 237, 199, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        };
        
        // Chart options
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: "'Open Sans', sans-serif",
                            size: 14
                        },
                        padding: 20
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(45, 45, 45, 0.9)',
                    titleFont: {
                        family: "'Montserrat', sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Open Sans', sans-serif",
                        size: 13
                    },
                    padding: 15,
                    cornerRadius: 5
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: "'Open Sans', sans-serif",
                            size: 12
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Usuaris Actius',
                        font: {
                            family: "'Montserrat', sans-serif",
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        font: {
                            family: "'Open Sans', sans-serif",
                            size: 12
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Ingressos (€)',
                        font: {
                            family: "'Montserrat', sans-serif",
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        font: {
                            family: "'Open Sans', sans-serif",
                            size: 12
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        };
        
        // Create chart
        new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    }
}

/**
 * Initialize milestone animations
 * Adds staggered reveal and highlight functionality
 */
function initMilestones() {
    const milestones = document.querySelectorAll('.milestone');
    
    if (milestones.length > 0) {
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const milestoneObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Staggered animation with delay based on index
                        setTimeout(() => {
                            entry.target.classList.add('revealed');
                        }, index * 300);
                        
                        // Unobserve after animation is triggered
                        milestoneObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            milestones.forEach(milestone => {
                milestoneObserver.observe(milestone);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            milestones.forEach(milestone => {
                milestone.classList.add('revealed');
            });
        }
        
        // Add click to focus functionality
        milestones.forEach(milestone => {
            milestone.addEventListener('click', function() {
                // Remove focus from all milestones
                milestones.forEach(m => m.classList.remove('focused'));
                
                // Add focus to clicked milestone
                this.classList.add('focused');
            });
        });
    }
}

/**
 * Handle revenue option clicks
 * Adds highlight effect and shows associated information
 */
document.addEventListener('DOMContentLoaded', function() {
    const revenueOptions = document.querySelectorAll('.revenue-option');
    
    if (revenueOptions.length > 0) {
        revenueOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                revenueOptions.forEach(o => o.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
            });
        });
    }
});