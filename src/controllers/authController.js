import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {JWT_EXPIRES_IN, JWT_SECRET} from '../config/config.js'


const users = [
    {id:1, username: 'pedro', password:bcrypt.hashSync('pedro1',8)},
    {id:2, username: 'juan', password:bcrypt.hashSync('juan2',8)}
]

export const login = async (req,res) =>{
    const {username,password}=req.body
    const user = users.find(user => user.username === username)

    if(!user || !bcrypt.compareSync(password, user.password)){
        return res.status(401).json({message: 'Credenciales incorrectas'})
    }

    const token = jwt.sign({id:user.id}, JWT_SECRET,{
        expiresIn: JWT_EXPIRES_IN
    })
    res.json({token})
}

export const verifyToken = (req, res) => {
    const token = req.headers['authorization']
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
        
            return res.status(401).json({ message: 'Token inválido o ha expirado' })
        }
        res.status(200).json({ message: 'Token válido', userId: decoded.id })
    })
}