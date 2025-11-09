import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./db.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Add new student
app.post("/add-student", (req, res) => {
  const { name, age, department, email } = req.body;
  const sql = "INSERT INTO Students (name, age, department, email) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, age, department, email], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Student added successfully!" });
  });
});

// Get all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM Students", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add marks
app.post("/add-marks", (req, res) => {
  const { student_id, subject, marks } = req.body;
  const sql = "INSERT INTO Marks (student_id, subject, marks) VALUES (?, ?, ?)";
  db.query(sql, [student_id, subject, marks], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Marks added successfully!" });
  });
});

// View marks
app.get("/marks", (req, res) => {
  const sql = `SELECT s.id AS student_id, s.name, m.subject, m.marks 
               FROM Marks m JOIN Students s ON s.id = m.student_id`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Simple home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
