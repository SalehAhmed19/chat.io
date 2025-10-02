import jwt from "jsonwebtoken";

// generate token
export const generateJWT = (id) => {
  const token = jwt.sign({ id }, process.env.JWT);

  return token;
};
