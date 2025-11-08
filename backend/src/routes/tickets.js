const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { requireAuth, requireAdmin } = require('../middleware/auth');

// TODO: TASK 2 - This endpoint is needed for the assignment feature
// Get all admin users (for assignment dropdown)
// Hint: This is already implemented to help you get started
// router.get('/admins', requireAdmin, (req, res) => {
//   try {
//     const admins = User.getAll().filter(u => u.role === 'admin');
//     res.json(admins);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch admins' });
//   }
// });

// Get all tickets
router.get('/', requireAuth, (req, res) => {
  try {
    const tickets = Ticket.getAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// Get single ticket
router.get('/:id', requireAuth, (req, res) => {
  try {
    const ticket = Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// Create ticket
router.post('/', requireAuth, (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    // TODO: TASK 1 - Add priority field to ticket creation
    // Hint: Accept 'priority' from request body, validate against ['low', 'medium', 'high', 'urgent']
    // You'll need to:
    // 1. Add priority column to tickets table in database.js
    // 2. Accept priority parameter here
    // 3. Update Ticket.create() to accept and store priority

    const ticketId = Ticket.create(title, description, req.session.userId);
    const ticket = Ticket.findById(ticketId);

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Update ticket
router.put('/:id', requireAuth, (req, res) => {
  try {
    const { title, description, status } = req.body;
    const ticket = Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // Only creator or admin can update
    if (ticket.created_by !== req.session.userId && req.session.userRole !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) {
      // TODO: TASK 3 - Implement status workflow validation
      // Hint: Validate status transitions (open → in_progress → resolved → closed)
      // Example: if current status is 'resolved', only allow 'closed' or 'in_progress'
      updateData.status = status;
    }

    const updated = Ticket.update(req.params.id, updateData);
    if (!updated) {
      return res.status(400).json({ error: 'No changes made' });
    }

    const updatedTicket = Ticket.findById(req.params.id);
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

// TODO: TASK 2 - Add ticket assignment endpoint
// Hint: Create PUT /api/tickets/:id/assign endpoint (admin only)
// Requirements:
// 1. Use requireAdmin middleware
// 2. Accept { assigned_to: userId } in request body
// 3. Add 'assigned_to' column to tickets table (foreign key to users)
// 4. Update ticket with assigned_to value
// Example:
// router.put('/:id/assign', requireAdmin, (req, res) => {
//   const { assigned_to } = req.body;
//   // Validate user exists
//   // Update ticket
//   // Return updated ticket with assigned user info
// });

// TODO: TASK 3 - Add ticket updates/comments endpoint
// Hint: Create POST /api/tickets/:id/updates endpoint
// Requirements:
// 1. Use requireAuth middleware
// 2. Accept { comment } in request body
// 3. Call Ticket.addUpdate(ticketId, userId, comment)
// 4. Return the created update
//
// Also create GET /api/tickets/:id/updates to fetch all updates:
// router.get('/:id/updates', requireAuth, (req, res) => {
//   const updates = Ticket.getUpdates(req.params.id);
//   res.json(updates);
// });

module.exports = router;
