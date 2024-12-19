import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { rutas } from './src/router/router.js';

dotenv.config();



const app = express();
const port = process.env.PUERTO || 4000;

// Servir el favicon
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)
app.use(express.json()); 

app.use(rutas)

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});

// //Settings o Configuraciones
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://chat-vista-one.vercel.app", "https://chat-vista-7ujo.onrender.com", "http://localhost:5173");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });