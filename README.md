# Support Ticketing System - Interview Project

A full-stack support ticketing system built with Node.js, Express, SQLite, React, and Vite.

## Tech Stack

**Backend:**
- Node.js + Express
- SQLite (better-sqlite3)
- Session-based authentication
- bcryptjs for password hashing

**Frontend:**
- React 18
- React Router
- Vite
- Vanilla CSS

## Quick Start

### Using Docker (Recommended)

1. Start the application:
```bash
./docker-start.sh
```

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3002

3. Login with demo credentials:
   - Admin: `admin@test.com` / `admin123`
   - User: `user@test.com` / `user123`

4. Stop the application:
```bash
./docker-stop.sh
```

### Manual Setup

**Backend:**
```bash
cd backend
npm install
npm run seed    # Seed database with demo data
npm run dev     # Start development server
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev     # Start development server
```

## Project Structure

```
candidate/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express app setup
│   │   ├── config/
│   │   │   └── database.js     # SQLite configuration
│   │   ├── models/
│   │   │   ├── User.js         # User model
│   │   │   └── Ticket.js       # Ticket model
│   │   ├── routes/
│   │   │   ├── auth.js         # Authentication routes
│   │   │   └── tickets.js      # Ticket CRUD routes
│   │   ├── middleware/
│   │   │   └── auth.js         # Auth middleware
│   │   └── seeds/
│   │       └── seed.js         # Database seeding
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── TicketListPage.jsx
│   │   │   └── TicketDetailPage.jsx
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── TicketList.jsx
│   │   │   ├── CreateTicketForm.jsx
│   │   │   └── Navbar.jsx
│   │   ├── services/
│   │   │   └── api.js          # API client
│   │   └── index.css
│   └── package.json
├── docker-compose.yml
├── PROBLEM.md                   # Problem statement (30-min phase)
└── TASKS.md                     # Implementation tasks (90-min phase)
```

## Features Implemented (70%)

### Authentication
- [x] Login/logout with session management
- [x] Role-based access (admin/user)
- [x] Protected routes

### Ticket Management
- [x] View all tickets
- [x] Create new ticket
- [x] View ticket details
- [x] Update ticket status
- [x] Role-based permissions

### UI Components
- [x] Responsive design
- [x] Login form with demo credentials
- [x] Ticket list with cards
- [x] Create ticket form
- [x] Ticket detail page
- [x] Navbar with user info

## Interview Format

This is a 2-hour technical interview divided into:

1. **Problem Solving (30 min)** - Review [PROBLEM.md](PROBLEM.md) and discuss your approach
2. **Coding Tasks (90 min)** - Implement features following [TASKS.md](TASKS.md)

## Your Tasks (30% remaining)

See [TASKS.md](TASKS.md) for detailed instructions. You'll implement:

### Task 1: Priority System (30 min)
- Add priority field to tickets (low, medium, high, urgent)
- Display priority with color-coded badges
- Add priority filter in ticket list

### Task 2: Admin Assignment (30 min)
- Add ticket assignment feature
- Admin-only endpoint to assign tickets
- Display assigned admin on ticket

### Task 3: Status Updates & Comments (30 min)
- Implement status workflow validation
- Add ticket updates/comments system
- Display update history

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout current user
- `GET /api/auth/me` - Get current user

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get single ticket
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/:id` - Update ticket

## Database Schema

### users
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY |
| email | TEXT | UNIQUE, NOT NULL |
| password_hash | TEXT | NOT NULL |
| role | TEXT | CHECK(role IN ('admin', 'user')) |
| name | TEXT | NOT NULL |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP |

### tickets
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY |
| title | TEXT | NOT NULL |
| description | TEXT | NOT NULL |
| status | TEXT | CHECK(status IN ('open', 'in_progress', 'resolved', 'closed')) |
| created_by | INTEGER | FOREIGN KEY → users(id) |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP |

## Testing

Test your implementation manually:
1. Login as admin and user
2. Create tickets with different priorities
3. Assign tickets (as admin)
4. Add comments to tickets
5. Test role-based access control
6. Verify filters work correctly

## Tips

- Look for TODO comments in the code - they contain helpful hints
- Existing code shows patterns you can follow
- Don't hesitate to ask clarifying questions
- Focus on working code over perfection
- Test as you go to catch issues early

## Notes

- SQLite database file is created automatically at `backend/database.db`
- Sessions are stored in memory (restart clears sessions)
- CORS is enabled for `http://localhost:5173`
- All timestamps are in UTC

Good luck!
