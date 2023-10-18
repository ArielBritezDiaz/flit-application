import express, { json } from 'express';
import { PORT } from '../../../config.js';

const app = express();
const port = PORT;

app.use(json());

// const pool = mysql.createPool(db)

app.get('/ConfirmationScreen', (req, res) => {
  const ruta = req.query.ruta;
  console.log(`Ruta desde la aplicación: ${ruta}`);
  const mensaje = 'Ruta conseguida';
  console.log(mensaje);
  res.send(mensaje);
});

app.listen(port, () => {
  console.log(`Servidor en puerto ${PORT} escuchando`);
});

// const newRegister = async () => {
//     try {
        
//     }
// };
