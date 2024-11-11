import { todoCreate } from "schemas/todo.schema";
import { createTodo } from "../services/todos.services";
import Todo from "entities/todos.entity";

jest.mock('services/todos.services');

describe('Create Todo', () => {
    const mockUserId = '6451f9bf4b3c1a3f12345678';
    const mockTodoData: todoCreate = {
        name: 'Test Todo',
        description: 'This is a test todo',
        isCompleted: '0',
        endTime: '2024-11-10T10:00:00.000Z',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a todo successfully', async () => {
        jest.mock('services/todos.services', () => {
            return {
                createTodo: jest.fn().mockResolvedValue({
                    success: true,
                    statusCode: 201,
                    message: 'Todo created successfully',
                    data: {
                        name: 'Test Todo',
                        description: 'This is a test todo',
                        isCompleted: '0',
                        endTime: '2024-11-10T10:00:00.000Z',
                        userId: '6451f9bf4b3c1a3f12345678',
                        _id: '6451f9bf4b3c1a3f87654321',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                }),
            };
        });
        // Mock the successful creation of a todo
        // (Todo.create as jest.Mock).mockResolvedValue({
        //     ...mockTodoData,
        //     userId: mockUserId,
        //     _id: '6451f9bf4b3c1a3f87654321',
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        // });

        const result = await createTodo(mockTodoData, mockUserId);

        expect(result.success).toBe(true);
        expect(result.statusCode).toBe(201);
        expect(result.message).toBe('Todo created successfully');
        expect(result.data).toMatchObject({
            ...mockTodoData,
            userId: mockUserId,
        });
    });

    it('should throw an error if the todo creation fails', async () => {
        // Mock the failure of the creation process
        // (Todo.create as jest.Mock).mockRejectedValue(new Error('Database error'));
        jest.mock('services/todos.services', () => {
            return {
                createTodo: jest.fn().mockResolvedValue({
                    success: true,
                    statusCode: 201,
                    message: 'Todo created successfully',
                    data: {
                        name: 'Test Todo',
                        description: 'This is a test todo',
                        isCompleted: '0',
                        endTime: '2024-11-10T10:00:00.000Z',
                        userId: '6451f9bf4b3c1a3f12345678',
                        _id: '6451f9bf4b3c1a3f87654321',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                }),
            };
        });

        await expect(createTodo(mockTodoData, mockUserId)).rejects.toThrow('Database error');
    });
});