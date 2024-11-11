import {
  todoCreateController,
  todoDeleteController,
  todoGetAllSelfController,
  todoGetByIdController,
  todoUpdateController
} from 'controllers/todo.controller'
import { CronJob } from 'cron'
import Todo from 'entities/todos.entity'
import { Router } from 'express'
import { tokenValidator } from 'middleware/auth.middleware'
import { todoCreateDataCheck, todoIdCheck } from 'middleware/todos.middleware'

export const todosRoutes = Router()

const job = CronJob.from({
  cronTime: '* * * * * *',
  onTick: async function () {
    const now = new Date().toISOString()
    try {
      // Find todos where endTime is in the past and update their status

      const result = await Todo.updateMany(
        { endTime: { $lt: now }, isCompleted: { $nin: ['1', '2'] } },
        { $set: { isCompleted: '2' } }
      )
      if (result.modifiedCount > 0) {
        console.log(`${result.modifiedCount} todos marked as expired.`)
      }
    } catch (error) {
      console.error('Error updating todos:', error)
    }
  },
  start: true
})
job.start()

todosRoutes.post(
  '/create',
  tokenValidator,
  todoCreateDataCheck,
  todoCreateController
)

todosRoutes.get('/all/self', tokenValidator, todoGetAllSelfController)

todosRoutes.get('/:id', tokenValidator, todoIdCheck, todoGetByIdController)

todosRoutes.patch('/:id', tokenValidator, todoIdCheck, todoUpdateController)

todosRoutes.delete('/:id', tokenValidator, todoIdCheck, todoDeleteController)
