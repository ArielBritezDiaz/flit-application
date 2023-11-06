import express, { json } from 'express';
import { PORT } from '../../../config.js';
import path from 'path';
import { fileURLToPath } from 'url';

import { postSendEmail, postNewUser, postSearchUser, getHome, postConfirmationScreen, getHistory, getChartOneMonth } from '../controllers/ConfirmationScreen.controller.js'

const app = express();
const port = PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsPath = path.join(__dirname, '../../assets/');

console.log(assetsPath)

app.use(json());
app.use(express.static(path.join(__dirname, '/../../assets')));

app.post('/api/sendEmail', postSendEmail);

app.post('/api/newUser', postNewUser);

app.post('/api/searchUser', postSearchUser);

app.get('/api/Home/:id_user', getHome)

app.post('/api/ConfirmationScreen/:id_user', postConfirmationScreen);

app.get('/api/History/:id_user', getHistory);

app.get('/api/ChartData/:id_user/oneMonth', getChartOneMonth)

app.listen(port, () => {
    console.log(`Server on port ${PORT} listen`);
  });