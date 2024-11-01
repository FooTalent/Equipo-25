import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url"; // Necesario para convertir import.meta.url a ruta de archivo

// Obtener __dirname equivalente en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asegúrate de que la carpeta donde guardarás los archivos temporales existe
const destinationPath = path.join(__dirname, "..", "uploads");

// Crear la carpeta 'uploads' si no existe
if (!fs.existsSync(destinationPath)) {
  fs.mkdirSync(destinationPath, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationPath); // Carpeta relativa donde se guarda el archivo
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Usamos el nombre original del archivo PDF
  },
});

// Filtro para asegurar que solo se suban archivos PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Solo permitir archivos PDF
  } else {
    cb(new Error("Solo se permiten archivos PDF"), false);
  }
};

// Inicializar Multer con la configuración de almacenamiento y el filtro de archivos
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
