const httpError = require('../helpers/handleError')
const db = require('../../config/db')
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../frontend-adrian/src/assets/products'))
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop()
    cb(null, `${Date.now()}.${ext}`)
  }
})

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/avif"] //"application/pdf", "application/docx", "application/txt", "image/jpg", "image/jpeg", "image/png", "image/gif"
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
}

const saveImage = async (req, res) => {
  try {
    const archivado = multer({ storage: storage, fileFilter: fileFilter }).single('imagen')
    archivado(req, res, (err) => {
      if (err) {
        httpError(res, err)
        err.message = 'Error al guardar el archivo de imagen'
        return res.send(err)
      }
      console.log(req.file)
      res.status(200).send(req.file)
    })

    // const { cantidad_carrito, descripcion_carrito, precio_carrito, total_carrito, id_producto } = req.body
    // const [results, metadata] = await db.query(`
    // INSERT INTO public.carrito(
    //     cantidad_carrito, descripcion_carrito, precio_carrito, total_carrito, id_producto)
    //     VALUES (${cantidad_carrito}, '${descripcion_carrito}', ${precio_carrito}, ${total_carrito}, ${id_producto});
    // `)
    

  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
  saveImage
}