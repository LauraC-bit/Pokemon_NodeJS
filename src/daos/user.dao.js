import fs from "node:fs/promises";

const { readFile, writeFile } = fs;
const CURRENT_DIR = process.cwd();

const read = async () => {
  let users = null;
  let error = null;

  try {
    const jsonData = await readFile(
      `${CURRENT_DIR}/src/fakedata/user.data.json`,
      "utf8"
    );
    const data = JSON.parse(jsonData);
    users = data.users;
  } catch (e) {
    console.error(e.message);
    error = `Cannot read users: ${e.message}`;
  } finally {
    return { error, users };
  }
};

export const UserDAO = {
  read,
};
