import express from 'express';

import './db';

const app = express();

app.get('/', (req, res) => {
  return res.json({ message: 'TEst' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
