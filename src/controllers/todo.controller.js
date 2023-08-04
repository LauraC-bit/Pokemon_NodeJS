import fs from "node:fs/promises";
import todos from "../data/todo.data.js";

const { readFile, writeFile } = fs;

const CURRENT_DIR = process.cwd();

const getAll = async (req, res) => {
  let jsonData = null;

  try {
    jsonData = await readFile(`${CURRENT_DIR}/src/data/todo.data.json`, "utf8");
  } catch (e) {
    console.error(e.message);
  }

  const data = JSON.parse(jsonData);

  res.json({ todos: data.todos });
};

const getAll_ = (req, res) => {
  const data = todos;
  res.json({ todos: data });
};

const create = (req, res) => {
  // const id = req.body.todoId;
  // const value = req.body.value;
  // const completed = req.body.completed;

  const { todoId, value, completed } = req.body;

  const todo = {
    id: todoId,
    value,
    completed,
  };

  todos.push(todo);

  res.status(201).json({ message: `Todo successfully created`, todoCreated: todo });
};

export const TodoController = {
  getAll,
  create,
};
