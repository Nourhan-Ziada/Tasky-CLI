import chalk from "chalk";
import figlet from "figlet";
import ora from "ora";
import Table from "cli-table3";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

// UI Functions
const welecome = () => {
  const welcomeMessage = figlet.textSync("Tasky CLI", {
    font: "Ghost", // Stylish font
    horizontalLayout: "full",
    verticalLayout: "default",
  });
  console.log(chalk.hex('#00B7EB').bold(welcomeMessage)); // Bright cyan
  console.log(chalk.hex('#FFD700').italic("Manage your tasks with style\n"));
};

const loading = async (loadingMessage, successMessage) => {
  const spinner = ora({
    text: chalk.cyan(loadingMessage),
    spinner: "dots12",
    color: "cyan",
  }).start();

  await new Promise((resolve) => setTimeout(resolve, 1500));
  spinner.succeed(chalk.greenBright(successMessage));
};

const withloading = async ({
  loadingMessage,
  successMessage,
  failMessage,
  task,
}) => {
  const spinner = ora({
    text: chalk.cyan(loadingMessage),
    spinner: "bouncingBar",
    color: "cyan",
  }).start();

  try {
    const result = await task();
    await new Promise((resolve) => setTimeout(resolve, 500));
    spinner.succeed(chalk.greenBright(successMessage));
    return result;
  } catch (error) {
    spinner.fail(chalk.redBright(failMessage));
    console.error(chalk.red(`Error: ${error.message || error}`));
    return null;
  }
};

const printTasksTable = (tasks) => {
  const table = new Table({
    head: [
      chalk.hex('#00B7EB').bold("#"),
      chalk.hex('#00B7EB').bold("Title"),
      chalk.hex('#00B7EB').bold("Description"),
      chalk.hex('#00B7EB').bold("Due Date"),
      chalk.hex('#00B7EB').bold("Created At"),
      chalk.hex('#00B7EB').bold("Priority"),
      chalk.hex('#00B7EB').bold("Status"),
    ],
    colWidths: [3, 25, 35, 15, 15, 10, 12],
    style: {
      head: [],
      border: ['cyan'], // Cyan borders
    },
    wordWrap: true,
  });

  tasks.forEach((task, index) => {
    const dueDate = dayjs(task.dueDate);
    const isOverdue = dueDate.isBefore(dayjs());
    table.push([
      chalk.gray(index + 1),
      chalk.whiteBright(task.title),
      chalk.gray(task.description),
      isOverdue ? chalk.redBright(dueDate.fromNow()) : chalk.cyan(dueDate.fromNow()),
      chalk.cyan(dayjs(task.createdAt).fromNow()),
      task.priority === "1"
        ? chalk.redBright("High")
        : task.priority === "2"
        ? chalk.yellowBright("Medium")
        : chalk.greenBright("Low"),
      task.completed ? chalk.greenBright("Done") : chalk.yellow("Pending"),
    ]);
  });

  console.log(table.toString());
  console.log(chalk.hex('#FFD700').italic(`${tasks.length} tasks displayed\n`));
};



export { welecome, loading, withloading, printTasksTable };
