import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Carga las variables de entorno desde .env

// MongoDB connection
dotenv.config();
mongoose
  .connect(
    "mongodb+srv://JuanArz2:...@juanarz2cluster.mvlnjui.mongodb.net/ContaCol?retryWrites=true&w=majority&appName=JuanArz2Cluster"
  )
  .then((data) => {
    console.log("Success conecting MongoDB");
  })
  .catch((error) => {
    console.log("Error conecting MongoDB");
    console.log(error);
  });

// Cloudinary DB connection
cloudinary.config({
  cloud_name: "dc6ulxdlx",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default cloudinary; // Exportar con esta linea para usar Cloudinary: import cloudinary from './cloudinaryConfig.js';

/* export default mongoose; */
