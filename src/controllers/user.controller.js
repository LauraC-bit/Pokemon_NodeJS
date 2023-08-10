import { UserDAO } from "../daos/user.dao.js";
import { jwtSign } from "../utils/jwt.utils.js";
import { omit } from "../utils/object.utils.js";

const getAll = async (req, res) => {
  const result = await UserDAO.read();
  if (!!result.error) return res.status(400).json({ message: result.error });

  return res.json({ users: result.users });
};

const login = async (req, res) => {
  const { email, pass } = req.body;
  const message = `Authentification failed`;

  // <script> alert("hacked") </script>

  const result = await UserDAO.read();
  if (!!result.error) return res.status(400).json({ message: result.error });

  const { users } = result;

  const user = users.find((u) => u.email === email);

  if (!user || user.password !== pass) return res.status(400).json({ message });

  const token = jwtSign(user.id);

  return res.json({
    message: `login successfull`,
    user: omit(user, "password"),
    token,
  });
};

const signUp = async (req, res) => {
  const { email, password, pseudo } = req.body;

  await UserDAO.signUp(email, password, pseudo);

  return res.json({ message: `sign up successfull` });
};

export const UserController = {
  getAll,
  login,
  signUp,
};
