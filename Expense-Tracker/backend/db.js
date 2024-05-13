import nedb from "nedb";
const expense = new nedb({ filename: "db/expense.db", autoload: true });
export { expense };
