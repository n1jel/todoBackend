import connectToDb from 'config/db.config'
import { app } from 'config/express.config'
import { env } from 'process'

const port = env.PORT || 3000

connectToDb()

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
