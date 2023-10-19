import express, { json } from 'express';
import { PORT } from '../../../config.js';

const app = express();
const port = PORT;

app.use(json());

// const pool = mysql.createPool(db)

app.post('/api/ConfirmationScreen', (req, res) => {
  console.log(req.body)
  const mensaje = 'Ruta conseguida';
  console.log(mensaje);
  res.send(req.body.navigation)
});

app.listen(port, () => {
  console.log(`Servidor en puerto ${PORT} escuchando`);
});