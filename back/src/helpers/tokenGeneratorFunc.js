import dotenv from "dotenv";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

dotenv.config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

export function generateToken(xPayload) {
  return new Promise((res, rej) => {
    jwt.sign(xPayload, jwtSecretKey, { expiresIn: "1h" }, (error, token) => {
    jwt.sign(xPayload, jwtSecretKey, { expiresIn: "1h" }, (error, token) => {
      if (error) {
        rej({ error });
      } else {
        res({ token });
      }
    });
  });
}

/* // Código que vimos en la tarde, para verificar roles
  export const verifyToken = (req, res, next) => {
  const token = req.headers["Authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "err. Unauthorized!" });
    }
    req.userRole = decoded.role;
    req.userState = decoded.state;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole === "admin") {
    next();
  } else {
    res.status(403).send({ message: "Require Admin Role!" });
  }
};

const isSuperAdmin = (req, res, next) => {
  if (req.userRole === "superAdmin") {
    next();
  } else {
    res.status(403).send({ message: "Require SuperAdmin Role!" });
  }
};

const isAccountant = (req, res, next) => {
  if (req.userRole === "accountant") {
    next();
  } else {
    res.status(403).send({ message: "Require Accountant Role!" });
  }
}; */

/* // Código que vimos en la tarde, para verificar roles
  export const verifyToken = (req, res, next) => {
  const token = req.headers["Authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "err. Unauthorized!" });
    }
    req.userRole = decoded.role;
    req.userState = decoded.state;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole === "admin") {
    next();
  } else {
    res.status(403).send({ message: "Require Admin Role!" });
  }
};

const isSuperAdmin = (req, res, next) => {
  if (req.userRole === "superAdmin") {
    next();
  } else {
    res.status(403).send({ message: "Require SuperAdmin Role!" });
  }
};

const isAccountant = (req, res, next) => {
  if (req.userRole === "accountant") {
    next();
  } else {
    res.status(403).send({ message: "Require Accountant Role!" });
  }
}; */

export function verifyToken(token) {
  return new Promise((res, rej) => {
    jwt.verify(token, jwtSecretKey, (error, decoded) => {
    jwt.verify(token, jwtSecretKey, (error, decoded) => {
      if (error) {
        rej(error);
      } else {
        res(decoded);
      }
    });
  });
}

/* // Código que me dio Chat GPT, solo lo dejo para consulta
  export function verifyRole(...allowedRoles) {
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = await verifyToken(token);
      
      // Verificar si el rol está entre los roles permitidos
      if (!allowedRoles.includes(decoded.role)) {
        //console.log(decoded);
        return res.status(403).json({
          state: "Error",
          message: "Access denied: insufficient permissions",
        });
      }

      // Si el rol es válido, pasa al siguiente middleware
      next();
    } catch (error) {
      return res.status(401).json({
        state: "Error",
        message: "Invalid token",
        data: error,
      });
    }
  };
} */
