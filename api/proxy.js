// /api/proxy.js

const axios = require('axios');

module.exports = async (req, res) => {
  const FIREBASE_BASE_URL = 'https://occupancycounter-default-rtdb.asia-southeast1.firebasedatabase.app';
  const FIREBASE_SECRET = 'j7NXiBNDRv8pI0HqUPFxfttzmdwYuwNwsLM0ypeX';
  const TARGET_PATH = '/entries.json?auth=' + FIREBASE_SECRET;

  try {
    if (req.method === 'POST') {
      console.log('📥 POST body:', req.body);
      const response = await axios.post(FIREBASE_BASE_URL + TARGET_PATH, req.body);
      res.status(200).json({ success: true, id: response.data.name });
    } else if (req.method === 'GET') {
      const response = await axios.get(FIREBASE_BASE_URL + TARGET_PATH);
      res.status(200).json(response.data);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('🔥 Firebase error:', error.response?.data || error.message);
    res.status(500).json({
      error: error.message,
      details: error.response?.data || 'Unknown server error',
    });
  }
};
