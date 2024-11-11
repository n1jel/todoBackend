import appError from 'config/apperror.config'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { todoCreateDataZod } from 'schemas/todo.schema'

export const todoCreateDataCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = todoCreateDataZod.safeParse(req.body)
    if (validation.error) {
      next(validation.error)
      return
    }
    next()
  } catch (e) {
    next(e)
  }
}

export const todoIdCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.params.id ||
      typeof req.params.id !== 'string' ||
      req.params.id.length === 0
    ) {
      throw appError(StatusCodes.BAD_REQUEST, 'Todo id is required')
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw appError(StatusCodes.BAD_REQUEST, 'Invalid todo ID format')
    }
    next()
  } catch (e) {
    next(e)
  }
}
