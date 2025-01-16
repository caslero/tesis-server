export function validarClaveAccesoEmpleado(clave, claveDos) {
  const claveRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{5,16}$/;

  if (!clave) {
    return {
      status: "error",
      numero: 0,
      message: "Clave vacia...",
    };
  }

  if (!claveDos) {
    return {
      status: "error",
      numero: 0,
      message: "Clave confirmar vacia...",
    };
  }

  if (clave !== claveDos) {
    return {
      status: "error",
      numero: 0,
      message: "Claves no coinciden...",
    };
  }

  if (clave.length < 5 || clave.length > 16) {
    return {
      status: "error",
      numero: 0,
      message: "Clave debe ser entre 5 y 16 caracteres...",
    };
  }

  if (claveDos.length < 5 || claveDos.length > 16) {
    return {
      status: "error",
      numero: 0,
      message: "Clave debe ser entre 5 y 16 caracteres...",
    };
  }

  const claveValida = claveRegex.test(clave);
  if (!claveValida) {
    return {
      status: "error",
      numero: 0,
      message: "Formato de clave invalida...",
    };
  }

  return {
    status: "ok",
    numero: 1,
    message: "Campo clave correcto",
  };
}
