import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { htmlEmailCambiarClave } from "../plantillas_correos/mailCambiarClave.js";
import { htmlEmail } from "../plantillas_correos/mailValEmpleado.js";
dotenv.config();

/**
const transporte = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CORREO_REMITENTE,
    pass: process.env.PASSWORD_REMITENTE,
  },
});

export async function sendMail(correo, nombre, validarUsuario) {
  const info = await transporte.sendMail({
    from: `${process.env.NOMBRE_REMITENTE} <${process.env.CORREO_REMITENTE}>`,
    to: `${correo}`,
    subject: `Hola ${nombre}, bienvenido a Nutrivida...`,
    html: `${htmlEmail(validarUsuario)}`,
  });
  return info;
}
*/

/** La const transporte es la encargada de hacer la conexion con mailtrap, la
 cual es un simulador para enviar correos */
export class EnviarCorreo {
  /** sendMail es para enviar correo al momento de registrar un empleado */
  static async sendMail(correo, nombre, validarUsuario) {
    const transporte = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const info = await transporte.sendMail({
      from: `${process.env.NOMBRE_REMITENTE} <${process.env.CORREO_REMITENTE}>`,
      to: correo,
      subject: `Hola ${nombre}, bienvenido a Nutrivida...`,
      html: htmlEmail(validarUsuario),
    });

    return info;
  }

  /** sendMailNuevaClave se encarga de enviar un token al correo para
      crear una clave nueva en caso de olvidar la anterior */
  static async sendMailNuevaClave(correo, nombre, validarUsuario) {
    const transporte = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const info = await transporte.sendMail({
      from: `${process.env.NOMBRE_REMITENTE} <${process.env.CORREO_REMITENTE}>`,
      to: correo,
      subject: `Hola ${nombre}, solicitud para cambiar tu clave en Nutrivida...`,
      html: htmlEmailCambiarClave(validarUsuario),
    });

    return info;
  }

  static async sendMailCrearClave(correo, nombre, validarUsuario) {
    const transporte = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CORREO_REMITENTE,
        pass: process.env.PASSWORD_REMITENTE,
      },
    });

    const info = await transporte.sendMail({
      from: `${process.env.NOMBRE_REMITENTE} <${process.env.CORREO_REMITENTE}>`,
      to: `${correo}`,
      subject: `Hola ${nombre}, bienvenido a Nutrivida...`,
      html: `${htmlEmail(validarUsuario)}`,
    });
    return info;
  }
}
