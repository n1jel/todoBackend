import express, { Express, Request, Response } from 'express'
import { appRoutes } from 'routes/app.route'
import appError from './apperror.config'
import errorHandler from 'middleware/errorhandling.middleware'

const app: Express = express()

export const initialiseMiddleware = (app: Express) => {
  // app.use(cors({ origin: '*' }))
  // app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}

export const initializeRoutes = (app: Express) => {
  //health check api use
  app.get('/', (req: Request, res: Response) => {
    res.send('MyTodo API is running')
  })

  app.use('/api/v1', appRoutes)

  app.all('*', () => {
    const error = appError(404, 'Not found')
    error.name = 'Not found'
    throw error
  })
}

export const initializeErrorHandler = (app: Express) => {
  app.use(errorHandler)
}

initialiseMiddleware(app);
initializeRoutes(app);
initializeErrorHandler(app);

export { app }
