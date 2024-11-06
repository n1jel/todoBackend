import appError from "config/apperror.config";
import Todo from "entities/todos.entity";
import { StatusCodes } from "http-status-codes";
import { todoCreate } from "schemas/todo.schema";

export const createTodo = async (todo: todoCreate, userId: string) => {
    try {
        const newTodo = await Todo.create({ ...todo, userId });
        return { data: newTodo, success: true, statusCode: 201, message: 'Todo created successfully' };
    } catch (e: any) {
        throw new Error(e);
    }
}

export const getTodo = async (userId: string,) => {
    try {
        const newTodo = await Todo.find({ userId });
        if (newTodo.length === 0) {
            throw appError(StatusCodes.ACCEPTED, 'User has no todo')
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
            throw appError(StatusCodes.BAD_REQUEST, 'Todo not found')
        } else {
            return { data: newTodo, success: true, statusCode: 200, message: 'Todo found successfully' };
        }
    } catch (e: any) {
        throw new Error(e);
    }
}

export const updateTodo = async (todo: todoCreate, id: string, userId: string) => {
    try {
        const newTodo = await Todo.findOneAndUpdate({ _id: id, userId }, { ...todo }, { new: true, runValidators: true });
        if (!newTodo) {
            throw appError(StatusCodes.BAD_REQUEST, 'Todo not found or you are not authorized to update this todo')
        }
        return { data: newTodo, success: true, statusCode: 200, message: 'Todo updated successfully' };
    } catch (e: any) {
        throw new Error(e);
    }
}

export const deleteTodo = async (id: string, userId: string) => {
    try {
        const newTodo = await Todo.findOneAndDelete({ _id: id, userId });
        return { data: newTodo, success: true, statusCode: 200, message: 'Todo deleted successfully' };
    } catch (e: any) {
        throw new Error(e);
    }
}