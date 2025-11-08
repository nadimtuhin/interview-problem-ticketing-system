# Problem Statement (30 minutes)

## Scenario

You're joining a team that's building a support ticketing system. The basic infrastructure is already in place, but there are several critical features that need to be implemented. Your task is to analyze the codebase and design solutions for the missing features.

## Current System Overview

The application has:
- User authentication (admin and regular users)
- Basic ticket CRUD operations
- Simple status management (open, in_progress, resolved, closed)
- Role-based access control

## Your Task

Review the codebase and prepare solutions for the following problems. You'll discuss your approach before implementing.

### Problem 1: Ticket Prioritization

**Context:** The support team needs to prioritize tickets, but currently all tickets are treated equally. This makes it hard to identify urgent issues.

**Questions to Consider:**
1. How would you design a priority system for tickets?
2. What priority levels would you implement?
3. Where should priorities be set? (user creation, admin only, both?)
4. How would the priority affect ticket display and filtering?
5. Should priority be editable after creation? By whom?

**Design Considerations:**
- Database schema changes needed
- API endpoint modifications
- UI/UX for priority selection and display
- Default priority handling

### Problem 2: Ticket Assignment

**Context:** Currently, tickets aren't assigned to specific support staff. Admins need a way to assign tickets to team members for better workload management.

**Questions to Consider:**
1. Who should be able to assign tickets? (admins only, or creators too?)
2. Should users be able to see who's assigned to their tickets?
3. Can a ticket be reassigned?
4. Should there be notifications when a ticket is assigned?
5. What happens to assigned tickets when the assignee is deleted?

**Design Considerations:**
- Database relationships (foreign keys, cascading)
- Permission model for assignment
- UI for admins to see their assigned tickets
- Edge cases (assignment to non-existent users, self-assignment)

### Problem 3: Ticket Activity History

**Context:** There's no record of what happens to a ticket over time. Support staff need to see all updates, status changes, and comments.

**Questions to Consider:**
1. What events should be tracked? (status changes, comments, assignments, etc.)
2. How would you structure the data model for ticket history?
3. Should there be different types of updates (system vs user comments)?
4. How would you display the timeline in the UI?
5. Who can add comments? Who can see them?

**Design Considerations:**
- Scalability (many updates per ticket)
- Querying efficiency (get ticket with all history)
- Update types and their data structure
- Permission model for viewing/adding updates

### Problem 4: Status Workflow Validation

**Context:** Currently, any status can transition to any other status. This can lead to inconsistent ticket states (e.g., jumping from "open" directly to "closed" without resolution).

**Questions to Consider:**
1. What should the valid status transition flow be?
2. Should some transitions be role-restricted?
3. Can a ticket be reopened after being closed?
4. Should status changes be automatic in some cases?
5. How would you enforce these rules?

**Design Considerations:**
- State machine design
- Backend validation
- Frontend UI (only showing valid next states)
- Error handling for invalid transitions

## Deliverables

Prepare to discuss:
1. Your high-level approach to each problem
2. Database schema changes you'd make
3. API endpoints you'd need to add/modify
4. Security and permission considerations
5. Potential edge cases and how to handle them
6. Trade-offs in your design decisions

## Evaluation Criteria

- **System thinking:** Can you see how features interact?
- **Data modeling:** Are your schema designs normalized and efficient?
- **Security awareness:** Do you consider authorization and validation?
- **Pragmatism:** Are your solutions practical for a 90-minute implementation?
- **Trade-off analysis:** Can you articulate pros/cons of different approaches?

---

**Note:** You don't need to solve all problems perfectly. We're more interested in your thought process and how you approach system design. Be ready to explain your reasoning and discuss alternatives.
