import { Router } from "express";
import { EmpleadosControlador } from "../controller/EmpleadosController.js";

export const rutas = Router();

rutas.get("/", (req, res) => {
  res.send("Hola, esta es mi API en Node.js!");
});

rutas.post("/api/registrar-empleado", EmpleadosControlador.registrarEmpleado);
rutas.post("/validar/token", EmpleadosControlador.autenticarUsuario);
rutas.post("/api/registrar-clave", EmpleadosControlador.crearClave);
