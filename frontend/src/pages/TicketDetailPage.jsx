import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicket, updateTicket } from '../services/api';

function TicketDetailPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const data = await getTicket(id);
      setTicket(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      await updateTicket(id, { status: newStatus });
      await fetchTicket();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  // TODO: TASK 2 - Add ticket assignment handler
  // Hint: Create a function to handle admin assignment
  // const handleAssignment = async (userId) => {
  //   try {
  //     setUpdating(true);
  //     await assignTicket(id, userId);
  //     await fetchTicket();
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setUpdating(false);
  //   }
  // };

  // TODO: TASK 3 - Add state for updates/comments
  // Hint: Add state for ticket updates and new comment
  // const [updates, setUpdates] = useState([]);
  // const [newComment, setNewComment] = useState('');

  // TODO: TASK 3 - Add function to fetch updates
  // useEffect(() => {
  //   if (ticket) {
  //     fetchUpdates();
  //   }
  // }, [ticket]);
  //
  // const fetchUpdates = async () => {
  //   try {
  //     const data = await getTicketUpdates(id);
  //     setUpdates(data);
  //   } catch (err) {
  //     console.error('Failed to fetch updates:', err);
  //   }
  // };

  // TODO: TASK 3 - Add function to submit comment
  // const handleAddComment = async (e) => {
  //   e.preventDefault();
  //   if (!newComment.trim()) return;
  //
  //   try {
  //     await addTicketUpdate(id, newComment);
  //     setNewComment('');
  //     await fetchUpdates();
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  if (loading) {
    return <div className="page"><div className="loading">Loading ticket...</div></div>;
  }

  if (!ticket) {
    return <div className="page"><div className="error-message">Ticket not found</div></div>;
  }

  const canEdit = ticket.created_by === user.id || user.role === 'admin';

  return (
    <div className="page">
      <div className="container">
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          Back to Tickets
        </button>

        {error && <div className="error-message">{error}</div>}

        <div className="ticket-detail">
          <div className="ticket-detail-header">
            <h1>{ticket.title}</h1>
            <span className={`status-badge status-${ticket.status}`}>
              {ticket.status}
            </span>
          </div>

          <div className="ticket-meta">
            <p><strong>Created by:</strong> {ticket.creator_name} ({ticket.creator_email})</p>
            <p><strong>Created at:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
            <p><strong>Last updated:</strong> {new Date(ticket.updated_at).toLocaleString()}</p>

            {/* TODO: TASK 2 - Display assigned admin */}
            {/* Hint: Show assigned admin name if ticket is assigned
            {ticket.assigned_to && (
              <p><strong>Assigned to:</strong> {ticket.assigned_name}</p>
            )}
            */}
          </div>

          <div className="ticket-description">
            <h3>Description</h3>
            <p>{ticket.description}</p>
          </div>

          {canEdit && (
            <div className="ticket-actions">
              <h3>Update Status</h3>
              <div className="status-buttons">
                {ticket.status !== 'open' && (
                  <button
                    onClick={() => handleStatusChange('open')}
                    className="btn btn-secondary"
                    disabled={updating}
                  >
                    Reopen
                  </button>
                )}
                {ticket.status !== 'in_progress' && (
                  <button
                    onClick={() => handleStatusChange('in_progress')}
                    className="btn btn-secondary"
                    disabled={updating}
                  >
                    Mark In Progress
                  </button>
                )}
                {ticket.status !== 'resolved' && (
                  <button
                    onClick={() => handleStatusChange('resolved')}
                    className="btn btn-secondary"
                    disabled={updating}
                  >
                    Mark Resolved
                  </button>
                )}
                {ticket.status !== 'closed' && (
                  <button
                    onClick={() => handleStatusChange('closed')}
                    className="btn btn-secondary"
                    disabled={updating}
                  >
                    Close Ticket
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TODO: TASK 2 - Add assignment UI for admins */}
          {/* Hint: Show assignment dropdown only for admins
          {user.role === 'admin' && (
            <div className="ticket-assignment">
              <h3>Assign Ticket</h3>
              <select
                onChange={(e) => handleAssignment(e.target.value)}
                defaultValue=""
                disabled={updating}
              >
                <option value="">Select admin to assign...</option>
                {admins.map(admin => (
                  <option key={admin.id} value={admin.id}>
                    {admin.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          */}

          {/* TODO: TASK 3 - Add updates/comments section */}
          {/* Hint: Display ticket update history and form to add new comments
          <div className="ticket-updates">
            <h3>Updates & Comments</h3>

            <form onSubmit={handleAddComment} className="add-comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows="3"
              />
              <button type="submit" className="btn btn-primary">
                Add Comment
              </button>
            </form>

            <div className="updates-list">
              {updates.map(update => (
                <div key={update.id} className="update-item">
                  <div className="update-header">
                    <strong>{update.user_name}</strong>
                    <span>{new Date(update.created_at).toLocaleString()}</span>
                  </div>
                  <p>{update.comment}</p>
                </div>
              ))}
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}

export default TicketDetailPage;
