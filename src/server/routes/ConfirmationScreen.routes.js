import { pool } from '../../../db.js';
import express, { json } from 'express';
import { PORT } from '../../../config.js';

const app = express();
const port = PORT;

app.use(json());

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

app.post('/api/ConfirmationScreen', async (req, res) => {
    try {
        console.log(req.body)

        const {amountFormatted, totalAmount, gain_expense, note, imageValues} = req.body
        const categoryPosition = imageValues.iconNumberPosition
        console.log(categoryPosition)

        const date = new Date();
        const dateFormatted = date.toISOString().slice(0, 19).replace("T", " ")

        const [rows] = await pool.query("INSERT INTO MoneyRegistry(total_amount, entered_amount, gain_expense, note, id_user, id_category, date) VALUES(?, ?, ?, ?, ?, ?, ?)", [amountFormatted, totalAmount, gain_expense, note, 1, categoryPosition, dateFormatted])

        res.send({ 
            navigation: req.body.navigation, 
            totalAmount: totalAmount 
        })
    } catch(error) {
        console.error("Error de inserción:", error); // Imprime el error en la consola
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
});

app.get('/api/History', async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT id_moneyregistry, entered_amount, gain_expense, note, id_category, date FROM MoneyRegistry ORDER BY id_moneyregistry DESC")
        // console.log(rows[0].id_category)
        const id_category = rows[0].id_category
        const [rowsCategory] = await pool.query(`SELECT * FROM Category`)
        // console.log("rowsCategory:")
        // console.log(JSON.stringify(rowsCategory))

        const combinedRows = {
            rows,
            rowsCategory
        };
        // console.log("combinedRows", combinedRows)
        
        res.send({
            combinedRows
        })
    } catch(error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
})

app.listen(port, () => {
    console.log(`Servidor en puerto ${PORT} escuchando`);
  });