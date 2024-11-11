import { ErrorRequestHandler, Request, Response } from 'express'
import { errorResponse } from 'utils/apiResponse.util'
import { ZodError } from 'zod'

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response
) => {
  // Handle known operational errors
  if (err.isOperational) {
    errorResponse(res, err.status, err.message)
    return
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((error) => error.message).join(', ')
    errorResponse(res, 400, formattedErrors)
    return
  }

  // Handle other errors (generic fallback)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
}

export default errorHandler
