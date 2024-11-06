import { NextFunction, Request, Response } from "express";
import { createTodo, deleteTodo, getTodo, getTodoById, updateTodo } from "services/todos.services";
import { successResponse } from "utils/apiResponse.util";

export const todoCreateController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let createTodoRes = await createTodo(req.body, res.locals.userId);
        successResponse(res, createTodoRes.statusCode, createTodoRes.message, createTodoRes.data);
    } catch (e) {
        next(e);
    }
}

export const todoGetAllSelfController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let getAllTodosRes = await getTodo(res.locals.userId);
        successResponse(res, getAllTodosRes.statusCode, getAllTodosRes.message, getAllTodosRes.data);
    } catch (e) {
        next(e);
    }
}

export const todoGetByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const todoId = req.params.id;
        let getTodoRes = await getTodoById(todoId);
        successResponse(res, getTodoRes.statusCode, getTodoRes.message, getTodoRes.data);
    } catch (e) {
        next(e);
    }
}

export const todoUpdateController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let updateTodoRes = await updateTodo(req.body, req.params.id, res.locals.userId);
        successResponse(res, updateTodoRes.statusCode, updateTodoRes.message, updateTodoRes.data);
    } catch (e) {
        next(e);
    }
}

export const todoDeleteController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let deleteTodoRes = await deleteTodo(req.params.id, res.locals.userId);
        successResponse(res, deleteTodoRes.statusCode, deleteTodoRes.message, deleteTodoRes.data);
    } catch (e) {
        next(e);
    }
}