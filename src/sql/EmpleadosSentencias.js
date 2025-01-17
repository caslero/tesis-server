/** guardarEmpleado es la sentencia sql para registrar un empleado */
export function guardarEmpleado(req, token, id_user) {
  const { cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, correo, telefono, estado, municipio, parroquia, sector, direccion, fechaIngreso, tipoUser } = req.body;
  const registrarEmpleado = `INSERT INTO empleados(cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, telefono, estado, municipio, parroquia, sector, direccion, fecha_ingreso, tipo_usuario, token, clave, validar, fecha_clave_creada, id_user_crear, fecha_creado) VALUES ('${cedula}', '${primerNombre}', '${segundoNombre}', '${primerApellido}', '${segundoApellido}', '${correo}', '${telefono}', '${estado}', '${municipio}', '${parroquia}', '${sector}', '${direccion}', '${fechaIngreso}', '${tipoUser}', '${token}', '', 'false', null, '${id_user}', NOW())`;
  return registrarEmpleado;
}

/** datosUsuarioActivo es la sentencia sql para consultar datos del user activo*/
export function datosUsuarioActivo(correo) {
  const usuarioActivo = `SELECT cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_ingreso, correo, telefono, estado, municipio, parroquia, direccion, tipo_usuario FROM empleados WHERE correo = '${correo}'`;
  return usuarioActivo;
}

/** inicioSesionDatos es la sentencia sql para traer los datos para el 
  inicio de sesion */
export function inicioSesionDatos(correo) {
  const usuarioActivo = `SELECT id, correo, clave, tipo_usuario FROM empleados WHERE correo = '${correo}'`;
  return usuarioActivo;
}

/** existeEmpleado es la sentencia sql para consultar si existe o no un empleado*/
export function existeEmpleado(cedula) {
  const empleadoExiste = `SELECT COUNT(*) as count FROM empleados WHERE cedula = '${cedula}'`;
  return empleadoExiste;
}

/** existeEmpleado es la sentencia sql para consultar si existe o no un empleado*/
export function tokenComprobar(token) {
  const comprobarToken = `
    SELECT 
      CASE 
        WHEN COUNT(*) = 0 THEN 2
        WHEN BOOL_OR(validar = false) THEN 1
        ELSE 0
      END as result 
    FROM empleados 
    WHERE token = '${token}';
  `;
  return comprobarToken;
}

/** guardarEmpleado es la sentencia sql para registrar un empleado */
export function claveEmpleadoCrear(clave, token) {
  const crearClaveEmpleado = `UPDATE empleados SET clave = '${clave}', validar = 'true', fecha_clave_creada = NOW() WHERE token = '${token}'`;
  return crearClaveEmpleado;
}

/** obtenerClaveParaCambiarla es la sentencia sql para consultar una clave y
  compararla de manera que si es correcta se pueda hacer el cambio de clave */
export function obtenerClaveParaCambiarla(correo) {
    const claveCambiar = `SELECT clave FROM empleados WHERE correo = '${correo}'`;
    return claveCambiar;
}

/** claveCambiadaUsuarioLogueado es la sentencia sql para cambiar la clave de
  un usuario cuando el mismo este logueado */
export function claveCambiadaUsuarioLogueado(clave, correo) {
  const claveCambiada = `UPDATE empleados SET clave = '${clave}' WHERE correo = '${correo}'`;
  return claveCambiada;
}

/** empleadosTodos es la sentencia sql para consultar todos los empleados */
  export function empleadosTodos(correo) {
    const todosEmpleados = `SELECT id, cedula, correo, direccion, estado, fecha_ingreso, fecha_creado, municipio, parroquia, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, telefono, tipo_usuario FROM empleados ORDER BY cedula ASC`;
    return todosEmpleados;
  }





/** La funcion usuarioAutenticado se encarga de autenticar el usuario para poder
    iniciar sesion y guardar la fecha en la que se autentico */
export function usuarioAutenticado(token) {
  let authUsuario = `UPDATE usuario SET autenticar = 'true', fvalidado = NOW() WHERE token = '${token}'`;
  return authUsuario;
}

/** La funcion cambioClaveUsuario cambia la clave desde una clave existente */
export function cambioClaveUsuario(correo, clave) {
  let cambioClave = `UPDATE usuario SET clave = '${clave}' WHERE correo = '${correo}'`;
  return cambioClave;
}

/** La funcion saveTokenCambioClave guarda un token solicitado para el cambio
      de clave */
export function saveTokenCambioClave(correo, token) {
  let guardarTokenCambioClave = `INSERT INTO tokens(token, correo, utilizado, fsolicitud, vencido) VALUES ('${token}', '${correo}', 'false', NOW(), 'false')`;
  return guardarTokenCambioClave;
}
