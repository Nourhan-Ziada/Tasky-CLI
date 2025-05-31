import { getAllTasks } from "../core/taskHandler.js";
import TaskSchema from "../models/task.js";
import { json } from "zod/v4";

const validateTask = (task) => {
  const result = TaskSchema.safeParse(task);
  if (!result.success)
    throw new Error(`Invalid Task: ${JSON.stringify(result.error.format())}`);
  return result.data;
};

const validateTaskId = (taskIndex) => {
  const tasks = getAllTasks();
  const idx = taskIndex - 1;
  if (isNaN(idx) || idx < 0 || idx >= tasks.length)
    throw new Error(
      "Invalid task number. Please select a valid task from the list."
    );
  return tasks[idx].taskId;
};

export { validateTask, validateTaskId };
