# Tasky-CLI

Tasky-CLI is a stylish and interactive command-line to-do list manager. Easily add, update, remove, and organize your tasks with a beautiful CLI interface.

## Features

- **Add Task**: Create new tasks with title, description, due date, and priority.
- **Update Task**: Modify existing tasks.
- **Remove Task**: Delete tasks by selecting from the list.
- **List Tasks**: View all tasks in a formatted table.
- **Sort Tasks**: Sort tasks by due date, priority, or completion status.
- **Filter Tasks**: Filter tasks by completed or not completed.
- **Mark as Completed**: Mark tasks as done.
- **Clear Completed Tasks**: Remove all completed tasks at once.

## Task Schema

Each task includes:
- `title` (string, 2-100 chars)
- `description` (string, 2-1000 chars)
- `dueDate` (future date, YYYY-MM-DD)
- `createdAt` (auto-generated)
- `priority` (1 = High, 2 = Medium, 3 = Low)
- `completed` (boolean)

## Tech Stack

- [lowdb](https://github.com/typicode/lowdb) - Lightweight local JSON database
- [ora](https://github.com/sindresorhus/ora) - Elegant terminal spinner
- [dayjs](https://day.js.org/) - Date formatting
- [cli-table3](https://github.com/cli-table/cli-table3) - Table rendering in CLI
- [figlet](https://github.com/patorjk/figlet.js) - ASCII art banners
- [inquirer](https://github.com/SBoudrias/Inquirer.js/) - Interactive prompts
- [zod](https://github.com/colinhacks/zod) - Schema validation
- [chalk](https://github.com/chalk/chalk) - Terminal string styling

## Project Structure

```
tasky-cli/
├── db/
│   └── setupDb.js           # lowdb setup
├── core/
│   └── taskHandler.js       # core task functions (add, remove, update...)
├── models/
│   └── task.js              # task schema (zod)
├── ui/
│   ├── display.js           # table rendering, figlet, ora
│   └── prompt.js            # inquirer prompts
├── utils/
│   └── validate.js          # validation helpers
├── tasks.json               # tasks database (auto-generated)
├── index.js                 # main CLI entry point
├── package.json
```

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Tasky-CLI
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## How to Run

Start the CLI with:
```sh
node index.js
```

Follow the interactive prompts to manage your tasks!
