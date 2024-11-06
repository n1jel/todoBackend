import { todoCreateController, todoDeleteController, todoGetAllSelfController, todoGetByIdController, todoUpdateController } from "controllers/todo.controller";
import { Router } from "express";
import { tokenValidator } from "middleware/auth.middleware";
import { todoCreateDataCheck, todoIdCheck } from "middleware/todos.middleware";

export const todosRoutes = Router();

todosRoutes.post('/create', tokenValidator, todoCreateDataCheck, todoCreateController);

todosRoutes.get('/all/self', tokenValidator, todoGetAllSelfController);

todosRoutes.get('/:id', tokenValidator, todoIdCheck, todoGetByIdController);

todosRoutes.patch('/:id', tokenValidator, todoIdCheck, todoUpdateController);

todosRoutes.delete('/:id', tokenValidator, todoIdCheck, todoDeleteController);