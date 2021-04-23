import express from 'express';

import './db';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
