import storage from "../models/storageModel.js";
import cloudinary from "../connectionDB.js";
import fs from "fs"; // Libreria ara eliminar archivos después de subirlos a Cloudinary
import path from "path"; // Libreria para manejar rutas y nombres de archivo

// Función para sanitizar el nombre del archivo
function sanitizeFileName(filename) {
  return filename.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-\.]/g, "");
}

// Crear un nuevo documento con subida a Cloudinary
async function createStorage(req, res) {
  try {
    // Verificamos si se ha subido un archivo
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Obtenemos la ruta completa del archivo
    const filePath = req.file.path;

    // Obtenemos el nombre original del archivo y lo sanitizamos
    let originalFileName = req.file.originalname;
    originalFileName = path.parse(originalFileName).name; // para eliminar la extensión
    const sanitizedFileName = sanitizeFileName(originalFileName);

    // Subimos el archivo a Cloudinary como PDF, especificando el public_id
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",
      folder: "facturas",
      public_id: sanitizedFileName,
      use_filename: true,
      unique_filename: false,
    });

    // Usamos la URL generada por Cloudinary directamente
    const pdfUrl = uploadResult.url;

    // Creamos el documento en la base de datos con la URL generada y el nombre original del archivo
    const newDocument = await storage.create({
      invoiceName: uploadResult.original_filename,
      url: pdfUrl,
    });

    // Eliminamos el archivo local después de subirlo a Cloudinary
    fs.unlinkSync(filePath);

    // Respondemos con la URL al frontend
    res.json({
      message: "File uploaded successfully",
      url: pdfUrl,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
}

// Obtener todos los documentos almacenados
async function listStorage(req, res) {
  try {
    const documents = await storage.find();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
}

// Obtener un documento por ID
async function listStorageByID(req, res) {
  try {
    const documentID = req.params.id;
    const documentRequested = await storage.findById(documentID);

    if (!documentRequested) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    res.status(200).json(documentRequested);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
}

// Actualizar un documento por ID
async function updateStorage(req, res) {
  try {
    const documentModified = await storage.findById(req.params.id);

    if (!documentModified) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    documentModified.thirdParty =
      req.body.thirdParty || documentModified.thirdParty;
    documentModified.invoiceName =
      req.body.invoiceName || documentModified.invoiceName;
    documentModified.url = req.body.url || documentModified.url;

    await documentModified.save();
    res.json(documentModified);
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
}

// Eliminar un documento por ID
async function deleteStorage(req, res) {
  try {
    const documentToDelete = await storage.findById(req.params.id);

    if (!documentToDelete) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    await storage.findByIdAndDelete(req.params.id);
    res.json({ message: "Documento eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Server Error", message: err.message });
  }
}

export default {
  createStorage,
  listStorage,
  listStorageByID,
  updateStorage,
  deleteStorage,
};
