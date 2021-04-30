import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import { renderFile } from 'ejs';

import './db';
import routes from './routes';

const app = express();

//config html views
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  return res.render('html/client.html');
});

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log('connected: ', socket.id);
});

app.use(express.json());
app.use(routes);

export { http, io };
