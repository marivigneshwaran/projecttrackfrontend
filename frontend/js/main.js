// Utility functions

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert ${type === 'error' ? 'error' : type === 'success' ? 'success' : 'alert'}`;
    notification.textContent = message;

    const container = document.body;
    container.insertBefore(notification, container.firstChild);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function getStatusBadgeClass(status) {
    if (!status) return '';
    const statusLower = status.toLowerCase().replace(' ', '');
    return `status-${statusLower}`;
}

function getPriorityBadgeClass(priority) {
    if (!priority) return '';
    return `priority-${priority.toLowerCase()}`;
}

function capitalizeFirst(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Form validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateForm(formData, requiredFields) {
    const errors = {};

    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].toString().trim() === '') {
            errors[field] = `${capitalizeFirst(field.replace('_', ' '))} is required`;
        }
    });

    if (formData.email && !validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (formData.phone && formData.phone.length < 10) {
        errors.phone = 'Please enter a valid phone number';
    }

    return errors;
}

function displayFormErrors(errors, form) {
    // Clear previous errors
    form.querySelectorAll('.form-error-message').forEach(msg => msg.remove());
    form.querySelectorAll('.form-error').forEach(field => field.classList.remove('form-error'));

    // Display new errors
    Object.keys(errors).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.add('form-error');
            const errorMsg = document.createElement('div');
            errorMsg.className = 'form-error-message';
            errorMsg.textContent = errors[fieldName];
            field.parentNode.appendChild(errorMsg);
        }
    });
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

function resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        form.querySelectorAll('.form-error').forEach(field => {
            field.classList.remove('form-error');
        });
        form.querySelectorAll('.form-error-message').forEach(msg => msg.remove());
    }
}

// Navigation
function navigateTo(page) {
    window.location.href = page;
}

// Load navigation
function loadNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    
    // Setup modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Setup logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            authManager.logout();
        });
    }

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});
