# ProjectTrack Frontend

A professional, intermediate-level frontend for the ProjectTrack project management system. Built with vanilla HTML, CSS, and JavaScript with a clean, modern UI design.

## 📁 Project Structure

```
frontend/
├── index.html              # Dashboard/Home page
├── login.html              # Login page
├── customers.html          # Customers management
├── projects.html           # Projects management
├── tasks.html              # Tasks, subtasks, and assignments management
├── css/
│   └── styles.css          # Global styles and responsive design
└── js/
    ├── api.js              # API client for backend communication
    ├── auth.js             # Authentication utilities
    └── main.js             # Common utilities and functions
```

## 🚀 Features

### Dashboard
- Quick overview with statistics (customers, projects, tasks, users)
- Recent projects with progress indicators
- Recent tasks with status and priority
- Real-time data from backend API

### Customers Management
- View all customers
- Add new customers
- Edit customer information
- Delete customers
- Customer status tracking (Active/Inactive)

### Projects Management
- View all projects with progress tracking
- Create new projects
- Assign customers to projects
- Track project types (Internal/External)
- Monitor project status and progress percentage
- Set project dates and deadlines

### Tasks Management
- View all tasks with priority levels
- Create and manage tasks
- Create subtasks for complex work
- Assign tasks to team members
- Track estimated hours
- Monitor task and subtask status
- Track billing status for assignments

## 🔧 Configuration

### Backend Connection

Edit the API base URL in `js/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000/api'; // Change this if needed
```

Change this to match your backend URL (e.g., `http://192.168.1.100:8000/api` for remote servers).

### CORS Configuration

The backend should have CORS enabled (already configured in your Django project). If you get CORS errors, ensure:
- `django-cors-headers` is installed in your backend
- `CorsMiddleware` is in MIDDLEWARE
- `CORS_ALLOW_ALL_ORIGINS = True` or specify allowed origins

## 🔐 Authentication

### Login
- Email/username and password-based authentication
- JWT tokens stored in localStorage
- Automatic token refresh when expired
- Session persists across page reloads

### Demo Credentials
If you've created test users in the Django admin:
- Email: admin@example.com
- Password: admin123

(Replace with actual credentials from your database)

## 💻 Running the Frontend

### Option 1: Using Python Simple HTTP Server
```bash
cd c:\Django\Project_Track\frontend
python -m http.server 8001
```
Then open: `http://localhost:8001`

### Option 2: Using Node.js http-server
```bash
npm install -g http-server
cd c:\Django\Project_Track\frontend
http-server -p 8001
```

### Option 3: Using any local server
- Live Server (VS Code extension)
- Apache/Nginx
- Express.js

**Important**: You need to run this on a different port than your Django backend (which runs on 8000).

## 📋 API Endpoints Used

The frontend communicates with these Django REST API endpoints:

### Authentication
- `POST /api/auth/token/` - Login
- `POST /api/auth/token/refresh/` - Refresh token

### Customers
- `GET /api/customers/customers/list/`
- `POST /api/customers/customers/create/`
- `PUT /api/customers/customers/update/<id>/`
- `DELETE /api/customers/customers/delete/<id>/`

### Projects
- `GET /api/customers/projects/list/`
- `POST /api/customers/projects/create/`
- `PUT /api/customers/projects/update/<id>/`
- `DELETE /api/customers/projects/delete/<id>/`

### Tasks
- `GET /api/tasks/tasks/list/`
- `POST /api/tasks/tasks/create/`
- `PUT /api/tasks/tasks/update/<id>/`
- `DELETE /api/tasks/tasks/delete/<id>/`

### Subtasks
- `GET /api/tasks/sub-tasks/list/`
- `POST /api/tasks/sub-tasks/create/`
- `PUT /api/tasks/sub-tasks/update/<id>/`
- `DELETE /api/tasks/sub-tasks/delete/<id>/`

### Task Assignments
- `GET /api/tasks/assignments/list/`
- `POST /api/tasks/assignments/create/`
- `PUT /api/tasks/assignments/update/<id>/`
- `DELETE /api/tasks/assignments/delete/<id>/`

### Users
- `GET /api/auth/users/list/`

## 🎨 UI Design Features

### Color Scheme
- **Primary**: Professional Blue (#2563eb)
- **Secondary**: Success Green (#10b981)
- **Danger**: Red (#ef4444)
- **Warning**: Amber (#f59e0b)

### Components
- Clean, modern navbar with user info
- Status badges with color coding
- Progress bars for project completion
- Modal dialogs for forms
- Responsive tables
- Form validation and error messages
- Toast notifications
- Loading spinners

### Responsive Design
- Mobile-friendly (tested on mobile screens)
- Adaptive navigation
- Touch-friendly buttons
- Readable on all screen sizes

## 🔍 Troubleshooting

### Login Not Working
1. Check backend is running: `python manage.py runserver`
2. Verify API base URL in `js/api.js`
3. Check browser console (F12) for errors
4. Ensure CORS is enabled in Django

### Data Not Loading
1. Check network tab in DevTools (F12)
2. Verify API endpoints in Django admin
3. Check token is valid in localStorage
4. Try refreshing the page

### CORS Errors
1. Verify `django-cors-headers` is installed
2. Check `CORS_ALLOW_ALL_ORIGINS = True` in settings
3. Try adding specific origin: `CORS_ALLOWED_ORIGINS = ["http://localhost:8001"]`

## 📝 Form Validation

All forms include client-side validation for:
- Required fields
- Email format
- Phone number format
- Date validation
- Number ranges

Server-side validation is also performed by the Django backend.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Features by Page

| Page | Features |
|------|----------|
| Dashboard | Stats, recent projects, recent tasks |
| Login | Email/password authentication |
| Customers | CRUD operations, status tracking |
| Projects | CRUD operations, progress tracking, client assignment |
| Tasks | Tasks, subtasks, assignments, priority, estimated hours |

## 🚀 Future Enhancements

Possible improvements:
- User roles and permissions
- File upload for project documents
- Timeline/Gantt chart view
- Team collaboration features
- Notifications and alerts
- Export to PDF/Excel
- Advanced filtering and search
- Dashboard customization
- Activity logs

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify backend is running and accessible
4. Check network requests in DevTools

---

**Version**: 1.0  
**Last Updated**: 2026-05-25  
**Built for**: Django REST Framework Project Management System
