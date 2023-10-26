import express, { json } from 'express';
import { PORT } from '../../../config.js';

import { getDataHome, postNewRegister, getHistory } from '../controllers/ConfirmationScreen.controller.js'

const app = express();
const port = PORT;

app.use(json());

app.get('/api/Home', getDataHome)

app.post('/api/ConfirmationScreen', postNewRegister);

app.get('/api/History', getHistory)

app.listen(port, () => {
    console.log(`Servidor en puerto ${PORT} escuchando`);
  });