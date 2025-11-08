const db = require('../config/database');

class Ticket {
  static create(title, description, createdBy) {
    const stmt = db.prepare(
      'INSERT INTO tickets (title, description, created_by) VALUES (?, ?, ?)'
    );
    const result = stmt.run(title, description, createdBy);
    return result.lastInsertRowid;
  }

  static findById(id) {
    const stmt = db.prepare(`
      SELECT
        t.*,
        u.name as creator_name,
        u.email as creator_email
      FROM tickets t
      JOIN users u ON t.created_by = u.id
      WHERE t.id = ?
    `);
    return stmt.get(id);
  }

  static getAll() {
    const stmt = db.prepare(`
      SELECT
        t.*,
        u.name as creator_name,
        u.email as creator_email
      FROM tickets t
      JOIN users u ON t.created_by = u.id
      ORDER BY t.created_at DESC
    `);
    return stmt.all();
  }

  static update(id, data) {
    const fields = [];
    const values = [];

    if (data.title !== undefined) {
      fields.push('title = ?');
      values.push(data.title);
    }
    if (data.description !== undefined) {
      fields.push('description = ?');
      values.push(data.description);
    }
    if (data.status !== undefined) {
      fields.push('status = ?');
      values.push(data.status);
    }

    if (fields.length === 0) return false;

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = db.prepare(
      `UPDATE tickets SET ${fields.join(', ')} WHERE id = ?`
    );
    const result = stmt.run(...values);
    return result.changes > 0;
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM tickets WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // TODO: TASK 3 - Add methods for ticket updates/comments
  // Hint: Create a new table 'ticket_updates' with columns:
  // - id, ticket_id, user_id, comment, created_at
  // Add methods: addUpdate(ticketId, userId, comment) and getUpdates(ticketId)
}

module.exports = Ticket;
