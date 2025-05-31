import db from "../db/setupDb.js";
import { v4 as uuidv4 } from "uuid";
import { validateTask } from "../utils/validate.js";

const addTask = async (taskInput) => {
  const taskWithMeta = {
    ...taskInput,
    taskId: uuidv4(),
    createdAt: new Date().toISOString(),
    completed: false,
  };
  const validtedTask = validateTask(taskWithMeta);
  db.data.tasks.push(validtedTask);
  await db.write(); // Persist changes
  //console.log(db.data);
};

const getAllTasks = () => {
  const tasks = db.data.tasks;
  return tasks;
};

// update
const updateTask = async (taskId, modifiedTask) => {
  const idx = db.data.tasks.findIndex((task) => task.taskId == taskId);
  if (idx === -1) throw new Error("Task not found");
  const updatedTask = {
    ...db.data.tasks[idx],
    ...modifiedTask,
  };
  // console.log(modifiedTask);
  console.log("updatedTask");
  console.log(updatedTask);
  db.data.tasks[idx] = validateTask(updatedTask);
  await db.write(); // Persist changes
};
//remove
const removeTask = async (taskId) => {
  db.data.tasks = db.data.tasks.filter((task) => task.taskId != taskId);
  await db.write();
};

// sort pass 'dueDate', 'priority', or 'status'
const sortTasksBy = ({ sortBy }) => {
  const tasks = db.data.tasks;

  switch (sortBy) {
    case "dueDate":
      return tasks.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));
    case "priority":
      return tasks.sort((a, b) => Number(a.priority) - Number(b.priority));
    case "status":
      return tasks.sort((a, b) => Number(b.completed) - Number(a.completed));
    default:
      return tasks;
  }
};
// filter 'completed' or 'notCompleted'
const filterTasksBy = (filterBy) => {
  const tasks = db.data.tasks;
  switch (filterBy) {
    case "completed":
      return tasks.filter((task) => task.completed);
    case "notCompleted":
      return tasks.filter((task) => !task.completed);
    default:
      return tasks;
  }
};
export {
  addTask,
  getAllTasks,
  removeTask,
  updateTask,
  sortTasksBy,
  filterTasksBy,
};
