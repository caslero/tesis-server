import { createConnection } from "mysql";
import { config } from "dotenv";
import { crearTablaEmpleados } from "../db_tablas/tablaEmpleados.js";

config();

export const conexion = createConnection({
  host: process.env.SERVIDOR,
  user: "root" || process.env.USUARIO,
  password: process.env.CLAVE,
});

function crearBaseDeDatos() {
  const nombreDB = process.env.DB;
  conexion.query(
    `CREATE DATABASE IF NOT EXISTS \`${nombreDB}\``,
    (error, results) => {
      if (error) {
        console.log("Error al crear la base de datos:", error);
      } else {
        //console.log("Base de datos verificada/creada...");
        conectarBaseDeDatos(nombreDB);  // Conectar a la base de datos después de crearla
      }
    }
  );
}

function conectarBaseDeDatos(nombreDB) {
  conexion.changeUser({ database: nombreDB }, (error) => {
    if (error) {
      console.log("Error al seleccionar la base de datos:", error);
    } else {
      //console.log("Base de datos seleccionada: " + nombreDB);
      crearTablaEmpleados();  // Crear la tabla empleados después de conectar a la base de datos
    }
  });
}


export function conectar() {
  conexion.connect((error) => {
    if (error) {
      console.log("Error al conectar la base de datos:", error);
    } else {
      console.log("Base de datos conectada con exito...");
      crearBaseDeDatos();
    }
  });
}
