import express from 'express'
import morgan from 'morgan' 
import autrutas from './rutas/autrutas.js'


const app = express()
app.use(autrutas)
app.use(morgan('dev'))
app.listen(4000)
console.log('Servidor en el puerto 4000')
