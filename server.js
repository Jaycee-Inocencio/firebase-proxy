const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

const PORT = 8080;
const FIREBASE_URL = 'https://occupancycounter-default-rtdb.asia-southeast1.firebasedatabase.app/'; // Replace with your path
const AUTH = 'j7NXiBNDRv8pI0HqUPFxfttzmdwYuwNwsLM0ypeX'; // Optional: Add ?auth=your_firebase_database_secret if your Firebase is protected

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Proxy for GET
app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get(FIREBASE_URL + AUTH);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Proxy for POST
app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post(FIREBASE_URL + AUTH, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});
