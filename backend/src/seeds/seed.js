const db = require('../config/database');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

console.log('Seeding database...');

// Clear existing data
db.exec('DELETE FROM tickets');
db.exec('DELETE FROM users');

// Create users
const adminId = User.create('admin@test.com', 'admin123', 'admin', 'Admin User');
const userId = User.create('user@test.com', 'user123', 'user', 'Regular User');

console.log('Created users:');
console.log('- admin@test.com / admin123 (Admin)');
console.log('- user@test.com / user123 (User)');

// Create sample tickets
const tickets = [
  {
    title: 'Login page not loading',
    description: 'The login page shows a blank screen when I try to access it. This has been happening since yesterday.',
    createdBy: userId
  },
  {
    title: 'Password reset email not received',
    description: 'I requested a password reset but never received the email. Checked spam folder as well.',
    createdBy: userId
  },
  {
    title: 'Dashboard charts not displaying correctly',
    description: 'The analytics charts on the dashboard appear broken. Data is there but visualization is off.',
    createdBy: adminId
  },
  {
    title: 'Mobile app crashes on startup',
    description: 'After the latest update, the mobile app crashes immediately upon opening. Using iOS 16.',
    createdBy: userId
  },
  {
    title: 'Export to CSV feature returns empty file',
    description: 'When exporting user data to CSV, the downloaded file is empty even though data exists.',
    createdBy: adminId
  }
];

tickets.forEach((ticket) => {
  Ticket.create(ticket.title, ticket.description, ticket.createdBy);
});

console.log(`Created ${tickets.length} sample tickets`);
console.log('Seeding complete!');
