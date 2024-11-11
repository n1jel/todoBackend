import User from 'entities/user.entity'
import { UserType } from 'schemas/user.schema'
import bcrypt from 'bcrypt'

const createNewUser = async (user: UserType) => {
  const encryptedPassword = await bcrypt.hash(user.password, 10)
  const newUser = await User.create({ ...user, password: encryptedPassword })
  return {
    data: newUser,
    success: true,
    statusCode: 201,
    message: 'User created successfully'
  }
}

export default createNewUser
