export function validarCamposInicioSesion(req) {
  try {
    const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const { correo, clave } = req.body;

    if (!correo) {
      return {
        status: "error",
        numero: 0,
        message: "Campo correo vacio...",
      };
    } else if (!clave) {
      return {
        status: "error",
        numero: 0,
        message: "Campo clave vacio...",
      };
    }

    if (!correoRegex.test(correo)) {
      return {
        status: "error",
        numero: 0,
        message: "Correo inválido...",
      };
    }

    return {
      status: "ok",
      numero: 1,
      message: "Campos válidos",
    };
  } catch (error) {
    console.log("Error, datos de inicio de sesion invalidos...");
  }
}
