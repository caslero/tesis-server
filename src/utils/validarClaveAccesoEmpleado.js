
export function validarClaveAccesoEmpleado(req) {
  const { clave, claveDos } = req.body;

  if (!clave) {
    return {
      status: "error",
      numero: 0,
      message: "Clave vacia...",
    };
  } else if (!claveDos) {
    return {
      status: "error",
      numero: 0,
      message: "Clave confirmar vacia...",
    };
  } else if (clave !== claveDos) {
    return {
      status: "error",
      numero: 0,
      message: "Claves no coinciden...",
    };
  }

  return {
    status: "ok",
    numero: 1,
    message: "Campo clave correcto",
  };
}
