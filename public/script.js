const API = "";

// Add student
async function addStudent() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const department = document.getElementById("department").value;
  const email = document.getElementById("email").value;

  const res = await fetch(`/add-student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age, department, email }),
  });
  const data = await res.json();
  alert(data.message || data.error || "Student added!");
  loadStudents();
}

// Load all students
async function loadStudents() {
  const res = await fetch(`/students`);
  const data = await res.json();
  const table = document.getElementById("studentTable");
  table.innerHTML = `<tr><th>ID</th><th>Name</th><th>Department</th><th>Email</th></tr>` +
    data.map(s => `<tr><td>${s.id}</td><td>${s.name}</td><td>${s.department}</td><td>${s.email}</td></tr>`).join("");
}

// Add marks
async function addMarks() {
  const student_id = document.getElementById("studentId").value;
  const subject = document.getElementById("subject").value;
  const marks = document.getElementById("marks").value;

  const res = await fetch(`/add-marks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ student_id, subject, marks }),
  });
  const data = await res.json();
  alert(data.message || data.error || "Marks added!");
  loadMarks();
}

// Load marks
async function loadMarks() {
  const res = await fetch(`/marks`);
  const data = await res.json();
  const table = document.getElementById("marksTable");
  table.innerHTML = `<tr><th>Student ID</th><th>Student</th><th>Subject</th><th>Marks</th></tr>` +
    data.map(m => `<tr><td>${m.student_id}</td><td>${m.name}</td><td>${m.subject}</td><td>${m.marks}</td></tr>`).join("");
}

// Auto-load students on page open
window.onload = () => {
  loadStudents();
};
