import { Request, Response } from "express";
import { createTodo, getTodo, getTodoById, updateTodo } from "services/todos.services";
import { errorResponse, successResponse } from "utils/apiResponse.util";

export const todoCreateController = async (req: Request, res: Response) => {
    try {
        let createTodoRes = await createTodo(req.body, res.locals.userId);
        successResponse(res, createTodoRes.statusCode, createTodoRes.message, createTodoRes.data);
    } catch (e) {
        errorResponse(res);
    }
}

export const todoGetAllSelfController = async (req: Request, res: Response) => {
    try {
        let getAllTodosRes = await getTodo(res.locals.userId);
        successResponse(res, getAllTodosRes.statusCode, getAllTodosRes.message, getAllTodosRes.data);
    } catch (e) {
        if (e instanceof Error) {
            let errMsg = e.message.split('Error: ').pop();
            if (errMsg === 'User has no todo') {
                errorResponse(res, 404, e.message);
            } else {
                errorResponse(res);
            }
        } else {
            errorResponse(res);
        }
    }
}

export const todoGetByIdController = async (req: Request, res: Response) => {
    try {
        const todoId = req.params.id;
        let getTodoRes = await getTodoById(todoId);
        successResponse(res, getTodoRes.statusCode, getTodoRes.message, getTodoRes.data);
    } catch (e) {
        if (e instanceof Error) {
            let errMsg = e.message.split('Error: ').pop();
            if (errMsg === 'Todo not found') {
                errorResponse(res, 404, errMsg);
            } else {
                errorResponse(res, 400, e.message);
            }
        } else {
            errorResponse(res);
        }
    }
}

export const todoUpdateController = async (req: Request, res: Response) => {
    try {
        let updateTodoRes = await updateTodo(req.body, req.params.id);
        successResponse(res, updateTodoRes.statusCode, updateTodoRes.message, updateTodoRes.data);
    } catch (e) {
        errorResponse(res);
    }
}