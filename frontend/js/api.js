// API Configuration
const API_BASE_URL = 'http://localhost:8000/api'; // Change this if backend runs on different host

class APIClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.accessToken = localStorage.getItem('accessToken');
        this.refreshToken = localStorage.getItem('refreshToken');
    }

    // Get authorization header
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
        };
    }

    // Make HTTP request
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            method: options.method || 'GET',
            headers: this.getHeaders()
        };

        if (options.body) {
            config.body = options.body;
        }

        try {
            const response = await fetch(url, config);

            // Handle token expiration
            if (response.status === 401) {
                await this.refreshAccessToken();
                config.headers = this.getHeaders();
                const retryResponse = await fetch(url, config);
                if (!retryResponse.ok) {
                    throw new Error(`API Error: ${retryResponse.status}`);
                }
                return await retryResponse.json();
            }

            if (!response.ok) {
                let errorMsg = `HTTP ${response.status}`;
                try {
                    const error = await response.json();
                    errorMsg = error.detail || error.message || errorMsg;
                } catch (e) {
                    // Response is not JSON
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error for', endpoint, ':', error.message);
            throw error;
        }
    }

    // Refresh access token
    async refreshAccessToken() {
        try {
            const response = await fetch(`${this.baseURL}/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: this.refreshToken })
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const data = await response.json();
            this.accessToken = data.access;
            localStorage.setItem('accessToken', data.access);
        } catch (error) {
            console.error('Token refresh error:', error);
            window.location.href = 'login.html';
        }
    }

    // ===== AUTHENTICATION =====
    async login(email, password) {
        const response = await fetch(`${this.baseURL}/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password: password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Invalid email or password');
        }

        const data = await response.json();
        this.accessToken = data.access;
        this.refreshToken = data.refresh;

        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);

        return data;
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser');
        this.accessToken = null;
        this.refreshToken = null;
    }

    // ===== USERS =====
    async getUsers() {
        return this.request('/users/list/', { method: 'GET' });
    }

    async createUser(userData) {
        return this.request('/users/create/', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async updateUser(id, userData) {
        return this.request(`/users/update/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }

    async deleteUser(id) {
        return this.request(`/users/delete/${id}/`, { method: 'DELETE' });
    }

    async getRoles() {
        return this.request('/roles/list/', { method: 'GET' });
    }

    // ===== CUSTOMERS =====
    async getCustomers() {
        return this.request('/customers/list/', { method: 'GET' });
    }

    async createCustomer(customerData) {
        return this.request('/customers/create/', {
            method: 'POST',
            body: JSON.stringify(customerData)
        });
    }

    async updateCustomer(id, customerData) {
        return this.request(`/customers/update/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(customerData)
        });
    }

    async deleteCustomer(id) {
        return this.request(`/customers/delete/${id}/`, { method: 'DELETE' });
    }

    // ===== PROJECTS =====
    async getProjects() {
        return this.request('/projects/list/', { method: 'GET' });
    }

    async createProject(projectData) {
        return this.request('/projects/create/', {
            method: 'POST',
            body: JSON.stringify(projectData)
        });
    }

    async updateProject(id, projectData) {
        return this.request(`/projects/update/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(projectData)
        });
    }

    async deleteProject(id) {
        return this.request(`/projects/delete/${id}/`, { method: 'DELETE' });
    }

    // ===== PHASES =====
    async getPhases() {
        return this.request('/phases/list/', { method: 'GET' });
    }

    async createPhase(phaseData) {
        return this.request('/phases/create/', {
            method: 'POST',
            body: JSON.stringify(phaseData)
        });
    }

    async updatePhase(id, phaseData) {
        return this.request(`/phases/update/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(phaseData)
        });
    }

    async deletePhase(id) {
        return this.request(`/phases/delete/${id}/`, { method: 'DELETE' });
    }

    // ===== TASK LISTS =====
    async getTaskLists() {
        return this.request('/task-lists/list/', { method: 'GET' });
    }

    async createTaskList(listData) {
        return this.request('/task-lists/create/', {
            method: 'POST',
            body: JSON.stringify(listData)
        });
    }

    async updateTaskList(id, listData) {
        return this.request(`/task-lists/update/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(listData)
        });
    }

    async deleteTaskList(id) {
        return this.request(`/task-lists/delete/${id}/`, { method: 'DELETE' });
    }

    // ===== TASKS =====
    async getTasks() {
        return this.request('/tasks/list/', { method: 'GET' });
    }

    async createTask(taskData) {
        return this.request('/tasks/create/', {
            method: 'POST',
            body: JSON.stringify(taskData)
        });
    }

    async updateTask(id, taskData) {
        return this.request(`/tasks/update/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(taskData)
        });
    }

    async deleteTask(id) {
        return this.request(`/tasks/delete/${id}/`, { method: 'DELETE' });
    }

    // ===== SUB TASKS =====
    async getSubTasks() {
        return this.request('/sub-tasks/list/', { method: 'GET' });
    }

    async createSubTask(subTaskData) {
        return this.request('/sub-tasks/create/', {
            method: 'POST',
            body: JSON.stringify(subTaskData)
        });
    }

    async updateSubTask(id, subTaskData) {
        return this.request(`/sub-tasks/update/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(subTaskData)
        });
    }

    async deleteSubTask(id) {
        return this.request(`/sub-tasks/delete/${id}/`, { method: 'DELETE' });
    }

    // ===== TASK ASSIGNMENTS =====
    async getAssignments() {
        return this.request('/assignments/list/', { method: 'GET' });
    }

    async createAssignment(assignmentData) {
        return this.request('/assignments/create/', {
            method: 'POST',
            body: JSON.stringify(assignmentData)
        });
    }

    async updateAssignment(id, assignmentData) {
        return this.request(`/assignments/update/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(assignmentData)
        });
    }

    async deleteAssignment(id) {
        return this.request(`/assignments/delete/${id}/`, { method: 'DELETE' });
    }
}

// Create global API instance
const api = new APIClient();
