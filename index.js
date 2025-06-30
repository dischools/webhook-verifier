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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
