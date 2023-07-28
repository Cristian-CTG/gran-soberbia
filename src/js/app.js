import axios from 'axios';
import fs from 'fs';
import { Router } from 'express';

const router = Router()

const apiUrl = 'https://gameinfo.albiononline.com/api/gameinfo';

// Endpoint para buscar información
const endpoint = '/guilds/gdwkqfrcQHq9loFSPVIx5A/members';
const endpoint2 = '/guilds/gdwkqfrcQHq9loFSPVIx5A';

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

  axios.get(apiUrl + endpoint2)
  .then(response => {
    // La respuesta de la API estará en la variable "response.data"
    
    nombre = response.data.Name;
    console.log('gremio es:' + nombre);
    dt = response.data
    const datosJSON = JSON.stringify(dt); 
    
    fs.writeFile('src/public/gremio.json', datosJSON, (err) => {
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


    // Ruta para renderizar el archivo EJS y pasar los datos del JSON como variables
    router.get('/', (req, res) => {res.render('index'); });

  


export default router