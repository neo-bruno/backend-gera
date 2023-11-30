const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getGaleria = async (req, res) => {
  try {
    const numero_seccion = req.params.numero_seccion
    const [results, metadata] = await db.query(`
        select * from galeria g, cuadro c where g.numero_cuadro = c.numero_cuadro and g.numero_seccion = ${numero_seccion}
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}
const getArchivosGaleria = async (req, res) => {
  try {
    const id_galeria = req.params.id_galeria
    const [results, metadata] = await db.query(`
    select * from galeria_archivo ga, archivo a where ga.id_archivo = a.id_archivo and ga.id_galeria = ${id_galeria}
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const updateGaleria = async (req, res) => {
  try {
    const { id_galeria, numero_galeria, tipo, estado_galeria, numero_cuadro, titulo, subtitulo } = req.body
    const [results, metadata] = await db.query(`
      UPDATE public.galeria
      SET numero_galeria=${numero_galeria}, tipo='${tipo}', estado_galeria=${estado_galeria}
      WHERE id_galeria=${id_galeria};

      UPDATE public.cuadro
      SET titulo='${titulo}', subtitulo='${subtitulo}'
      WHERE numero_cuadro=${numero_cuadro};
    `)
    res.status(200).send({ data: results })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getGaleria, getArchivosGaleria, updateGaleria
}