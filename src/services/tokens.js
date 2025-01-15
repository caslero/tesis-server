import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class Tokens {
  /** tokenValidarUsuario es la encargada de generar el token al momento de
  registrar un nuevo empleado y tambien sirve para generar un token para
  el cambio de clave por olvido */
  static tokenValidarUsuario(num) {
    let result1 = Math.random().toString(34).substring(0, num);
    let result2 = Math.random().toString(34).substring(0, num);
    const token1 = result1
      .split("; ")
      .find((cookie) => cookie.startsWith("0."))
      .slice(2);
    const token2 = result2
      .split("; ")
      .find((cookie) => cookie.startsWith("0."))
      .slice(2);

    return token1 + token2;
  }

  /** tokenInicioSesion token creado para poder iniciar sesion */
  static tokenInicioSesion(correo) {
    try {
      const token = jsonwebtoken.sign(
        {
          correo: correo,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );

      const cookieOption = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        path: "/",
        httpOnly: true,
      };

      return {
        status: "ok",
        numero: 1,
        message: "Token/cookie creadas con exito...",
        token: token,
        cookieOption: cookieOption,
      };
    } catch (error) {
      console.error("Error al generar el token o la cookie:", error);
      return {
        status: "error",
        numero: 0,
        message: "Error al crear token/cookie...",
      };
    }
  }

  /** descifrarToken se encarga de descifrar el token y retorna si es
    correcto o no */
  static descifrarToken(token) {
    try {
      const descifrada = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      
      return {
        status: "ok",
        numero: 1,
        message: "Token valido...",
        isValido: true,
        correo: descifrada.correo,
      };
    } catch (error) {
      console.log("Error al descifrar el token:", error.message);
      return {
        status: "error",
        numero: 0,
        message: "Token incorrecto...",
        isValido: false,
        correo: "",
      };
    }
  }
}
