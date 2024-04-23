
const environment = require('./environments/environment');
const cors = require('cors');
const express = require('express');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;
const signingSecret = environment.sigParserSecretKey; // Replace with your actual signing secret

app.use(cors());

app.get('/sigparser', async (req, res) => {
  try {
    // Forward the request to SigParser's API
    const response = await fetch('https://ipaas.sigparser.com/api/User/Me', {
      method: 'GET',
      headers: {
        'x-api-key': `${environment.sigParserAPIKey}`,
      }
    });

    // Pass the response back to the client
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});



