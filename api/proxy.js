import axios from 'axios';

export default async function handler(req, res) {
  const FIREBASE_URL = 'https://occupancycounter-default-rtdb.asia-southeast1.firebasedatabase.app/'; // Replace this
  const AUTH = 'j7NXiBNDRv8pI0HqUPFxfttzmdwYuwNwsLM0ypeX'; // Optional: ?auth=YOUR_SECRET

  if (req.method === 'POST') {
    try {
      const response = await axios.post(FIREBASE_URL + AUTH, req.body);
      res.status(200).json(response.data);
    } catch (err) {
      res.status(500).send(err.toString());
    }
  } else if (req.method === 'GET') {
    try {
      const response = await axios.get(FIREBASE_URL + AUTH);
      res.status(200).json(response.data);
    } catch (err) {
      res.status(500).send(err.toString());
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
