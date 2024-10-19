import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

export function generateToken(xPayload) {
  return new Promise((res, rej) => {
    jwt.sign(xPayload, jwtSecretKey, { expiresIn: "1h" }, (error, token) => {
      if (error) {
        rej({ error });
      } else {
        res({ token });
      }
    });
  });
}

export function verifyToken(token) {
  return new Promise((res, rej) => {
    jwt.verify(token, jwtSecretKey, (error, decoded) => {
      if (error) {
        rej(error);
      } else {
        res(decoded);
      }
    });
  });
}
