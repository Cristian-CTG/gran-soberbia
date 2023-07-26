import express from "express";
import ejs from 'ejs'
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import rout from "./js/app.js";

const app = express();
const port = process.env.PORT || 3000

const __dirname= dirname(fileURLToPath(import.meta.url))


app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(rout)
app.use(express.static(join(__dirname, 'public')))

app.listen(port)
console.log('Server escuchando en ruta 3000')