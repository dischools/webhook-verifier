const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/webhook', (req, res) => {
  const verifyToken = 'dischools123';
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});
const axios = require('axios');

app.post('/webhook', async (req, res) => {
  try {
    console.log('Meta Message:', JSON.stringify(req.body, null, 2));

    await axios.post('https://dischools.app.n8n.cloud/webhook/whatsapp-incoming', req.body);

    res.sendStatus(200);
  } catch (error) {
    console.error('Forwarding to n8n failed:', error.message);
    res.sendStatus(500);
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
