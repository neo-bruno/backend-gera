const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getPanel = async (req, res) => {
  try {
    const numero_seccion = req.params.numero_seccion
    const [results, metadata] = await db.query(`
      select * from panel p, cuadro c where p.numero_cuadro = c.numero_cuadro and p.numero_seccion = ${numero_seccion}
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const updatePanel = async (req, res) => {
  try {
    const panel = req.body
    const [results, metadata] = await db.query(`
    UPDATE public.panel
    SET numero_panel=${panel.numero_panel}, tipo='${panel.tipo}', paralax='${panel.paralax}', estado_panel=${panel.estado_panel}, numero_cuadro=${panel.numero_cuadro}, numero_seccion=${panel.numero_seccion}
    WHERE id_panel=${panel.id_panel};

    UPDATE public.cuadro
    SET numero_cuadro=${panel.numero_cuadro}, titulo='${panel.titulo}', subtitulo='${panel.subtitulo}', descripcion='${panel.descripcion}', nombre_url='${panel.nombre_url}'
    WHERE id_cuadro=${panel.id_cuadro};
    `)
    res.status(200).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

module.exports = {
    getPanel, updatePanel
  }