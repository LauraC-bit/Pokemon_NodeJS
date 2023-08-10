import fs from "node:fs/promises";
import User from "../model/user.model.js";

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

const signUp = async (email, password, pseudo) => {
  // premiere methode
  // const user = {
  //   email,
  //   password,
  //   pseudo,
  // };
  // await User.create(user);

  // deuxieme methode
  const user_ = new User({
    email,
    password,
    pseudo,
  });
  await user_.save();
};

export const UserDAO = {
  read,
  signUp,
};
