import { NextFunction, Request, Response } from 'express'
import createNewUser from 'services/createNewUser.service'
import { successResponse } from 'utils/apiResponse.util'

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createUser = await createNewUser(res.locals.user)
    successResponse(
      res,
      createUser.statusCode,
      createUser.message,
      createUser.data
    )
  } catch (e) {
    next(e)
  }
}
