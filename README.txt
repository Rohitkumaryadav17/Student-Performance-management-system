Student Management System - Setup Guide
-------------------------------------

Requirements:
- Node.js (v14+)
- npm
- MySQL (XAMPP/WAMP or standalone)

Steps to run locally:
1. Import the database:
   - Open your MySQL client (phpMyAdmin or MySQL CLI).
   - Run the SQL file: sql/student_db.sql
2. Install dependencies:
   cd student-management
   npm install
3. Start the server:
   node server.js
4. Open in browser:
   http://localhost:5000

Database credentials configured in db.js:
 - user: root
 - password: 7266826024

If your MySQL username/password differ, update db.js accordingly.
