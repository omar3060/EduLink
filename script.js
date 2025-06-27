class EduLinkApp {
    constructor() {
        this.currentPage = 'grades';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupGradeCalculations();
        this.setupSearch();
        this.setupNotificationForm();
        this.setupQRGenerator();
        this.setupAnimations();
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const pages = document.querySelectorAll('.page');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = item.dataset.page;
                
                if (targetPage && targetPage !== this.currentPage) {
                    this.switchPage(targetPage);
                    this.updateActiveNavItem(item);
                }
            });
        });
    }

    switchPage(pageName) {
        // Hide current page
        const currentPageElement = document.getElementById(`${this.currentPage}-page`);
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
        }

        // Show new page
        const newPageElement = document.getElementById(`${pageName}-page`);
        if (newPageElement) {
            newPageElement.classList.add('active');
            this.currentPage = pageName;
        }
    }

    updateActiveNavItem(activeItem) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        activeItem.classList.add('active');
    }

    setupGradeCalculations() {
        const gradeInputs = document.querySelectorAll('.grade-input');
        
        gradeInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.calculateTotalGrade(e.target.closest('tr'));
            });
        });
    }

    calculateTotalGrade(row) {
        const inputs = row.querySelectorAll('.grade-input');
        const weights = [0.3, 0.4, 0.3]; // Midterm 30%, Final 40%, Assignments 30%
        let total = 0;

        inputs.forEach((input, index) => {
            const value = parseFloat(input.value) || 0;
            total += value * weights[index];
        });

        // Update total cell
        const totalCell = row.querySelector('.total-cell');
        if (totalCell) {
            totalCell.textContent = total.toFixed(1);
        }

        // Update grade badge
        const gradeBadge = row.querySelector('.grade-badge');
        if (gradeBadge) {
            const grade = this.calculateLetterGrade(total);
            gradeBadge.textContent = grade.letter;
            gradeBadge.className = `grade-badge ${grade.class}`;
        }
    }

    calculateLetterGrade(score) {
        if (score >= 90) return { letter: 'A', class: 'grade-a' };
        if (score >= 85) return { letter: 'A-', class: 'grade-a' };
        if (score >= 80) return { letter: 'B+', class: 'grade-b' };
        if (score >= 75) return { letter: 'B', class: 'grade-b' };
        if (score >= 70) return { letter: 'B-', class: 'grade-b' };
        if (score >= 65) return { letter: 'C+', class: 'grade-c' };
        if (score >= 60) return { letter: 'C', class: 'grade-c' };
        return { letter: 'F', class: 'grade-f' };
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterStudents(e.target.value);
            });
        }
    }

    filterStudents(searchTerm) {
        const studentCards = document.querySelectorAll('.student-card');
        const term = searchTerm.toLowerCase().trim();

        studentCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const id = card.querySelector('p').textContent.toLowerCase();
            
            if (name.includes(term) || id.includes(term)) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    setupNotificationForm() {
        const notificationForm = document.querySelector('.notification-form');
        if (notificationForm) {
            const sendButton = notificationForm.querySelector('.btn-primary');
            if (sendButton) {
                sendButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.sendNotification();
                });
            }
        }
    }

    sendNotification() {
        const title = document.getElementById('notification-title').value;
        const message = document.getElementById('notification-message').value;
        const type = document.getElementById('notification-type').value;
        const recipients = document.getElementById('notification-recipients').value;

        if (!title || !message) {
            this.showAlert('Please fill in all required fields', 'error');
            return;
        }

        // Simulate sending notification
        this.showAlert('Notification sent successfully!', 'success');
        
        // Add to recent notifications
        this.addRecentNotification(title, message);
        
        // Clear form
        document.getElementById('notification-title').value = '';
        document.getElementById('notification-message').value = '';
    }

    addRecentNotification(title, message) {
        const recentNotifications = document.querySelector('.recent-notifications');
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item';
        notificationItem.innerHTML = `
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
                <span class="notification-date">Just now</span>
            </div>
            <span class="notification-status sent">Sent</span>
        `;
        
        // Insert at the beginning
        const firstItem = recentNotifications.querySelector('.notification-item');
        if (firstItem) {
            firstItem.parentNode.insertBefore(notificationItem, firstItem);
        } else {
            recentNotifications.appendChild(notificationItem);
        }
    }

    setupQRGenerator() {
        const generateQRButton = document.querySelector('.qr-actions .btn-primary');
        if (generateQRButton) {
            generateQRButton.addEventListener('click', () => {
                this.generateQRCode();
            });
        }
    }

    generateQRCode() {
        const qrPlaceholder = document.querySelector('.qr-placeholder');
        if (qrPlaceholder) {
            // Simulate QR code generation
            qrPlaceholder.innerHTML = `
                <div style="background: #000; color: #fff; padding: 2rem; border-radius: 8px; font-family: monospace;">
                    <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 2px;">
                        ${'█'.repeat(64)}
                    </div>
                    <p style="margin-top: 1rem; font-size: 0.75rem;">QR Code Generated</p>
                </div>
            `;
            
            this.showAlert('New QR code generated successfully!', 'success');
        }
    }

    setupAnimations() {
        // Add hover animations to cards
        const cards = document.querySelectorAll('.stat-card, .course-card, .component-card, .student-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Add loading animation to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (!button.classList.contains('loading')) {
                    this.addLoadingState(button);
                    setTimeout(() => {
                        this.removeLoadingState(button);
                    }, 1000);
                }
            });
        });
    }

    addLoadingState(button) {
        button.classList.add('loading');
        const originalText = button.innerHTML;
        button.dataset.originalText = originalText;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;
    }

    removeLoadingState(button) {
        button.classList.remove('loading');
        button.innerHTML = button.dataset.originalText;
        button.disabled = false;
    }

    showAlert(message, type = 'info') {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#4F46E5'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
            font-size: 0.875rem;
        `;
        alert.textContent = message;

        // Add to DOM
        document.body.appendChild(alert);

        // Remove after 3 seconds
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        }, 3000);
    }

    // Utility methods
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    }

    formatTime(date) {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EduLinkApp();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
    
    .loading {
        animation: pulse 1s infinite;
    }
    
    .alert {
        animation: slideIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);