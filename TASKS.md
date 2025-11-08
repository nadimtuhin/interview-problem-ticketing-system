# Coding Tasks (90 minutes)

Now that we've discussed your approach, it's time to implement! You have 90 minutes to complete as many of these tasks as possible. Focus on getting working features rather than perfection.

## Setup Verification

Before starting, verify the application is running:
1. Run `./docker-start.sh`
2. Visit http://localhost:5173
3. Login as `admin@test.com` / `admin123`
4. Verify you can view and create tickets

## Task 1: Priority System (30 minutes)

**Goal:** Add priority levels to tickets and allow filtering by priority.

### Backend Changes

**File:** `backend/src/config/database.js`
1. Add `priority` column to tickets table:
   - Type: TEXT
   - Default: 'medium'
   - Check constraint: IN ('low', 'medium', 'high', 'urgent')

**File:** `backend/src/models/Ticket.js`
1. Update `create()` method to accept priority parameter
2. Update `getAll()` to include priority in SELECT
3. Update `findById()` to include priority

**File:** `backend/src/routes/tickets.js`
1. In POST `/` endpoint, accept `priority` from request body
2. Validate priority is one of: 'low', 'medium', 'high', 'urgent'
3. Pass priority to `Ticket.create()`

### Frontend Changes

**File:** `frontend/src/components/CreateTicketForm.jsx`
1. Add state for priority (default: 'medium')
2. Add dropdown select for priority with options: low, medium, high, urgent
3. Include priority in API call

**File:** `frontend/src/components/TicketList.jsx`
1. Display priority badge next to status
2. Style priority badges with different colors (see CSS TODOs)

**File:** `frontend/src/pages/TicketListPage.jsx`
1. Add state for priority filter (default: 'all')
2. Add dropdown to filter by priority
3. Filter tickets based on selected priority

**File:** `frontend/src/index.css`
1. Uncomment priority badge CSS styles

### Testing
- [ ] Create a new ticket with priority "urgent"
- [ ] Verify priority is saved and displayed
- [ ] Test filtering tickets by priority
- [ ] Verify all priority levels display with correct colors

---

## Task 2: Admin Assignment (30 minutes)

**Goal:** Allow admins to assign tickets to themselves or other admins.

### Backend Changes

**File:** `backend/src/config/database.js`
1. Add `assigned_to` column to tickets table:
   - Type: INTEGER
   - Nullable (not all tickets are assigned)
   - Foreign key to users(id)

**File:** `backend/src/models/Ticket.js`
1. Update `findById()` to JOIN assigned user and include their name as `assigned_name`
2. Update `getAll()` to include assigned user info

**File:** `backend/src/routes/tickets.js`
1. Add new endpoint: `PUT /api/tickets/:id/assign` (use `requireAdmin` middleware)
2. Accept `{ assigned_to: userId }` in request body
3. Validate the assigned user exists and is an admin
4. Update ticket's assigned_to field
5. Return updated ticket with assigned user info

**File:** `backend/src/routes/tickets.js` (also add helper endpoint)
1. Add endpoint: `GET /api/users/admins` (use `requireAdmin` middleware)
2. Return list of all admin users (id, name, email)

### Frontend Changes

**File:** `frontend/src/services/api.js`
1. Add `getAdmins()` function to fetch admin users
2. Add `assignTicket(ticketId, userId)` function

**File:** `frontend/src/pages/TicketDetailPage.jsx`
1. Add state for list of admins
2. Fetch admins list when component mounts (if user is admin)
3. Add assignment section with dropdown (only visible to admins)
4. Handle assignment submission
5. Display assigned admin name if ticket is assigned

**File:** `frontend/src/components/TicketList.jsx`
1. Display assigned admin name in ticket card footer (if assigned)

### Testing
- [ ] Login as admin
- [ ] Assign a ticket to yourself
- [ ] Verify assignment is saved and displayed
- [ ] Verify regular users can see who's assigned
- [ ] Verify only admins can assign tickets

---

## Task 3: Status Updates & Comments (30 minutes)

**Goal:** Add a comment/update system to track ticket activity.

### Backend Changes

**File:** `backend/src/config/database.js`
1. Create new table `ticket_updates`:
   - id INTEGER PRIMARY KEY
   - ticket_id INTEGER (foreign key to tickets)
   - user_id INTEGER (foreign key to users)
   - comment TEXT NOT NULL
   - created_at DATETIME DEFAULT CURRENT_TIMESTAMP

**File:** `backend/src/models/Ticket.js`
1. Add method `addUpdate(ticketId, userId, comment)`:
   - Insert new row into ticket_updates
   - Return the created update
2. Add method `getUpdates(ticketId)`:
   - JOIN with users table to get user names
   - Order by created_at DESC
   - Return array of updates with user info

**File:** `backend/src/routes/tickets.js`
1. Add endpoint: `POST /api/tickets/:id/updates` (use `requireAuth`)
2. Accept `{ comment }` in request body
3. Validate comment is not empty
4. Call `Ticket.addUpdate()` with ticket ID, user ID, and comment
5. Return created update

**File:** `backend/src/routes/tickets.js` (fetch endpoint)
1. Add endpoint: `GET /api/tickets/:id/updates` (use `requireAuth`)
2. Call `Ticket.getUpdates(ticketId)`
3. Return updates array

### Frontend Changes

**File:** `frontend/src/services/api.js`
1. Add `addTicketUpdate(ticketId, comment)` function
2. Add `getTicketUpdates(ticketId)` function

**File:** `frontend/src/pages/TicketDetailPage.jsx`
1. Add state for updates list and new comment
2. Fetch updates when ticket loads
3. Add form to submit new comment
4. Display updates list with user name and timestamp
5. Show most recent update first

**File:** `frontend/src/index.css`
1. Uncomment ticket updates CSS styles

### Bonus (if time permits)
**File:** `backend/src/routes/tickets.js`
1. Add status workflow validation in PUT `/:id`:
   - open → in_progress, resolved, closed
   - in_progress → resolved, closed, open
   - resolved → closed, in_progress
   - closed → in_progress (reopen)
2. Return error if invalid transition attempted

### Testing
- [ ] Add a comment to a ticket
- [ ] Verify comment appears with your name
- [ ] Add multiple comments and verify order
- [ ] Verify both admins and users can comment
- [ ] (Bonus) Try invalid status transition

---

## Time Management Tips

- **0-30 min:** Task 1 (Priority System)
- **30-60 min:** Task 2 (Admin Assignment)
- **60-90 min:** Task 3 (Status Updates)

If you're stuck:
- Look for TODO comments in the code (they have hints!)
- Check the solution patterns in existing code
- Ask questions if something is unclear
- Skip to the next task and come back if time permits

## Submission Checklist

- [ ] Code runs without errors
- [ ] Database migrations applied correctly
- [ ] All new endpoints tested in browser
- [ ] UI updates are visible and functional
- [ ] No console errors in browser
- [ ] Basic error handling in place

## Evaluation Criteria

We'll assess:
1. **Functionality:** Does it work as specified?
2. **Code quality:** Is it clean and maintainable?
3. **Completeness:** How much did you finish?
4. **Problem-solving:** How did you handle obstacles?
5. **Testing:** Did you verify your changes work?

Good luck! Remember: working code is better than perfect code. Focus on getting features functional, then refine if time permits.
