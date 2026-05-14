const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect((err) => {
  if (err) console.error(err.message);
  else console.log('✅ Postgres Connected');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error(err));

app.post('/api/login', async (req, res) => {
  const { email, empid } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM EMPLOYEE WHERE email = $1 AND empid = $2',
      [email, empid]
    );
    if (result.rows.length > 0) {
      res.json({ 
        success: true, 
        user: {
          fullname: result.rows[0].fullname,
          role: result.rows[0].roleid
        } 
      });
    } else {
      res.status(401).json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM EMPLOYEE');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/suppliers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM suppliers');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/qc-reports', async (req, res) => {
  try {
    const reports = await mongoose.connection.db.collection('qc_reports').find({}).toArray();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/iot-logs', async (req, res) => {
  try {
    const logs = await mongoose.connection.db.collection('iot_logs').find({}).toArray();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
