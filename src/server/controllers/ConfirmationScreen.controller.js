import { pool } from '../../../db.js'
import nodemailer from 'nodemailer';
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } from '../../../config.js';
import 'aws-sdk/lib/maintenance_mode_message.js';
import aws from 'aws-sdk'

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

        const { user, email, password, token } = req.body
        console.log(req.body)

        console.log("Hi")
        const { config, SES } = aws;
       
        config.update({
            credentials: {
                accessKeyId: AWS_ACCESS_KEY,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
            region: 'us-east-1'
        });

        const ses = new SES({ apiVersion: '2010-12-01' });

        const params = {
            Destination: {
                ToAddresses: ["arielbritezdiazworkeven@gmail.com"]
            },
            Message: {
                Body: {
                    Html: {
                        Data: `
                            <div style="padding: 15px; border: 1px solid #f5f5fa; border-radius: 5px; background-color: #0f0c0c;">
                                <p style="font-size: 16px; color: #f5f5fa;">Su token de verificación para <span style="color: #D39F00">Flit</span> es:</p>
                                <div style="margin-top: 10px; padding: 10px; background-color: #2f2f2f; border-radius: 5px;">
                                    <p style="font-size: 18px; color: #D39F00; margin: 0;">${token}</p>
                                </div>
                            </div>
                        `
                    }
                },
                Subject: {
                    Data: "Código de verificación de correo electrónico en Flit"
                }
            },
            Source: "arielbritezdiaz@gmail.com"
        };
        
        ses.sendEmail(params, (error, data) => {
            if(error) {
                console.log("Error al enviar el correo electrónico", error);
                return res.status(500).json({ message: "Error al enviar el correo electrónico" });
            } else {
                console.log("Correo electrónico enviado con éxito", data);
                return res.status(200).send({
                    user,
                    email,
                    password,
                    navigation: "HomeScreen"
                });
            }
        });
        
    } catch(error) {
        console.error("Error en el envío del correo electrónico", error);
        return res.status(500).json({ message: "Error en el envío del correo electrónico" });
    }
}