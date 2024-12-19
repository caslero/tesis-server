
/** tokenValidarUsuario es la encargada de generar el token para validar el
  usuario que se acaba de registrar */
  export const tokenValidarUsuario = (num) => {
    let result1 = Math.random().toString(34).substring(0, num);
    let result2 = Math.random().toString(34).substring(0, num);
    const token1 = result1
      .split("; ")
      .find((cookie) => cookie.startsWith("0."))
      .slice(2);
    const token2 = result2
      .split("; ")
      .find((cookie) => cookie.startsWith("0."))
      .slice(2);
  
    return token1 + token2;
  };