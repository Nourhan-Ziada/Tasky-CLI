import inquirer from "inquirer";

const viewMainMenu = async () => {
  const choices = [
    { name: "Add Task", value: "add" },
    { name: "List All Tasks", value: "list" },
    { name: "Sort Tasks", value: "sort" },
    { name: "Filter Tasks", value: "filter" },
    { name: "Mark Task as Completed", value: "done" },
    { name: "Remove Task", value: "remove" },
    { name: "Clear Completed Tasks", value: "clear" },
    { name: "Exit", value: "exit" },
  ];
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices,
    },
  ]);
  //subMenu
  if (action == "sort") {
    const sortBy = await inquirer.prompt([
      {
        type: "list",
        name: "sortBy",
        message: "Sort taks by:",
        choices: [
          { name: "Due Date", value: "dueDate" },
          { name: "Priority", value: "priority" },
          { name: "Status (Completed / Not)", value: "status" },
        ],
      },
    ]);
    return { action: "sort", sortBy };
  }
  //subMenu
  if (action == "filter") {
    const { filterBy } = await inquirer.prompt([
      {
        type: "list",
        name: "filterBy",
        message: "Filter tasks by:",
        choices: [
          { name: "Completed", value: "completed" },
          { name: "Not Completed", value: "notCompleted" },
        ],
      },
    ]);
    return { action: "filter", filterBy };
  }
  return { action };
};

const addTaskPrompt = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Task title:",
      validate: (input) => {
        if (input.trim() < 2) return "Title must be at least 2 characters.";
        if (input.trim() > 100) return "Title must be at most 100 characters.";
        return true;
      },
    },
    {
      type: "input",
      name: "description",
      message: "Description:",
      validate: (input) => {
        if (input.trim() < 2)
          return "Description must be at least 2 characters.";
        if (input.trim() > 1000)
          return "Description must be at most 1000 characters.";
        return true;
      },
    },
    {
      type: "input",
      name: "dueDate",
      message: "Due date (YYYY-MM-DD)::",
      validate: (input) => {
        const date = new Date(input);
        if (isNaN(date))
          return "Please enter a valid date format (YYYY-MM-DD).";
        if (date < new Date()) return "Due date must be in the future.";
        return true;
      },
    },
    {
      type: "list",
      name: "priority",
      message: "Filter tasks by:",
      choices: [
        { name: "1 - High", value: "1" },
        { name: "2 - Medium", value: "2" },
        { name: "3 - Low", value: "3" },
      ],
    },
  ]);
  return answers;
};

const takeTaskIdPrompt = async () => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "taskIndex",
      message: "Enter the ID of the task:",
      validate: (input) => {
        const num = Number(input.trim());
        if (isNaN(num) || num <= 0 || !Number.isInteger(num))
          return "Please enter a valid positive number.";
        return true;
      },
    },
  ]);
  return Number(answer.taskIndex.trim());
};
export { viewMainMenu, addTaskPrompt, takeTaskIdPrompt };
