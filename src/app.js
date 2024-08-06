import express from 'express'
import authRoutes from './routes/authRoutes.js'

const app = express()
app.use(express.json())

app.use('/auth',authRoutes)

const PORT = process.env.port || 3000
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})