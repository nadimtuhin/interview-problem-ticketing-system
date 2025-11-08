const API_BASE_URL = 'http://localhost:3002/api';

async function fetchAPI(url, options = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

export async function login(email, password) {
  return fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logout() {
  return fetchAPI('/auth/logout', {
    method: 'POST',
  });
}

export async function getCurrentUser() {
  return fetchAPI('/auth/me');
}

export async function getTickets() {
  return fetchAPI('/tickets');
}

export async function getTicket(id) {
  return fetchAPI(`/tickets/${id}`);
}

export async function createTicket(ticketData) {
  return fetchAPI('/tickets', {
    method: 'POST',
    body: JSON.stringify(ticketData),
  });
}

export async function updateTicket(id, ticketData) {
  return fetchAPI(`/tickets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(ticketData),
  });
}

// TODO: TASK 2 - Add assignTicket function
// Hint: Create a function to call PUT /api/tickets/:id/assign
// export async function assignTicket(ticketId, userId) {
//   return fetchAPI(`/tickets/${ticketId}/assign`, {
//     method: 'PUT',
//     body: JSON.stringify({ assigned_to: userId }),
//   });
// }

// TODO: TASK 3 - Add ticket updates functions
// Hint: Create functions for adding and fetching ticket updates
// export async function addTicketUpdate(ticketId, comment) {
//   return fetchAPI(`/tickets/${ticketId}/updates`, {
//     method: 'POST',
//     body: JSON.stringify({ comment }),
//   });
// }
//
// export async function getTicketUpdates(ticketId) {
//   return fetchAPI(`/tickets/${ticketId}/updates`);
// }
