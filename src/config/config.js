import {config} from 'dotenv'

config()

export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
export const PORT = process.env.PORT || 3000