/** htmlEmail es una plantilla html que es un diseño para el correo que le llegara
    al Empleado para validarse, esto incluye el link que debe clickear */
    export const htmlEmail = (validarEmpleado) => {
        const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
          </head>
          <body>
              <section>
                  <h1>Bienvenido: </h1>
                  <div>
                      <p>Bienvenido a Nutrivida:</p>
                  </div>
                  <div>
                      <p>Haz click en el siguiente enlace para crear una contraseña</p>
                      <a href="http://localhost:5173/validar/${validarEmpleado}">http://localhost:5173/validar/${validarEmpleado}</a>
                  </div>
              </section>    
          </body>
          </html>
          `;
        return html;
      };
      
      
      