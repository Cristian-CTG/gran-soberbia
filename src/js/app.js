import axios from 'axios';
import fs from 'fs';
import { Router } from 'express';

const router = Router()

const apiUrl = 'https://gameinfo.albiononline.com/api/gameinfo';

// Endpoint para buscar información
const endpoint = '/guilds/gdwkqfrcQHq9loFSPVIx5A/members';
var dt = {};
let nombre;
// Realizar el llamado a la API usando Axios
axios.get(apiUrl + endpoint)
  .then(response => {
    // La respuesta de la API estará en la variable "response.data"
    
    nombre = response.data[0].Name;
    console.log('nombre es:' + nombre);
    dt = response.data
    const datosJSON = JSON.stringify(dt); 
    
    fs.writeFile('src/public/miembros.json', datosJSON, (err) => {
      if (err) {
        console.error('Error al escribir el archivo:', err);
      } else {
        console.log('Archivo JSON creado exitosamente.');
      }
    });

  })
  .catch(error => {
    console.error('Error al hacer el llamado a la API:', error);
  });

  fs.readFile('src/public/miembros.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON:', err);
      return;
    }
  
    // Analizar el contenido JSON para obtener un objeto JavaScript
    const jsonData = JSON.parse(data);
  
    // Ruta para renderizar el archivo EJS y pasar los datos del JSON como variables
    router.get('/', (req, res) => {res.render('index', { data: jsonData }); });
  })
  


export default router