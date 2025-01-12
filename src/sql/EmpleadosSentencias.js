/** guardarEmpleado es la sentencia sql para registrar un empleado */
export function guardarEmpleado(req, token, id_user) {
  const { cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, correo, telefono, estado, municipio, parroquia, sector, direccion, fechaIngreso, tipoUser } = req.body;
  const registrarEmpleado = `INSERT INTO empleados(cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, telefono, estado, municipio, parroquia, sector, direccion, fecha_ingreso, tipo_usuario, token, clave, validar, fecha_clave_creada, id_user_crear, fecha_creado) VALUES ('${cedula}', '${primerNombre}', '${segundoNombre}', '${primerApellido}', '${segundoApellido}', '${correo}', '${telefono}', '${estado}', '${municipio}', '${parroquia}', '${sector}', '${direccion}', '${fechaIngreso}', '${tipoUser}', '${token}', '', 'false', '', '${id_user}', NOW())`;
  return registrarEmpleado;
}

/** datosUsuarioActivo es la sentencia sql para consultar datos del user activo*/
export function datosUsuarioActivo(correo) {
  const usuarioActivo = `SELECT cedula, primer_nombre, primer_apellido, correo, tipo_usuario FROM empleados WHERE correo = '${correo}'`;
  return usuarioActivo;
}

/** inicioSesionDatos es la sentencia sql para traer los datos para el 
  inicio de sesion */
export function inicioSesionDatos(correo) {
  const usuarioActivo = `SELECT correo, clave, tipo_usuario FROM empleados WHERE correo = '${correo}'`;
  return usuarioActivo;
}


/** existeEmpleado es la sentencia sql para consultar si existe o no un empleado*/
export function existeEmpleado(cedula) {
  const empleadoExiste = `SELECT COUNT(*) as count FROM empleados WHERE cedula = '${cedula}'`;
  return empleadoExiste;
}

/** existeEmpleado es la sentencia sql para consultar si existe o no un empleado*/
export function tokenComprobar(token) {
  //const comprobarToken = `SELECT COUNT(*) as count FROM empleados WHERE token = '${token}'`;
  const comprobarToken = `
  SELECT 
    CASE 
      WHEN COUNT(*) = 0 THEN 0
      WHEN validar = 0 THEN 1
      WHEN validar = 1 THEN 2
    END as result 
  FROM empleados 
  WHERE token = '${token}';
`;

  return comprobarToken;
}

/** guardarEmpleado es la sentencia sql para registrar un empleado */
export function claveEmpleadoCrear(clave, token) {
  const crearClaveEmpleado = `UPDATE empleados SET clave = '${clave}', validar = '1', fecha_clave_creada = NOW() WHERE token = '${token}'`;
  return crearClaveEmpleado;
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
