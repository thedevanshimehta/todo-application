Task Manager Application
A full-stack Task Manager (To-Do) application built using React, Node.js (Express), and MySQL.
The application allows users to create, edit, complete, and delete tasks with a clean UI, theme customization, and persistent storage.
This project was developed as part of my first internship, focusing on clean code, usability, and basic best practices.

1. Core Functionality
a.Add new tasks
b.Edit existing tasks
c.Mark tasks as Complete / Incomplete
d.Delete tasks
e.Tasks persist using a MySQL database

2. UI & UX
a.Light / Dark mode
b.Multiple color themes (Blue, Green, Slate)
c.Responsive design (mobile-friendly)
d.Glassmorphism-based UI
e.Input validation with visual feedback

3. Technical
a.REST API using Express
b.React functional components with hooks
c.State management using useState and useEffect
d.LocalStorage for theme persistence

4.Tech Stack
a. Frontend
React
CSS (custom styling, CSS variables)
Lucide Icons
b.Backend
Node.js
Express.js
MySQL

5. Project Structure :
frontend/
│── App.js
│── App.css
│── ToDoForm.js
│── TaskLists.js
│── ToDoList.js

backend/
│── server.js
│── db.js

6. How It Works : 
a.On website load, tasks are fetched from the backend using useEffect
b.User actions (add, edit, delete, complete) trigger API calls
c.Backend updates the MySQL database
d.UI updates immediately using React state
e.Theme and dark mode preferences are stored in LocalStorage 

7. Security & Best Practices Followed
a.Prepared SQL statements to prevent SQL injection
b.Separation of frontend and backend
c.Reusable React components
d.Clean and readable code structure
e.Meaningful comments for maintainability

8. Test Cases Covered
a.Task Creation
i.Add a task with valid input
ii.Prevent adding an empty task
iii.Prevent adding tasks longer than 100 characters
iv.Input field clears after successful task creation
v.Task is saved in database and reflected on reload

b.Task Editing
i.Edit task text when task is incomplete
ii.Save edited task successfully
iii.Updated text persists after page refresh
iv.Editing disabled for completed tasks

c.Task Completion
i.Mark task as completed
ii.Completed task shows:
iii.Strikethrough text
iv.Visual completed state
v.Unmark a completed task
vi.Status updates correctly in database

d.Task Deletion
i.Delete a task successfully
ii.Task removed from UI immediately
iii.Task removed from database

e.UI & Validation
i.Error animation shown for invalid input
ii.Validation clears automatically when input becomes valid
iii.Empty state message shown when no tasks exist
iv.Scroll behavior works for long task lists

f.Theme & Preferences
i.Change color theme successfully
ii.Toggle dark/light mode
iii.Preferences persist after page refresh (LocalStorage)

g.API & Error Handling
i.Handles failed API requests gracefully
ii.Shows alert when backend operations fail
iii.Prevents UI crash on server/database errors

Author
Devanshi Mehta
First Internship Project
Frontend + Backend (Full Stack)
