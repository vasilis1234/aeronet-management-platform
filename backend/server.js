const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

// Φόρτωση ρυθμίσεων
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. Σύνδεση με PostgreSQL (Render) ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect((err) => {
  if (err) {
    console.error('❌ Σφάλμα σύνδεσης στην PostgreSQL:', err.message);
  } else {
    console.log('✅ Η σύνδεση με την PostgreSQL (Render) πέτυχε!');
  }
});

// --- 2. Σύνδεση με MongoDB (Atlas) ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Η σύνδεση με τη MongoDB (Atlas) πέτυχε!'))
  .catch(err => console.error('❌ Σφάλμα σύνδεσης στη MongoDB:', err.message));

// --- 3. API ROUTES (Εδώ τραβάμε τα δεδομένα) ---

// Φέρε τους Employees από την PostgreSQL
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EMPLOYEE');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Σφάλμα PostgreSQL: ' + err.message });
  }
});

// Φέρε τα QC Reports από τη MongoDB
app.get('/api/qc-reports', async (req, res) => {
  try {
    // Σύνδεση απευθείας με το collection qc_reports στη βάση aeronetsystem
    const reports = await mongoose.connection.db.collection('qc_reports').find({}).toArray();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Σφάλμα MongoDB: ' + err.message });
  }
});

// Φέρε τα IoT Logs από τη MongoDB
app.get('/api/iot-logs', async (req, res) => {
  try {
    const logs = await mongoose.connection.db.collection('iot_logs').find({}).toArray();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Σφάλμα MongoDB: ' + err.message });
  }
});

// Αρχική σελίδα (Health Check)
app.get('/', (req, res) => {
  res.send('🚀 Ο Server της AeroNet είναι Online και συνδεδεμένος με τις βάσεις!');
});

// --- 4. Εκκίνηση Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Ο Server τρέχει στη θύρα ${PORT}`);
});
