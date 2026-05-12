const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- Σύνδεση με PostgreSQL ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect((err) => {
  if (err) console.error('❌ Σφάλμα PostgreSQL:', err.message);
  else console.log('✅ Η σύνδεση με την PostgreSQL πέτυχε!');
});

// --- Σύνδεση με MongoDB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Η σύνδεση με τη MongoDB πέτυχε!'))
  .catch(err => console.error('❌ Σφάλμα MongoDB:', err.message));

// --- API ROUTES ---

// 1. Route για το LOGIN (Ελέγχει αν ο υπάλληλος υπάρχει στην SQL)
app.post('/api/login', async (req, res) => {
  const { email, empid } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM EMPLOYEE WHERE email = $1 AND empid = $2',
      [email, empid]
    );

    if (result.rows.length > 0) {
      // Αν βρεθεί ο χρήστης, επιστρέφουμε τα στοιχεία του και τον ρόλο του
      res.json({ 
        success: true, 
        user: {
          fullname: result.rows[0].fullname,
          role: result.rows[0].roleid
        } 
      });
    } else {
      res.status(401).json({ success: false, message: 'Λάθος στοιχεία πρόσβασης' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Route για τους Employees (PostgreSQL)
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EMPLOYEE');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Route για τα QC Reports (MongoDB)
app.get('/api/qc-reports', async (req, res) => {
  try {
    const reports = await mongoose.connection.db.collection('qc_reports').find({}).toArray();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Root Route
app.get('/', (req, res) => {
  res.send('🚀 AeroNet API is running with Login Support!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
