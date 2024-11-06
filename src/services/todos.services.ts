import Todo from "entities/todos.entity";
import { todoCreate } from "schemas/todo.schema";

export const createTodo = async (todo: todoCreate, userId: string) => {
    try {
        const newTodo = await Todo.create({ ...todo, userId });
        return { data: newTodo, success: true, statusCode: 201, message: 'Todo created successfully' };
    } catch (e: any) {
        throw new Error(e);
    }
}

export const getTodo = async (userId: string) => {
    try {
        const newTodo = await Todo.find({ userId });
        if (newTodo.length === 0) {
            throw new Error('User has no todo');
        } else {
            return { data: newTodo, success: true, statusCode: 200, message: 'Todo found successfully' };
        }
    } catch (e: any) {
        throw new Error(e);
    }
}

export const getTodoById = async (todoId: string) => {
    try {
        const newTodo = await Todo.findById(todoId);
        if (!newTodo) {
            throw new Error('Todo not found');
        } else {
            return { data: newTodo, success: true, statusCode: 200, message: 'Todo found successfully' };
        }
    } catch (e: any) {
        throw new Error(e);
    }
}

export const updateTodo = async (todo: any, id: string) => {
    try {
        const newTodo = await Todo.findByIdAndUpdate(id, { ...todo }, { new: true });
        return { data: newTodo, success: true, statusCode: 200, message: 'Todo updated successfully' };
    } catch (e: any) {
        throw new Error(e);
    }
}