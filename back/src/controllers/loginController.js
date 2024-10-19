import bcryptjs from "bcryptjs";
import { generateToken, verifyToken } from "../helpers/tokenGeneratorFunc.js";
import userModel from "../models/userModel.js";

const loginController = {
  login: async (sol, req) => {
    try {
      const { email, password } = sol.body; // Aseguramos la destructuración correcta de los datos

      // Buscamos si el usuario existe
      const foundUser = await userModel.findOne({ email });

      if (!foundUser) {
        return req.status(404).json({
          state: "Error",
          message: "User not found",
          data: null,
        });
      }

      // Comparamos la contraseña proporcionada con la almacenada (hasheada)
      const validPassword = await bcryptjs.compare(
        password,
        foundUser.password
      );

      if (validPassword) {
        // Generamos el token si la autenticación fue exitosa
        const token = await generateToken({
          id: foundUser._id,
          name: foundUser.name,
          role: foundUser.role,
          state: foundUser.state,
        });

        return req.status(200).json({
          state: "Successful",
          message: "Access allowed",
          data: token,
        });
      } else {
        // Si la contraseña es incorrecta
        return req.status(401).json({
          state: "Error",
          message: "Invalid password",
          data: null,
        });
      }
    } catch (error) {
      // Capturamos cualquier error inesperado
      return req.status(500).json({
        state: "Error",
        message: "Server error during login",
        data: error.message,
      });
    }
  },

  tokenValidation: async (sol, req) => {
    try {
      const token = sol.params.token;
      const decoded = await verifyToken(token);

      if (decoded.id) {
        return req.status(200).json({
          state: "Successful",
          message: "Valid token",
          data: decoded,
        });
      } else {
        return req.status(401).json({
          state: "Error",
          message: "Invalid token",
          data: null,
        });
      }
    } catch (error) {
      return req.status(500).json({
        state: "Error",
        message: "Error validating token",
        data: error.message,
      });
    }
  },
};

export default loginController;