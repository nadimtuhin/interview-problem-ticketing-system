import { useState, useEffect } from 'react';
import TicketList from '../components/TicketList';
import CreateTicketForm from '../components/CreateTicketForm';
import { getTickets } from '../services/api';

function TicketListPage({ user }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // TODO: TASK 1 - Add priority filter state
  // Hint: Add state for filtering tickets by priority
  // const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getTickets();
      setTickets(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketCreated = () => {
    setShowCreateForm(false);
    fetchTickets();
  };

  // TODO: TASK 1 - Add filtered tickets logic
  // Hint: Filter tickets based on priority selection
  // const filteredTickets = priorityFilter === 'all'
  //   ? tickets
  //   : tickets.filter(t => t.priority === priorityFilter);

  if (loading) {
    return <div className="page"><div className="loading">Loading tickets...</div></div>;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Support Tickets</h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn btn-primary"
          >
            {showCreateForm ? 'Cancel' : 'Create Ticket'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showCreateForm && (
          <div className="create-form-section">
            <CreateTicketForm onTicketCreated={handleTicketCreated} />
          </div>
        )}

        {/* TODO: TASK 1 - Add priority filter dropdown */}
        {/* Hint: Add a dropdown to filter tickets by priority
        <div className="filters">
          <label htmlFor="priority-filter">Filter by Priority:</label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        */}

        <TicketList tickets={tickets} />
        {/* TODO: TASK 1 - Replace tickets with filteredTickets */}
        {/* <TicketList tickets={filteredTickets} /> */}
      </div>
    </div>
  );
}

export default TicketListPage;
