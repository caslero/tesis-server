import { ModeloEmpleados } from "../model/EmpleadosModelo.js";
import { validarCamposInicioSesion } from "../utils/validarCamposInicioSesion.js";
import { Tokens } from "../services/tokens.js";
import bcryptjs from "bcryptjs";

export class LoginControlador {
  static async iniciarSesion(req, res) {
    try {
      const { correo, clave } = req.body;

      const validandoCampos = validarCamposInicioSesion(req);

      if (validandoCampos.status === "error") {
        return res.status(400).json({
          status: validandoCampos.status,
          numero: validandoCampos.numero,
          message: validandoCampos.message,
        });
      }

      const usuarioExiste = await ModeloEmpleados.datosInicioSesion(correo);
      

      if (!usuarioExiste) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Credenciales invalidadas...",
        });
      }

      const claveComparada = await bcryptjs.compare(clave, usuarioExiste.clave);

      if (claveComparada) {
        const tokenCookie = Tokens.tokenInicioSesion(correo);
        return res
          .status(201)
          .cookie("tesis", tokenCookie.token, tokenCookie.cookieOption)
          .json({
            status: "ok",
            numero: 1,
            message: "Iniciando sesion...",
            token: tokenCookie.token,
            redirect:
              usuarioExiste.tipo_usuario === "Administrador"
                ? "/empresa"
                : "/empleados",
          });
      } else {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Credenciales invalidas...",
        });
      }
    } catch (error) {
      console.log("Error, no se puede iniciar sesion... " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error, no se puede iniciar sesion...",
      });
    }
  }
}
