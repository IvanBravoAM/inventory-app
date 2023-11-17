import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Determina la carpeta de destino según el tipo de documento
      const folder = determineFolder(file.mimetype);
      cb(null, `./uploads/${folder}`);
    },
    filename: (req, file, cb) => {
      // Usa el nombre original del archivo
      cb(null, file.originalname);
    },
  });

  function determineFolder(mimeType) {
    if (mimeType.startsWith('image/')) {
      return 'profile'; // Carpeta para fotos de perfil
    } else if (mimeType.startsWith('application/pdf')) {
      return 'documents'; // Carpeta para documentos PDF
    } else {
      return 'other'; // Carpeta por defecto para otros tipos de documentos
    }
  }

  const uploader = multer({storage})

  export default uploader;  