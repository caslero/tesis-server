import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { htmlEmail } from "../plantillas/mailValEmpleado.js";

dotenv.config();

console.log('Host de nodemailer: ' + process.env.HOST);


/** La const transporte es la encargada de hacer la conexion con mailtrap, la
        cual es un simulador para enviar correos */
let transporte = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});


export async function sendMail(correo, nombre, validarUsuario) {
    const info = await transporte.sendMail({
      from: `${process.env.REMITENTE} <${process.env.CORREO_REMITENTE}>`,
      to: `${correo}`,
      subject: `Hola ${nombre}, bienvenido a Nutrivida...`,
      html: `${htmlEmail(validarUsuario)}`,
    });
    return info;
  }