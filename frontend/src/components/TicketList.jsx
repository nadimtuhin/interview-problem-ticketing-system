import { Link } from 'react-router-dom';

function TicketList({ tickets }) {
  if (tickets.length === 0) {
    return <div className="empty-state">No tickets found</div>;
  }

  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <Link to={`/tickets/${ticket.id}`} key={ticket.id} className="ticket-card">
          <div className="ticket-header">
            <h3>{ticket.title}</h3>
            <span className={`status-badge status-${ticket.status}`}>
              {ticket.status}
            </span>
          </div>
          <p className="ticket-description">{ticket.description}</p>
          <div className="ticket-footer">
            <span className="ticket-meta">
              Created by: {ticket.creator_name}
            </span>
            <span className="ticket-meta">
              {new Date(ticket.created_at).toLocaleDateString()}
            </span>
          </div>

          {/* TODO: TASK 1 - Add priority badge display */}
          {/* Hint: Add a priority badge next to the status badge */}
          {/* Example:
            {ticket.priority && (
              <span className={`priority-badge priority-${ticket.priority}`}>
                {ticket.priority}
              </span>
            )}
          */}
        </Link>
      ))}
    </div>
  );
}

export default TicketList;
