import { conexion } from "../db/conexion.js";

export function crearTablaEmpleados() {
  const tablaEmpleados = "empleados";
  const consulta = `CREATE TABLE IF NOT EXISTS ${tablaEmpleados} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    correo VARCHAR(100) UNIQUE,
    telefono VARCHAR(15) UNIQUE,
    estado VARCHAR(50),
    municipio VARCHAR(50),
    parroquia VARCHAR(50),
    sector VARCHAR(50),
    direccion TEXT,
    fecha_ingreso DATETIME,
    tipo_usuario VARCHAR(13),
    token VARCHAR(16),
    clave VARCHAR(100),
    validar BOOLEAN,
    fecha_clave_creada DATETIME,
    id_user_crear INT,
    fecha_creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;
  conexion.query(consulta, (error, results) => {
    if (error) {
      console.log("Error al crear la tabla:", error);
    } else {
      //console.log(`Tabla: ${tablaEmpleados} creada/verificada...`);
    }
  });
}