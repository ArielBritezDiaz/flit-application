import { pool } from '../../../db.js'
import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '../../../config.js';

export const getHome = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT (total_amount) FROM MoneyRegistry ORDER BY (id_moneyregistry) DESC LIMIT 1")
        res.status(200).send(rows)
    } catch(error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}

export const postConfirmationScreen = async (req, res) => {
    try {
        console.log(req.body)

        const {amountFormatted, totalAmount, gain_expense, note, imageValues} = req.body
        const categoryPosition = imageValues.iconNumberPosition
        console.log(categoryPosition)

        const date = new Date();
        let dateFormatted = date.toISOString().slice(0, 19).replace("T", " ")
        let hour = dateFormatted.slice(11)

        // Formateo de tiempo MX
        // Calculamos la diferencia horaria entre UTC y MX
        let numberTime = hour.slice(0, 2)
        let utcDifferenceWithMX = numberTime - 6
        let timeARGHours = 0 + utcDifferenceWithMX
        console.log("hour", hour)
        let timeARGMinutes = hour.slice(3)

        if(timeARGHours == 0) timeARGHours = 0
        if(timeARGHours < 0) timeARGHours = 1
        if(timeARGHours < 10 && timeARGHours >= 0) timeARGHours = `0${timeARGHours}`
        if(timeARGMinutes < 10) timeARGMinutes = `0${timeARGMinutes}`

        let hourFull = `${timeARGHours}:${timeARGMinutes}`
        console.log("hourFull", hourFull)
        
        let dateFull = `${dateFormatted.slice(0, 11)} ${hourFull}`

        const [rows] = await pool.query("INSERT INTO MoneyRegistry(total_amount, entered_amount, gain_expense, note, id_user, id_category, date) VALUES(?, ?, ?, ?, ?, ?, ?)", [totalAmount, amountFormatted, gain_expense, note, 1, categoryPosition, dateFull])

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
        const [rows] = await pool.query("SELECT id_moneyregistry, entered_amount, gain_expense, note, id_category, date FROM MoneyRegistry")
        
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

export const postNewUser = async (req, res) => {
    try {
        console.log(req.body)

        const {user, email, password, token} = req.body

        
        const { config, SES } = aws;

        console.log(AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY)

        config.update({
            credentials: {
                accessKeyId: AWS_ACCESS_KEY,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
            region: 'sa-east-1',
        });

        const ses = new SES({ apiVersion: '2010-12-01' });

        const params = {
            Destination: {
                ToAddresses: ["arielbritezdiaz@gmail.com"]
            },
            Message: {
                Body: {
                    Text: {
                        Data: "Cuerpo del mensaje de ejemplo"
                    }
                },
                Subject: {
                    Data: "Asunto de ejemplo"
                }
            },
            Source: "arielbritezdiaz@gmail.com"
        }

        ses.sendEmail(params, (error, data) => {
            if(error) {
                console.log("Error al enviar mail", error)
            } else {
                console.log("Correo enviado con éxito", data)
            }
        })

        res.status(200).send({
            user,
            email,
            password,
            navigation: "HomeScreen"
        })

        // const transporter = nodemailer.createTransport({
        //     host: '192.168.1.50',
        //     port: 25,
        //     secure: false,
        //     auth: {
        //       user: 'Administrator@192.168.1.50',
        //       pass: 'TomyTomaco2013',
        //     },
        //   });

        // const mailOptions = {
        //     from: "arielbritezdiaz@gmail.com",
        //     to: "arielbritex@gmail.com",
        //     subject: "Validación de correo electrónico",
        //     text: "Tu token de validación es " + token
        // }

        // try {
        //     await transporter.sendMail(mailOptions);
        //     res.status(200).send({
        //         user,
        //         email,
        //         password,
        //         navigation: "HomeScreen"
        //     })
        // } catch(error) {
        //     console.error("Error al enviar el correo electrónico", error)
        //     res.status(500).json({error})
        // }

        
    } catch(error) {
        return res.status(500).json({
            "message": "Internal server error"
        })
    }
}