import express from "express"; 
import dotenv from 'dotenv';
import conectarDb from './config/db.js';

const app = express();
dotenv.config();

conectarDb();
app.use('/', ( req, res ) => {
  res.send('hola mundo');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`)
});
