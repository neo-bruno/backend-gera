const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getTestimonios = async (req, res) => {
  try {
    const numero_seccion = req.params.numero_seccion
    const [results, metadata] = await db.query(`
    select t.*, c.titulo, c.subtitulo, c.descripcion, h.url, h.nombre || ' ' || h.apellidos as nombres, ca.posicion
    from testimonio t, cuadro c, huesped h, usuario u, cargo ca
    where t.numero_cuadro = c.numero_cuadro and t.id_huesped = h.id_huesped and h.id_usuario = u.id_usuario and u.id_cargo = ca.id_cargo and t.estado_testimonio = 1 and t.numero_seccion = ${numero_seccion}
    order by t.valoracion desc limit 6    
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const getTestimonio = async (req, res) => {
  try {
    const id_huesped = req.params.id_huesped
    const [results, metadata] = await db.query(`
    select t.*, c.titulo, c.subtitulo, c.descripcion, h.url, h.nombre || ' ' || h.apellidos as nombres, ca.posicion
    from testimonio t, cuadro c, huesped h, usuario u, cargo ca
    where t.numero_cuadro = c.numero_cuadro and t.id_huesped = h.id_huesped and h.id_usuario = u.id_usuario and u.id_cargo = ca.id_cargo and h.id_huesped = ${id_huesped}
    `)
    //and t.estado_testimonio = 1 
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}
const updateTestimonio = async (req, res) => {
  try {
    const {id_testimonio, tipo, valoracion, estado_testimonio } = req.body
    const [results, metadata] = await db.query(`
      UPDATE public.testimonio
      SET tipo='${tipo}', valoracion=${valoracion}, estado_testimonio=${estado_testimonio}
      WHERE id_testimonio=${id_testimonio};
    `)
    res.status(200).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
    getTestimonios, getTestimonio, updateTestimonio
  }