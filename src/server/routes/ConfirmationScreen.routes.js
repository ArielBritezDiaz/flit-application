import { pool } from '../../../db.js';
import express, { json } from 'express';
import { PORT } from '../../../config.js';

const app = express();
const port = PORT;

app.use(json());

app.post('/api/ConfirmationScreen', async (req, res) => {
    try {
        console.log(req.body)

        const {amountFormatted, totalAmount, gain_expense, note} = req.body

        const date = new Date();
        const dateFormatted = date.toISOString().slice(0, 19).replace("T", " ")

        const [rows] = await pool.query("INSERT INTO MoneyRegistry(total_amount, entered_amount, gain_expense, note, date) VALUES(?, ?, ?, ?, ?)", [amountFormatted, totalAmount, gain_expense, note, dateFormatted])

        console.log(rows)
        res.send(req.body.navigation, ({
            totalAmount
        }))
    } catch(error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
});

app.get('/api/Home', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT (entered_amount) FROM MoneyRegistry ORDER BY (id_moneyregistry) DESC LIMIT 1")
        res.send(rows)
    } catch(error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
})

app.listen(port, () => {
    console.log(`Servidor en puerto ${PORT} escuchando`);
  });