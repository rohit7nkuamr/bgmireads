// Map switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const mapButtons = document.querySelectorAll('.map-btn');
    const mapContents = document.querySelectorAll('.map-content');
    
    // Add click event listeners to map buttons
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetMap = this.getAttribute('data-map');
            
            // Remove active class from all buttons and contents
            mapButtons.forEach(btn => btn.classList.remove('active'));
            mapContents.forEach(content => content.classList.add('hidden'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(targetMap);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                
                // Add fade-in animation
                targetContent.style.animation = 'none';
                setTimeout(() => {
                    targetContent.style.animation = 'fadeIn 0.5s ease-in-out';
                }, 10);
            }
        });
    });
    
    // Meta toggle functionality (Current Meta vs BGIS 2026 Upcoming)
    function initMetaToggle() {
        document.querySelectorAll('.meta-toggle').forEach(toggle => {
            const buttons = toggle.querySelectorAll('.meta-btn');
            const section = toggle.closest('.map-content');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const metaType = this.getAttribute('data-meta');
                    
                    // Update button states
                    buttons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Toggle timeline visibility
                    const currentMeta = section.querySelector('.meta-current');
                    const upcomingMeta = section.querySelector('.meta-upcoming');
                    
                    if (metaType === 'current') {
                        currentMeta.classList.remove('hidden');
                        upcomingMeta.classList.add('hidden');
                    } else {
                        currentMeta.classList.add('hidden');
                        upcomingMeta.classList.remove('hidden');
                    }
                    
                    // Add animation
                    const visibleMeta = metaType === 'current' ? currentMeta : upcomingMeta;
                    visibleMeta.style.animation = 'none';
                    setTimeout(() => {
                        visibleMeta.style.animation = 'fadeIn 0.3s ease-in-out';
                    }, 10);
                });
            });
        });
    }
    
    initMetaToggle();
    
    // Zone Circle Visualization functionality
    function initZoneCircleVisualization() {
        // Phase selector functionality
        document.querySelectorAll('.phase-select').forEach(select => {
            select.addEventListener('change', function() {
                const selectedPhase = this.value;
                const mapSection = this.closest('.interactive-map-section');
                const circles = mapSection.querySelectorAll('.zone-circle');
                
                circles.forEach(circle => {
                    const phase = circle.getAttribute('data-phase');
                    if (selectedPhase === 'all') {
                        circle.classList.remove('hidden');
                        circle.classList.remove('highlighted');
                    } else if (phase === selectedPhase) {
                        circle.classList.remove('hidden');
                        circle.classList.add('highlighted');
                    } else {
                        circle.classList.add('hidden');
                        circle.classList.remove('highlighted');
                    }
                });
            });
        });
        
        // Circle toggle buttons (Current vs Upcoming)
        document.querySelectorAll('.zone-circle-toggle').forEach(toggle => {
            const buttons = toggle.querySelectorAll('.circle-btn');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const metaType = this.getAttribute('data-circle-meta');
                    
                    // Update button states
                    buttons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // For now, both metas use same circle sizes (radius doesn't change)
                    // This visual toggle shows which meta is selected
                    const mapSection = this.closest('.interactive-map-section');
                    const mapNote = mapSection.querySelector('.map-note');
                    
                    if (metaType === 'current') {
                        mapNote.innerHTML = 'Current Meta (BGIS 2025) | Circles show zone radius at center';
                    } else {
                        mapNote.innerHTML = 'BGIS 2026 (Upcoming) | Zone radius same - timing differs';
                    }
                });
            });
        });
    }
    
    initZoneCircleVisualization();
    
    // Add hover effects to zone cards
    const zoneCards = document.querySelectorAll('.zone-card');
    zoneCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add interactive features for strategy tips
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle highlight effect
            this.style.borderColor = this.style.borderColor === 'var(--primary-color)' 
                ? 'rgba(0, 212, 255, 0.2)' 
                : 'var(--primary-color)';
        });
    });
    
    // Smooth scroll for internal navigation
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
    
    // Add countdown timer for zone phases (dynamic feature)
    function updateZoneTimers() {
        const timeElements = document.querySelectorAll('.zone-time');
        timeElements.forEach(element => {
            const timeText = element.textContent;
            // This could be expanded to show real-time countdowns
            // For now, it's a placeholder for future enhancements
        });
    }
    
    // Update timers every second
    setInterval(updateZoneTimers, 1000);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '3') {
            const mapIndex = parseInt(e.key) - 1;
            const buttons = document.querySelectorAll('.map-btn');
            if (buttons[mapIndex]) {
                buttons[mapIndex].click();
            }
        }
    });
    
    // Add dynamic zone radius visualization
    function createZoneVisualization() {
        const zoneCards = document.querySelectorAll('.zone-card');
        zoneCards.forEach((card, index) => {
            const radiusElement = card.querySelector('.zone-radius');
            if (radiusElement) {
                const radiusText = radiusElement.textContent;
                const radiusMatch = radiusText.match(/(\d+)m/);
                if (radiusMatch) {
                    const radius = parseInt(radiusMatch[1]);
                    const maxRadius = 4160; // Maximum zone radius
                    const percentage = (radius / maxRadius) * 100;
                    
                    // Create visual indicator
                    const indicator = document.createElement('div');
                    indicator.className = 'zone-indicator';
                    indicator.style.cssText = `
                        position: absolute;
                        bottom: 10px;
                        right: 10px;
                        width: 40px;
                        height: 40px;
                        border: 2px solid var(--secondary-color);
                        border-radius: 50%;
                        background: radial-gradient(circle, 
                            rgba(0, 212, 255, ${percentage/100}) 0%, 
                            transparent 70%);
                    `;
                    card.style.position = 'relative';
                    card.appendChild(indicator);
                }
            }
        });
    }
    
    // Initialize zone visualization
    createZoneVisualization();
    
    // Add search functionality for strategies
    function addSearchFeature() {
        const searchHTML = `
            <div class="search-container" style="margin: 20px 0; text-align: center;">
                <input type="text" id="strategySearch" placeholder="Search strategies..." 
                    style="padding: 10px 20px; border-radius: 25px; border: 1px solid var(--primary-color); 
                    background: var(--card-bg); color: var(--text-primary); width: 300px; max-width: 90%;">
            </div>
        `;
        
        const metaSection = document.querySelector('.meta-analysis');
        if (metaSection) {
            metaSection.insertAdjacentHTML('beforebegin', searchHTML);
            
            const searchInput = document.getElementById('strategySearch');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const allCards = document.querySelectorAll('.zone-card, .tip-card');
                
                allCards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.3s ease-in-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }
    
    // Initialize search feature
    addSearchFeature();
    
    // Add export/print functionality
    function addExportFeature() {
        const exportHTML = `
            <div class="export-container" style="margin: 20px 0; text-align: center;">
                <button id="exportBtn" style="padding: 10px 20px; border-radius: var(--border-radius); 
                    border: 1px solid var(--success-color); background: var(--success-color); 
                    color: var(--dark-bg); font-weight: 600; cursor: pointer;">
                    <i class="fas fa-download"></i> Export Strategy Guide
                </button>
            </div>
        `;
        
        const hero = document.querySelector('.hero .container');
        if (hero) {
            hero.insertAdjacentHTML('beforeend', exportHTML);
            
            document.getElementById('exportBtn').addEventListener('click', function() {
                window.print();
            });
        }
    }
    
    // Initialize export feature
    addExportFeature();
    
    // Add notification system for updates
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
            color: var(--dark-bg);
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add CSS for notification animations
    const notificationStyles = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to BGMI Zone Strategy Hub!', 'success');
    }, 1000);
    
    // Add analytics tracking (placeholder)
    function trackUserInteraction(action, element) {
        console.log(`User interaction: ${action} on ${element}`);
        // This could be integrated with actual analytics service
    }
    
    // Track map switches
    mapButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackUserInteraction('map_switch', this.getAttribute('data-map'));
        });
    });
    
    // Track card clicks
    document.querySelectorAll('.zone-card, .tip-card').forEach(card => {
        card.addEventListener('click', function() {
            trackUserInteraction('card_click', this.className);
        });
    });
    
    // Add dark mode toggle (though the site is already dark)
    function addThemeToggle() {
        const themeHTML = `
            <button id="themeToggle" style="position: fixed; bottom: 20px; right: 20px; 
                width: 50px; height: 50px; border-radius: 50%; border: 1px solid var(--primary-color); 
                background: var(--card-bg); color: var(--primary-color); font-size: 1.2rem; 
                cursor: pointer; z-index: 999;">
                <i class="fas fa-moon"></i>
            </button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', themeHTML);
        
        document.getElementById('themeToggle').addEventListener('click', function() {
            // This is a placeholder for theme switching functionality
            showNotification('Theme switching coming soon!', 'info');
        });
    }
    
    // Initialize theme toggle
    addThemeToggle();
    
    console.log('BGMI Zone Strategy Hub initialized successfully!');
});
