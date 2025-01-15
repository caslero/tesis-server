import { conexion } from "../db/conexion.js";
import {
  guardarEmpleado,
  datosUsuarioActivo,
  inicioSesionDatos,
  existeEmpleado,
  tokenComprobar,
  claveEmpleadoCrear,
} from "../sql/EmpleadosSentencias.js";

export class ModeloEmpleados {
  /** La funcion registrarEmpleado de encarga de guardar el nuevo empleado */
  static async registrarEmpleado(req, token, id_user) {
    return new Promise((resolve) => {
      conexion.query(
        guardarEmpleado(req, token, id_user),
        function (error, resultado) {
          if (!error) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  /** La funcion usuarioActivo se encarga de traernos el nombre de usuario,
    correo y otros datos que se necesiten en caso de que el usuario exista
    para iniciar sesion */
  static async usuarioActivo(correo) {
    return new Promise((resolve) => {
      conexion.query(datosUsuarioActivo(correo), function (error, resultado) {
        if (!error) {
          resolve(resultado.rows[0]);
        } else {
          resolve(false);
        }
      });
    });
  }

  /** La funcion empleadoExiste se encargar de consultar si existe o no el
    empleado a la hora de registrar uno nuevo */
  static async empleadoExiste(cedula) {
    return new Promise((resolve) => {
      conexion.query(existeEmpleado(cedula), function (error, resultado) {
        if (!error) {
          const existe = resultado.rows[0].count > 0 ? 1 : 0;
          resolve(existe);
        } else {
          console.log("Error en la consulta: ", error);
          resolve(0);
        }
      });
    });
  }

  /** La funcion comprobarToken se encarga de verificar si el token aun no se
    usado y si es valido o no */
  static async comprobarToken(token) {
    return new Promise((resolve) => {
      conexion.query(tokenComprobar(token), function (error, resultado) {
        if (!error) {
          resolve(resultado.rows[0]);
        } else {
          resolve(false);
        }
      });
    });
  }

  /** La funcion crearClaveEmpleado guardara la clave para que el usuario pueda
    iniciar sesion mas adelante */
  static async crearClaveEmpleado(clave, token) {
    return new Promise((resolve) => {
      conexion.query(
        claveEmpleadoCrear(clave, token),
        function (error, resultado) {
          if (!error) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  }

  /** La funcion datosInicioSesion se encarga de traer los datos del usuario que
    iniciara sesion */
  static async datosInicioSesion(correo) {
    return new Promise((resolve) => {
      conexion.query(inicioSesionDatos(correo), function (error, resultado) {
        if (!error) {
          resolve(resultado.rows[0]);
        } else {
          resolve(false);
        }
      });
    });
  }
  
}
