import { pool } from '../../../db.js'
import nodemailer from 'nodemailer';
import { GMAIL_APPS_PASSW, GMAIL_APPS_USER } from '../../../config.js'
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'

export const postSendEmail = async (req, res) => {
    try {
        const { user, email, password, token } = req.body
        console.log(req.body)

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const assetsPath = path.join(__dirname, '../../assets/');

        const saltTimes = 10

        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.genSalt(saltTimes, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) reject(err);
                    resolve(hash);
                })
            })
        })

        console.log("Hashing password", hashedPassword);
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_APPS_USER,
                pass: GMAIL_APPS_PASSW
            }
        });

        const mailOptions = {
            from: GMAIL_APPS_USER,
            to: email,
            subject: 'Flit - Código de verificación',
            html: `
                    <table style="width:100%; max-width:600px; margin:auto; font-family: Arial, sans-serif; background-color: #2f2f2f;border: 1px solid #f5f5fa; border-radius: 5px; margin-top: 20px;">
                        <tr>
                            <td style="text-align:center; padding: 20px 0;">
                                <img src="cid:logo" style="width: 100px; height: 100px;" alt="Logo">
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:center; padding: 20px;">
                                <div style="padding: 15px; border: 1px solid #f5f5fa;border-radius: 5px; background-color: #0f0c0c;">
                                    <p style="font-size: 16px; color: #f5f5fa;">Su código de verificación para <span style="color: #D39F00">Flit</span> es:</p>
                                    
                                    <div style="margin-top: 10px; padding: 10px; background-color: #2f2f2f; border-radius: 5px;">
                                        <p style="font-size: 18px; color: #D39F00; margin: 0;">${token}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                `,
                attachments: [{
                    filename: 'logo.png',
                    path: `${assetsPath}logo.png`,
                    cid: 'logo'
                  }]
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log("Error en el envío del correo electrónico", error);
                return res.status(500).json({ message: "Error en el envío del correo electrónico" });
            } else {

                const isValidToken = false

                const [ rows ] = await pool.query("INSERT INTO User(user, email, passw, token, isValidToken) VALUES (?, ?, ?, ?, ?)", [user, email, hashedPassword, token, isValidToken])

                // console.log("rows", rows)

                console.log('Correo electrónico enviado: ' + info.response);
                res.send({
                    data: {
                        user,
                        email,
                        hashedPassword,
                        token
                    }
                })
            }
        });
    } catch(error) {
        res.status(500).json({
            "message": "Internal server error: " + error
        })
    }
}

export const postNewUser = async (req, res) => {
    try {
        const { user, email, hashedPassword, token } = req.body.resultSendDataComplete.data;

        console.log("req.body", req.body)

        const isValidToken = true

        const [ rows ] = await pool.query("UPDATE User SET user = ?, email = ?, passw = ?, token = ?, isValidToken = ? WHERE email = ?", [user, email, hashedPassword, token, isValidToken, email])

        const [ validationUser ] = await pool.query("SELECT * FROM User WHERE email = ?", [email])

        console.log("validationUser", validationUser)
        console.log(validationUser[0].id_user)

        console.log("Llega a postNewUser")

        return res.status(200).send({
            id_user: validationUser[0].id_user,
            navigation: "TabNavigationScreen"
        });
        
        
    } catch(error) {
        console.error("Error en el envío del correo electrónico", error);
        return res.status(500).json({ "message": "Error en el envío del correo electrónico" });
    }
}

export const postSearchUser = async (req, res) => {
    try {
        console.log("req.body from postSearchUser:", req.body)
        const { emailUser, password } = req.body

        const [ rows ] = await pool.query("SELECT passw FROM User WHERE email = ?", [emailUser])
        console.log("rows from postSearchUser:", rows)

        const data = await new Promise((resP, rej) => {
            bcrypt.compare(password, rows[0].passw, async (err, res) => {
                if(err) {
                    console.log(err)
                    rej(err)
                }
                if(res === true) {
                    const [ data ] = await pool.query("SELECT id_user FROM User WHERE email = ?", [emailUser])
                    resP("data from postSearchUser:", data)
                } else if(res === false) {
                    const data = null
                    console.log("data is null", data)
                    resP(data)
                }
            })
        })
        console.log(data)

        if(data !== null) {
            const [ rows ] = await pool.query("SELECT id_user, isValidToken FROM User WHERE email = ?", [emailUser])
            console.log(rows)
    
            return res.status(200).send({
                data: rows,
                navigation: "TabNavigationScreen"
            })
        } else {
            return res.status(404).send({
                passwordIncorrect: "Contraseña incorrecta"
            })
        }
    } catch(error) {
        console.log("Error en la búsqueda de usuario en LogIn", error)
        return res.status(500).json({ "message": "Internal server error" })
    }
}

export const getHome = async (req, res) => {
    try {
        console.log("req.params", req.params)
        const id_user = req.params.id_user
        const [ rowsTotalAmount ] = await pool.query("SELECT (total_amount) FROM MoneyRegistry WHERE id_user = ? ORDER BY id_moneyregistry DESC LIMIT 1", [id_user])
        const [ rowsNameUser ] = await pool.query("SELECT (user) FROM User WHERE id_user = ?", [id_user])
        console.log("rowsTotalAmount", rowsTotalAmount)
        console.log("rowsNameUser", rowsNameUser)

        const combinedRows = {
            rowsTotalAmount,
            rowsNameUser
        }

        res.status(200).send(combinedRows)
    } catch(error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}

export const postConfirmationScreen = async (req, res) => {
    try {
        console.log(req.body)
        console.log("req.params", req.params)

        const id_user = Number(req.params.id_user)
        console.log("id_user", id_user)

        const {amountFormatted, totalAmount, gain_expense, note, imageValues} = req.body
        const categoryPosition = imageValues.iconNumberPosition
        console.log("categoryPosition", categoryPosition)

        const date = new Date();
        let dateFormatted = date.toISOString().slice(0, 19).replace("T", " ")
        let hour = dateFormatted.slice(11)

        // Formateo de tiempo MX
        // Calculamos la diferencia horaria entre UTC y MX
        let numberTime = hour.slice(0, 2)
        let utcDifferenceWithMX = numberTime - 3
        let timeARGHours = 0 + utcDifferenceWithMX
        let timeARGMinutes = hour.slice(3)

        if(timeARGHours == 0) timeARGHours = 0
        if(timeARGHours < 0) timeARGHours = 1
        if(timeARGHours < 10 && timeARGHours >= 0) timeARGHours = `0${timeARGHours}`
        if(timeARGMinutes < 10) timeARGMinutes = `0${timeARGMinutes}`

        let hourFull = `${timeARGHours}:${timeARGMinutes}`
        
        let dateFull = `${dateFormatted.slice(0, 11)} ${hourFull}`

        const [rows] = await pool.query("INSERT INTO MoneyRegistry(total_amount, entered_amount, gain_expense, id_user, note, id_category, date) VALUES(?, ?, ?, ?, ?, ?, ?)", [totalAmount, amountFormatted, gain_expense, id_user, note, categoryPosition, dateFull])

        console.log("rowspCS", rows)

        res.status(200).send({
            navigation: req.body.navigation,
            totalAmount: totalAmount 
        })
    } catch(error) {
        console.error("Error de inserción:", error);
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}

export const getHistory = async (req, res) => {
    try {
        const id_user = Number(req.params.id_user)

        const [rows] = await pool.query("SELECT id_moneyregistry, entered_amount, gain_expense, note, id_category, date FROM MoneyRegistry WHERE id_user = ?", [id_user])
        
        const [rowsCategory] = await pool.query(`SELECT * FROM Category`)

        const combinedRows = {
            rows,
            rowsCategory
        };
        
        res.status(200).send({
            combinedRows
        })
    } catch(error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}

export const getChartDataUserOneMonth = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        console.log("id_user", id_user)

        const date = new Date()
        const thisMonth = date.getUTCMonth() + 1
        console.log(thisMonth)

        const [rows] = await pool.query(
            `SELECT 
                SUM(entered_amount) as total_amount,
                CASE 
                    WHEN DAY(date) <= 5 THEN LPAD(5, 2, '0')
                    WHEN DAY(date) <= 10 THEN 10
                    WHEN DAY(date) <= 15 THEN 15
                    WHEN DAY(date) <= 20 THEN 20
                    WHEN DAY(date) <= 25 THEN 25
                    ELSE 30
                END as rounded_day
            FROM 
                MoneyRegistry
            WHERE 
                id_user = ? AND MONTH(date) = ?
            GROUP BY 
                rounded_day
            ORDER BY 
                rounded_day`,
            [id_user, thisMonth]
        );
        
        console.log("rows", rows)

        return res.status(200).json({
            rows
        })
    } catch(error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}

export const getChartDataCategoriesOneMonth = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        console.log(id_user)
        
        const date = new Date()
        const thisMonth = date.getUTCMonth() + 1
        console.log(thisMonth)

        const [rows] = await pool.query(
            `WITH ranked_data AS (
                SELECT 
                    id_category, 
                    SUM(entered_amount) as total_amount, 
                    ROUND(SUM(entered_amount) * 100 / (SELECT SUM(entered_amount) FROM MoneyRegistry WHERE id_user = ? AND MONTH(date) = ?), 2) as percentage_usage,
                    DENSE_RANK() OVER (ORDER BY ROUND(SUM(entered_amount) * 100 / (SELECT SUM(entered_amount) FROM MoneyRegistry WHERE id_user = ? AND MONTH(date) = ?), 2) ASC) as usage_rank
                FROM MoneyRegistry
                WHERE id_user = ? AND MONTH(date) = ?
                GROUP BY id_category
            )
            SELECT * FROM ranked_data`, [id_user, thisMonth, id_user, thisMonth, id_user, thisMonth]
        )
        
        console.log("rows", rows)
        const [rowsCategory] = await pool.query("SELECT * FROM Category")
        // console.log("rowsCategory", rowsCategory)
        const combinedRows = {
            rows,
            rowsCategory
        }
        return res.status(200).json({
            combinedRows
        })
    } catch(error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}

export const getCategoryHistoryOneMonth = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const id_category = req.params.id_category;

        console.log(id_user)
        console.log(id_category)

        const date = new Date()
        const thisMonth = date.getUTCMonth() + 1
        console.log(thisMonth)

        const [rows] = await pool.query(
            `
            SELECT * FROM MoneyRegistry WHERE id_user = ? AND MONTH(date) = ? AND id_category = ?
            `, [id_user, thisMonth, id_category]
        )
        
        const [rowsCategory] = await pool.query(`SELECT * FROM Category`)

        const combinedRows = {
            rows,
            rowsCategory
        };
        
        return res.status(200).json({
            combinedRows
        })
    } catch(error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}