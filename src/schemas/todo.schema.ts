import { date, z } from "zod";

const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;

export const todoCreateDataZod = z.object({
    name: z.string({ message: 'name is required' }).min(1, "Name is required"),
    description: z.string({ message: 'description is required' }).min(1, "Description is required"),
    isCompleted: z.enum(['0', '1', '2']).optional(),
    endTime: z.string({ message: 'endTime is required' }).refine((date) => isoDatePattern.test(date), {
        message: "Invalid date format. Expected ISO 8601 format (e.g., YYYY-MM-DDTHH:MM:SS.sssZ)."
    }),
});

export type todoCreate = z.infer<typeof todoCreateDataZod>;
