import { envVars } from 'config/envVars.config'
import jwt from 'jsonwebtoken'

const loginUser = async (username: string, userId: string) => {
  const token = jwt.sign(
    { userId: userId, username: username },
    envVars.JWTSECRET as string,
    { expiresIn: '1h' }
  )
  return {
    token,
    success: true,
    statusCode: 200,
    message: 'Login successfully'
  }
}

export default loginUser
