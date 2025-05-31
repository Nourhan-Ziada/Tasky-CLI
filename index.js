import {
  addTask,
  getAllTasks,
  removeTask,
  sortTasksBy,
  updateTask,
  filterTasksBy
} from "./src/core/taskHandler.js";
import {
  loading,
  withloading,
  welecome,
  printTasksTable,
} from "./src/ui/display.js";
import {
  addTaskPrompt,
  takeTaskIdPrompt,
  viewMainMenu,
} from "./src/ui/prompt.js";
import { validateTaskId } from "./src/utils/validate.js";
import chalk from "chalk";

// Sample tasks for testing (unchanged)
const testTasks = [
  {
    title: "Complete project report",
    description: "Finalize and submit the project report.",
    dueDate: new Date("2025-06-02"),
    priority: "1",
  },
  {
    title: "Prepare meeting slides",
    description: "Create presentation slides for the team meeting.",
    dueDate: new Date("2025-06-05"),
    priority: "2",
  },
  {
    title: "Refactor codebase",
    description: "Improve the code structure and optimize performance.",
    dueDate: new Date("2025-06-10"),
    priority: "3",
  },
];

// Main Function (Updated)
async function testTaskManager() {
  try {
    welecome();
    await loading("Initializing Tasky CLI...", "Ready to proceed");

    while (true) {
      const { action, sortBy, filterBy } = await viewMainMenu();
      
      switch (action) {
        case "add": {
          const taskData = await addTaskPrompt();
          await withloading({
            loadingMessage: "Adding task...",
            successMessage: "Task added successfully",
            failMessage: "Failed to add task",
            task: () => addTask(taskData),
          });
          break;
        }
        case "list": {
          const tasks = getAllTasks();
          if (tasks.length === 0) {
            console.log(chalk.yellow("No tasks found. Add tasks to get started"));
          } else {
            await loading("Fetching tasks...", "Tasks loaded");
            printTasksTable(tasks);
          }
          break;
        }
        case "sort": {
          const sortedTasks = sortTasksBy(sortBy);
          await loading(`Sorting tasks by ${sortBy}...`, "Tasks sorted");
          printTasksTable(sortedTasks);
          console.log(chalk.cyan(`Sorted by: ${sortBy}`));
          break;
        }
        case "filter": {
          const filteredTasks = filterTasksBy(filterBy);
          await loading(`Filtering tasks by ${filterBy}...`, "Tasks filtered");
          printTasksTable(filteredTasks);
          console.log(chalk.cyan(`Filtered by: ${filterBy}`));
          break;
        }
        case "done": {
          const indexTask = await takeTaskIdPrompt();
          const taskId = validateTaskId(indexTask);
          await withloading({
            loadingMessage: "Marking task as done...",
            successMessage: "Task marked as completed",
            failMessage: "Failed to mark task",
            task: () => updateTask(taskId, { completed: true }),
          });
          break;
        }
        case "remove": {
          const indexTask = await takeTaskIdPrompt();
          const taskId = validateTaskId(indexTask);
          await withloading({
            loadingMessage: "Removing task...",
            successMessage: "Task removed successfully",
            failMessage: "Failed to remove task",
            task: () => removeTask(taskId),
          });
          break;
        }
        case "clear": {
          const allTasks = getAllTasks();
          const completedTaskIds = allTasks
            .filter((t) => t.completed)
            .map((t) => t.taskId);
          
          if (completedTaskIds.length === 0) {
            console.log(chalk.yellow("No completed tasks to clear"));
            break;
          }

          await withloading({
            loadingMessage: "Clearing completed tasks...",
            successMessage: `Cleared ${completedTaskIds.length} completed tasks`,
            failMessage: "Failed to clear tasks",
            task: async () => {
              for (const id of completedTaskIds) {
                await removeTask(id);
                await new Promise((resolve) => setTimeout(resolve, 300));
              }
            },
          });
          break;
        }
        case "exit": {
          await loading("Shutting down Tasky CLI...", "Goodbye. Stay productive");
          process.exit();
        }
      }
    }
  } catch (error) {
    console.error(chalk.redBright(`Fatal Error: ${error.message}`));
    process.exit(1);
  }
}

// Run the test
testTaskManager();