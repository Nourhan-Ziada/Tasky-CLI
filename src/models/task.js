// define the Structure of Task and to validte it
import { z } from "zod";

const TaskSchema = z.object({
  taskId: z.string().uuid(),
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(100, { message: "Title must be at most 20 characters long" }),

  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long" })
    .max(1000, { message: "Description must be at most 1000 characters long" }),

  dueDate: z
    .string({
      required_error: "Due date is required",
      invalid_type_error: "Due date must be a string",
    })
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date), {
      message: "Due date must be a valid date format (e.g. YYYY-MM-DD)",
    })
    .refine((date) => date > new Date(), {
      message: "Due date must be in the future",
    }),

  createdAt: z
    .string()
    .transform((str) => new Date(str))
    .refine((date) => !isNaN(date), {
      message: "Created date must be a valid date",
    }),

  priority: z.enum(["1", "2", "3"], {
    message: "Priority must be one of '1', '2', or '3'",
  }),

  completed: z.boolean(),
});

export default TaskSchema;
