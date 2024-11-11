import connectToDb from 'config/db.config'
import {
  initialiseMiddleware,
  initializeErrorHandler,
  initializeRoutes
} from 'config/express.config'
import express, { Express } from 'express'
import { env } from 'process'

const app: Express = express()
const port = env.PORT || 3000

connectToDb()

initialiseMiddleware(app)

initializeRoutes(app)

initializeErrorHandler(app)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
