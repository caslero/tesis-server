import { tokenValidarUsuario } from "../utils/tokenValidarEmpleado.js";
import { sendMail } from "../utils/sendMailValEmpleado.js";

/** Aqui comenzaremos a trabajarpara el registro de usuarios, cosa que ya
 recibe datos desde el front-end y retorna una respuesta. Vamos agregar una
 funcion de correo para que a la hora de registrar el empleado envie un enlace
 al correo para que el empleado cree una clave para tener un usuario para
 entrar al sistema 
 */
export class EmpleadosControlador {
  static async registrarEmpleado(req, res) {
    try {
      const {
        cedula,
        primerNombre,
        segundoNombre,
        primerApellido,
        segundoApellido,
        correo,
        telefono,
        estado,
        municipio,
        parroquia,
        sector,
        direccion,
        fechaIngreso,
        tipoUser,
      } = req.body;

      const tokenUnicoValidarEmpleado = tokenValidarUsuario(10);

      if (cedula) {
        sendMail(correo, primerNombre, tokenUnicoValidarEmpleado);
        
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Empleado registrado...",
          tokenValidacion: tokenUnicoValidarEmpleado,
        });
      } else {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Error al registrar...",
          tokenValidacion: tokenUnicoValidarEmpleado,
        });
      }
    } catch (error) {
      console.log("Error al guardar empleado: " + error);
    }
  }

  /** La funcion autenticarUsuario se encarga de autenticar el usuario mediante el
    token que se envio al correo y guarda la fecha cuando se autentico */
  static async autenticarUsuario(req, res) {
    try {
      const tokenAuth = req.body.token;

      if (tokenAuth.length != 16) {
        return res.send({
          status: "error",
          numero: 0,
          message: "Token invalido",
        });
      } else {
        //const autenticado = await UsuarioModelo.estaAutenticado(tokenAuth);

        const autenticado = 1;
        if (autenticado === 1) {
          return res.status(201).json({
            status: "ok",
            numero: 1,
            message: "token valido",
          });
        }
        /**
            if (autenticado === 1) {
              res.send({
                status: "ok",
                numero: 1,
                message: "Usuario ya esta autenticado",
              });
            } else if (autenticado === 2) {
              const tokenValidado = await UsuarioModelo.autenticarUsuario(
                tokenAuth
              );
              if (tokenValidado) {
                res.send({
                  status: "ok",
                  numero: 1,
                  message: "Autenticado con exito",
                });
              }
            } else {
              res.send({
                status: "error",
                numero: 0,
                message: "Fallo al autenticar",
              });
            }
          */
      }
    } catch (error) {
      console.log("Error token invalido: " + error);
      return res.status(400).send({
        status: "error",
        numero: 0,
        message: "Token invalido",
      });
    }
  }

  static async crearClave(req, res) {
    try {
      const { clave, confirmarClave } = req.body;

      console.log("Clave: " + clave);
      console.log("Clave confirmar: " + confirmarClave);

      if (clave) {
        return res.status(201).json({
          status: "ok",
          numero: 1,
          message: "Clave creada con exito...",
        });
      } else {
        return res.status(400).json({
          status: "error",
          numero: 0,
          message: "Clave no creada...",
        });
      }
    } catch (error) {
      console.log("Error al crear clave: " + error);
    }
  }
}

/** 
        console.log('Cedula: ' + cedula);
        console.log('Primer nombre: ' + primerNombre);
        console.log('Segundo nombre: ' + segundoNombre);
        console.log('Primer apellido: ' + primerApellido);
        console.log('Segundo apellido: ' + segundoApellido);
        console.log('Correo: ' + correo);
        console.log('Telefono: ' + telefono);
        console.log('Estado: ' + estado);
        console.log('Municipio: ' + municipio);
        console.log('Parroquia: ' + parroquia);
        console.log('Sector: ' + sector);
        console.log('Direccion: ' + direccion);
        console.log('Fecha de ingreso: ' + fechaIngreso);
        console.log('Tipo de usuario: ' + tipoUser);
      */
