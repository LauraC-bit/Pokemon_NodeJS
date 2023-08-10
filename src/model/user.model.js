import { Schema, createCollection } from "../config/mongoose.config.js";

const userSchema = new Schema({
  email: String, // String is shorthand for {type: String}
  password: String,
  pseudo: String,
});

const User = createCollection("User", userSchema);

export default User;
