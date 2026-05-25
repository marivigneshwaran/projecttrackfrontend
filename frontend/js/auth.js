// Authentication utilities

class AuthManager {
    constructor() {
        this.currentUser = this.loadUser();
    }

    isAuthenticated() {
        return !!localStorage.getItem('accessToken');
    }

    loadUser() {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    saveUser(userData) {
        this.currentUser = userData;
        localStorage.setItem('currentUser', JSON.stringify(userData));
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getUserInitials() {
        if (!this.currentUser || !this.currentUser.name) {
            return '?';
        }
        const names = this.currentUser.name.split(' ');
        return names.map(n => n[0]).join('').toUpperCase();
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = 'login.html';
    }
}

// Create global auth manager
const authManager = new AuthManager();

// Check authentication on page load
function checkAuthentication() {
    if (!authManager.isAuthenticated() && !window.location.pathname.includes('login')) {
        window.location.href = 'login.html';
    }

    if (authManager.isAuthenticated() && window.location.pathname.includes('login')) {
        window.location.href = 'index.html';
    }
}

// Setup auth on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    updateUserInfo();
});

// Update user info in navbar
function updateUserInfo() {
    const userInfo = document.getElementById('user-info');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');

    if (userInfo && authManager.getCurrentUser()) {
        const user = authManager.getCurrentUser();
        if (userAvatar) {
            userAvatar.textContent = authManager.getUserInitials();
        }
        if (userName) {
            userName.textContent = user.name || user.email || 'User';
        }
    }
}
