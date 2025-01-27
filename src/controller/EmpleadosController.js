import { ModeloEmpleados } from "../model/EmpleadosModelo.js";
import { EnviarCorreo } from "../services/sendMailValEmpleado.js";
import { Tokens } from "../services/tokens.js";
import { validarCampos } from "../utils/validarCamposEmpleados.js";
import { validarClaveAccesoEmpleado } from "../utils/validarClaveAccesoEmpleado.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

/** */
export class EmpleadosControlador {
  static async registrarEmpleado(req, res) {
    try {
      const { cedula, primerNombre, correo, token } = req.body;

      const validandoCampos = validarCampos(req);
      const existeEmpleado = await ModeloEmpleados.empleadoExiste(cedula);

      if (existeEmpleado === 1) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Empleado ya existe...",
        });
      }

      if (validandoCampos.status === "error") {
        return res.status(400).json({
          status: validandoCampos.status,
          numero: validandoCampos.numero,
          message: validandoCampos.message,
        });
      }

      const tokenUnicoValidarEmpleado = Tokens.tokenValidarUsuario(10);

      const tokenDecodificado = Tokens.descifrarToken(token);

      if (tokenDecodificado.status === "error") {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error de credenciales...",
        });
      }

      const { id } = await ModeloEmpleados.datosInicioSesion(
        tokenDecodificado.correo
      );

      const crearEmpleado = await ModeloEmpleados.registrarEmpleado(
        req,
        tokenUnicoValidarEmpleado,
        id
      );

      if (crearEmpleado) {
        //EnviarCorreo.sendMail(correo, primerNombre, tokenUnicoValidarEmpleado);
        EnviarCorreo.sendMailCrearClave(
          correo,
          primerNombre,
          tokenUnicoValidarEmpleado
        );

        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Empleado registrado con éxito...",
        });
      } else {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error al registrar el empleado...",
        });
      }
    } catch (error) {
      console.log("Error al guardar empleado: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error, no se guardo el empleado...",
      });
    }
  }

  /** La funcion autenticarUsuario se encarga de autenticar el usuario mediante el
    token que se envio al correo y guarda la fecha cuando se autentico */
  static async autenticarUsuario(req, res) {
    try {
      const { token } = req.body;

      if (token && token.length != 16) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Token invalido",
        });
      }

      const autenticado = await ModeloEmpleados.comprobarToken(token);
      if (autenticado && autenticado.result === 0) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Token invalido",
          redirect: "/",
        });
      } else if (autenticado && autenticado.result === 1) {
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "token valido",
        });
      } else {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Token usado",
          redirect: "/",
        });
      }
    } catch (error) {
      console.log("Error token invalido: " + error);
      return res.status(500).send({
        status: "error",
        numero: 0,
        message: "Token invalido",
        redirect: "/",
      });
    }
  }

  static async crearClave(req, res) {
    try {
      const { clave, claveDos, token } = req.body;

      const claveValidada = validarClaveAccesoEmpleado(clave, claveDos);

      if (claveValidada.status === "error") {
        return res.status(400).json({
          status: claveValidada.status,
          numero: claveValidada.numero,
          message: claveValidada.message,
        });
      }

      const encriptado = await bcryptjs.genSalt(5);
      const claveEncriptada = await bcryptjs.hash(clave, encriptado);

      const crearClave = await ModeloEmpleados.crearClaveEmpleado(
        claveEncriptada,
        token
      );

      if (crearClave) {
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Clave creada con exito...",
          redirect: "/",
        });
      } else {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, no se creo la clave...",
        });
      }
    } catch (error) {
      console.log("Error al crear clave: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error al crear clave...",
      });
    }
  }

  /** La funcion verificarAutenticacion se encarga de recibir el token y
    decodificarlo, si es corecto se inicia sesion */
  static async verificarAutenticacion(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error token vacio...",
          isValido: false,
        });
      }

      const decodificada = Tokens.descifrarToken(token);

      if (decodificada.status === "ok") {
        return res.status(201).json({
          status: decodificada.status,
          numero: decodificada.numero,
          message: decodificada.message,
          isValido: decodificada.isValido,
          correo: decodificada.correo,
        });
      } else {
        return res.status(400).json({
          status: decodificada.status,
          numero: decodificada.numero,
          message: decodificada.message,
          isValido: decodificada.isValido,
          correo: decodificada.correo,
        });
      }
    } catch (error) {
      console.log("Error, al verificar token...");
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error al procesar token...",
        isValido: false,
      });
    }
  }

  static async usuarioActivo(req, res) {
    try {
      const { token } = req.body;

      const tokenDescifrado = Tokens.descifrarToken(token);

      if (tokenDescifrado.status === "error") {
        return res.status(400).json({
          status: tokenDescifrado.status,
          numero: tokenDescifrado.numero,
          message: tokenDescifrado.message,
        });
      }

      const datosUsuarioActivo = await ModeloEmpleados.usuarioActivo(
        tokenDescifrado.correo
      );

      if (datosUsuarioActivo) {
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Usuario activo",
          datos: datosUsuarioActivo,
        });
      } else {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "No hay datos de usuario",
        });
      }
    } catch (error) {
      console.log("Error, al consultar user activo: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error, al consultar user activo...",
      });
    }
  }

  static async cambiarClaveUsuarioLogueado(req, res) {
    try {
      const { claveVieja, claveNuevaUno, claveNuevaDos, token } = req.body;

      const formatoDeClaveCorrecto = validarClaveAccesoEmpleado(
        claveNuevaUno,
        claveNuevaDos
      );

      if (formatoDeClaveCorrecto.status === "error") {
        return res.status(400).json({
          status: formatoDeClaveCorrecto.status,
          numero: formatoDeClaveCorrecto.numero,
          message: formatoDeClaveCorrecto.message,
        });
      }

      const tokenDecodificado = Tokens.descifrarToken(token);
      const { correo } = tokenDecodificado;

      if (tokenDecodificado.status === "error") {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error al cambiar la clave...",
        });
      }

      const { clave } = await ModeloEmpleados.obtenerClaveActual(correo);
      if (!clave) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error al intentar cammbio de clave...",
        });
      }

      const claveValida = await bcryptjs.compare(claveVieja, clave);
      if (!claveValida) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, clave actual invalida...",
        });
      }

      const encriptado = await bcryptjs.genSalt(5);
      const claveEncriptada = await bcryptjs.hash(claveNuevaUno, encriptado);

      const claveCambiada = await ModeloEmpleados.claveCambiadaUsuarioLogueado(
        claveEncriptada,
        correo
      );

      if (claveCambiada) {
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Clave cambiada con exito...",
        });
      } else {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error, no se cambio la clave...",
        });
      }
    } catch (error) {
      console.log("Error, al cambiar clave logueado: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error al cambiar clave",
      });
    }
  }

  static async consultarTodosEmpleados(req, res) {
    try {
      const { token } = req.body;
      const descifrarToken = Tokens.descifrarToken(token);

      if (descifrarToken.status === "error") {
        return res.status(400).json({
          status: descifrarToken.status,
          numero: descifrarToken.numero,
          message: descifrarToken.message,
        });
      }

      const todosLosEmpleados = await ModeloEmpleados.todosLosEmpleados(
        descifrarToken.correo
      );

      if (!todosLosEmpleados) {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error al mostrar empleados...",
        });
      } else {
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Todos los empleados...",
          todosLosEmpleados: todosLosEmpleados,
        });
      }
    } catch (error) {
      console.log("Error, al consultar empleados: " + error);
      return res.status(500).json({
        status: "error",
        numero: 0,
        message: "Error al consultar empleados...",
      });
    }
  }
}
