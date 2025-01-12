export function validarCampos(req) {
  const cedulaRegex = /^[1-9][0-9]{4,7}$/;
  const nombresApellidosRegex =
    /^[a-zA-Zà-ÿÀ-Ÿ\u00f1\u00d1\u00e7\u00c7]+([ '-][a-zA-Zà-ÿÀ-Ÿ\u00f1\u00d1\u00e7\u00c7]+)*$/;
  const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const telefonoRegex = /^\+?[0-9\s\-()]{7,15}$/; // Esto cubre varios formatos internacionales de números de teléfono

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

  const camposObligatorios = [
    { campo: cedula, nombre: "cedula" },
    { campo: primerNombre, nombre: "primerNombre" },
    { campo: segundoNombre, nombre: "segundoNombre" },
    { campo: primerApellido, nombre: "primerApellido" },
    { campo: segundoApellido, nombre: "segundoApellido" },
    { campo: correo, nombre: "correo" },
    { campo: telefono, nombre: "telefono" },
    { campo: estado, nombre: "estado" },
    { campo: municipio, nombre: "municipio" },
    { campo: parroquia, nombre: "parroquia" },
    { campo: sector, nombre: "sector" },
    { campo: direccion, nombre: "direccion" },
    { campo: fechaIngreso, nombre: "fechaIngreso" },
    { campo: tipoUser, nombre: "tipoUser" },
  ];

  for (let i = 0; i < camposObligatorios.length; i++) {
    if (!camposObligatorios[i].campo) {
      return {
        status: "error",
        numero: 0,
        message: `El campo ${camposObligatorios[i].nombre} está vacío...`,
      };
    }
  }

  if (!cedulaRegex.test(cedula)) {
    return {
      status: "error",
      numero: 0,
      message: "Cédula inválida...",
    };
  } else if (!nombresApellidosRegex.test(primerNombre)) {
    return {
      status: "error",
      numero: 0,
      message: "Primer nombre inválido...",
    };
  } else if (!nombresApellidosRegex.test(segundoNombre)) {
    return {
      status: "error",
      numero: 0,
      message: "Segundo nombre inválido...",
    };
  } else if (!nombresApellidosRegex.test(primerApellido)) {
    return {
      status: "error",
      numero: 0,
      message: "Primer apellido inválido...",
    };
  } else if (!nombresApellidosRegex.test(segundoApellido)) {
    return {
      status: "error",
      numero: 0,
      message: "Segundo apellido inválido...",
    };
  } else if (!correoRegex.test(correo)) {
    return {
      status: "error",
      numero: 0,
      message: "Correo inválido...",
    };
  } else if (!telefonoRegex.test(telefono)) {
    return {
      status: "error",
      numero: 0,
      message: "Teléfono inválido...",
    };
  }

  return {
    status: "ok",
    numero: 1,
    message: "Campos válidos",
  };
}
