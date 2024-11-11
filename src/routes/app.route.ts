import { Router } from 'express'
import { authRoutes } from './auth.routes'
import { todosRoutes } from './todos.routes'

export const appRoutes = Router()

appRoutes.use('/auth', authRoutes)

appRoutes.use('/todos', todosRoutes)
