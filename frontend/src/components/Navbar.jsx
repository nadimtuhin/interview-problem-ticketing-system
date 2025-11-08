import { Link } from 'react-router-dom';
import { logout } from '../services/api';

function Navbar({ user, onLogout }) {
  const handleLogout = async () => {
    try {
      await logout();
      onLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <Link to="/">Support Tickets</Link>
        </div>
        <div className="navbar-menu">
          <span className="user-info">
            {user.name} ({user.role})
          </span>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
