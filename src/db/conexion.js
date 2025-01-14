import { createConnection } from "mysql";
import pg from 'pg';
import dotenv from "dotenv";
import { crearTablaEmpleados, crearTablaEmpleadosLocal } from "../db_tablas/tablaEmpleados.js";

dotenv.config();

const { Pool } = pg;


export const conexion = new Pool({
  connectionString: process.env.POSTGRES_URL_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});



async function crearBaseDeDatos() {
  const nombreDB = process.env.POSTGRES_URL_DATABASE;
  try {
    const client = await conexion.connect();
    const result = await client.query(
      `CREATE DATABASE ${nombreDB}` 
    );
    console.log("Base de datos verificada/creada...");
    client.release();
    conectarBaseDeDatos(nombreDB);  // Conectar a la base de datos después de crearla
  } catch (error) {
    if (error.code === '42P04') {
      // Código de error 42P04 significa que la base de datos ya existe en PostgreSQL
      console.log("La base de datos ya existe...");
      conectarBaseDeDatos(nombreDB);  // Conectar a la base de datos si ya existe
    } else {
      console.log("Error al crear la base de datos:", error);
    }
  }
}

async function conectarBaseDeDatos(nombreDB) {
  try {
    const client = await conexion.connect();
    await client.query(`SET search_path TO ${nombreDB}`);
    console.log("Base de datos seleccionada: " + nombreDB);
    crearTablaEmpleados(client);  // Crear la tabla empleados después de conectar a la base de datos
    client.release();
  } catch (error) {
    console.log("Error al seleccionar la base de datos:", error);
  }
}

export async function conectar() {
  try {
    const client = await conexion.connect();
    console.log("Base de datos conectada con éxito...");
    client.release();
    await crearBaseDeDatos();
  } catch (error) {
    console.log("Error al conectar la base de datos:", error);
  }
}



/** 
export const conexion = new pg.Pool({
  user: process.env.POSTGRES_URL_USER,
  host: process.env.POSTGRES_URL_HOST,
  database: process.env.POSTGRES_URL_DATABASE,
  password: process.env.POSTGRES_URL_PASSWORD,
  port: process.env.PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function crearBaseDeDatos() {
  const nombreDB = process.env.POSTGRES_URL_DATABASE;
  try {
    const client = await conexion.connect();
    const result = await client.query(
      `CREATE DATABASE ${nombreDB}`
    );
    console.log("Base de datos verificada/creada...");
    client.release();
    conectarBaseDeDatos(nombreDB);  // Conectar a la base de datos después de crearla
  } catch (error) {
    if (error.code === '42P04') {
      // Código de error 42P04 significa que la base de datos ya existe en PostgreSQL
      console.log("La base de datos ya existe...");
      conectarBaseDeDatos(nombreDB);  // Conectar a la base de datos si ya existe
    } else {
      console.log("Error al crear la base de datos:", error);
    }
  }
}

async function conectarBaseDeDatos(nombreDB) {
  try {
    const client = await conexion.connect();
    await client.query(`SET search_path TO ${nombreDB}`);
    console.log("Base de datos seleccionada: " + nombreDB);
    crearTablaEmpleados(client);  // Crear la tabla empleados después de conectar a la base de datos
    client.release();
  } catch (error) {
    console.log("Error al seleccionar la base de datos:", error);
  }
}

export async function conectar() {
  try {
    const client = await conexion.connect();
    console.log("Base de datos conectada con éxito...");
    client.release();
    await crearBaseDeDatos();
  } catch (error) {
    console.log("Error al conectar la base de datos:", error);
  }
}
*/






/** 
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
*/