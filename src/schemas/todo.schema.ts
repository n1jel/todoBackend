import { z } from "zod";

export const todoCreateDataZod = z.object({
    name: z.string({ message: 'name is required' }).min(1, "Name is required"),
    description: z.string({ message: 'description is required' }).min(1, "Description is required"),
    isCompleted: z.enum(['0', '1', '2']).optional()
});

export type todoCreate = z.infer<typeof todoCreateDataZod>;
