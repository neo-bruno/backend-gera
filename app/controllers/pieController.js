const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getPie = async (req, res) => {
  try {
    const numero_seccion = req.params.numero_seccion
    const [results, metadata] = await db.query(`
      select * from pie where numero_seccion = ${numero_seccion}
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}
const getPieIconos = async (req, res) => {
  try {
    const id_pie = req.params.id_pie
    const [results, metadata] = await db.query(`
    SELECT * FROM pie_icono pi, icono i
    where pi.id_icono = i.id_icono and pi.id_pie = ${id_pie}
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const updatePie = async (req, res) => {
  try {
    const pie = req.body
    const [results, metadata] = await db.query(`
    UPDATE public.pie
    SET url_mapa='${pie.url_mapa}', direccion='${pie.direccion}', telefonos='${pie.telefonos}', lugar='${pie.lugar}', estado_pie=${pie.estado_pie}
    WHERE id_pie=${pie.id_pie};    
    `)
    // UPDATE public.cuadro
    // SET numero_cuadro=${pie.numero_cuadro}, titulo='${pie.titulo}', subtitulo='${pie.subtitulo}', descripcion='${pie.descripcion}', nombre_url='${pie.nombre_url}'
    // WHERE id_cuadro=${pie.id_cuadro};
    res.status(200).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}
module.exports = {
  getPie, getPieIconos, updatePie
}