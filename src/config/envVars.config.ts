import * as dotenv from 'dotenv'

dotenv.config()

export const envVars = {
  PORT: process.env.PORT,
  DATABASEURI: process.env.MONGODB_URI,
  JWTSECRET: process.env.JWT_SECRET
}
