import express, { json } from 'express';
import { PORT } from '../../../config.js';

import { getHome, postConfirmationScreen, getHistory, postNewUser } from '../controllers/ConfirmationScreen.controller.js'

const app = express();
const port = PORT;

app.use(json());

app.get('/api/Home', getHome)

app.post('/api/ConfirmationScreen', postConfirmationScreen);

app.get('/api/History', getHistory);

app.post('/api/newUser', postNewUser);

app.listen(port, () => {
    console.log(`Server on port ${PORT} listen`);
  });