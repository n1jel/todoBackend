import { NextFunction, Request, Response } from 'express'
import loginUser from 'services/loginUser.service'
import { successResponse } from 'utils/apiResponse.util'

export const loginController = async (
  req: Request,
  res: Response,
  nextTick: NextFunction
) => {
  try {
    const user = res.locals.user
    const loginUserResponse = await loginUser(user.username, user._id)
    const data = { token: loginUserResponse.token, userData: user }
    successResponse(
      res,
      loginUserResponse.statusCode,
      loginUserResponse.message,
      data
    )
  } catch (e) {
    nextTick(e)
  }
}
