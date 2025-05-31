import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile("tasks.json");
const db = new Low(adapter, { tasks: [] });

//Set default values
async function initDB() {
  await db.read();
  db.data ||= { tasks: [] };
  await db.write();
}
await initDB();

export default db;
