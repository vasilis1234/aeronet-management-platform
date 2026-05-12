const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

// Φόρτωση ρυθμίσεων από το .env
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// --- Σύνδεση με PostgreSQL (Render) ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Απαραίτητο για σύνδεση με Render
});

pool.connect((err) => {
  if (err) {
    console.error('❌ Σφάλμα σύνδεσης στην PostgreSQL:', err.message);
  } else {
    console.log('✅ Η σύνδεση με την PostgreSQL (Render) πέτυχε!');
  }
});

// --- Σύνδεση με MongoDB (Atlas) ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Η σύνδεση με τη MongoDB (Atlas) πέτυχε!'))
  .catch(err => console.error('❌ Σφάλμα σύνδεσης στη MongoDB:', err.message));

// Δοκιμαστικό Route
app.get('/', (req, res) => {
  res.send('Ο Server της AeroNetB είναι Online!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Ο Server τρέχει στη θύρα ${PORT}`);
});