import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { htmlEmail } from "../plantillas/mailValEmpleado.js";


dotenv.config();


const transporte = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CORREO_REMITENTE,
    pass: process.env.PASSWORD_REMITENTE
  }
});

export async function sendMail(correo, nombre, validarUsuario) {
  console.log(correo, nombre, validarUsuario);
  
  const info = await transporte.sendMail({
    from: `${process.env.NOMBRE_REMITENTE} <${process.env.CORREO_REMITENTE}>`,
    to: `${correo}`,
    subject: `Hola ${nombre}, bienvenido a Nutrivida...`,
    html: `${htmlEmail(validarUsuario)}`,
  });
  return info;
}



/** 
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail(correo, nombre, validarUsuario) {
  console.log(correo, nombre, validarUsuario);
  
  try {
    const info = await resend.emails.send({
      from: `${process.env.REMITENTE} <${process.env.CORREO_REMITENTE}>`,
      to: `${correo}`,
      subject: `Hola ${nombre}, bienvenido a Nutrivida...`,
      html: `${htmlEmail(validarUsuario)}`
    });
    return info;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
}
*/



/** La const transporte es la encargada de hacer la conexion con mailtrap, la
        cual es un simulador para enviar correos
let transporte = nodemailer.createTransport({
  host: `${process.env.HOST}`,
  port: `${process.env.PORT}`,
  auth: {
    user: `${process.env.USER}`,
    pass: `${process.env.PASS}`,
  },
});


export async function sendMail(correo, nombre, validarUsuario) {
  console.log(correo, nombre, validarUsuario);
  
  const info = await transporte.sendMail({
    from: `${process.env.REMITENTE} <${process.env.CORREO_REMITENTE}>`,
    to: `${correo}`,
    subject: `Hola ${nombre}, bienvenido a Nutrivida...`,
    html: `${htmlEmail(validarUsuario)}`,
  });
  return info;
}
 */


/** 
const transporte = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CORREO_REMITENTE,
    pass: process.env.PASSWORD_REMITENTE
  },
  logger: true, // Habilitar registro detallado
  debug: true // Habilitar modo depuración
});

export async function sendMail(correo, nombre, validarUsuario) {
  console.log(correo, nombre, validarUsuario);
  
  const info = await transporte.sendMail({
    from: `${process.env.REMITENTE} <${process.env.CORREO_REMITENTE}>`,
    to: `${correo}`,
    subject: `Hola ${nombre}, bienvenido a Nutrivida...`,
    html: `${htmlEmail(validarUsuario)}`,
  });
  return info;
}
*/