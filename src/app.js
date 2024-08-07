import express from 'express'
import authRoutes from './routes/authRoutes.js'
import {PORT} from './config/config.js'

const app = express()
app.use(express.json())

app.use('/auth',authRoutes)

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})