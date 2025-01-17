import { Router } from "express";
import { EmpleadosControlador } from "../controller/EmpleadosController.js";
import { LoginControlador } from "../controller/LoginController.js";

export const rutas = Router();

rutas.get("/", (req, res) => {
  res.send("Hola, esta es mi API en Node.js!");
});

rutas.post("/api/registrar-empleado", EmpleadosControlador.registrarEmpleado);
rutas.post("/validar/token", EmpleadosControlador.autenticarUsuario);
rutas.post("/api/registrar-clave", EmpleadosControlador.crearClave);
rutas.post("/api/verificar-autenticacion", EmpleadosControlador.verificarAutenticacion);
rutas.post("/api/usuario-activo", EmpleadosControlador.usuarioActivo);
rutas.post("/api/cambiar-clave-logueado", EmpleadosControlador.cambiarClaveUsuarioLogueado);
rutas.post("/api/todos-los-empleados", EmpleadosControlador.consultarTodosEmpleados);

rutas.post("/api/iniciar-sesion", LoginControlador.iniciarSesion);
