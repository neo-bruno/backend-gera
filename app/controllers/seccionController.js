const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getSeccion = async (req, res) => {
  try {
    const numero_menu = req.params.numero_menu
    const [results, metadata] = await db.query(`
    select s.*, c.id_cuadro, c.numero_cuadro, c.titulo, c.subtitulo, c.descripcion, c.nombre_url 
    from seccion s, cuadro c 
    where s.numero_menu = ${numero_menu} and s.numero_cuadro = c.numero_cuadro
    `)
    res.status(201).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

const updateSeccion = async (req, res) => {
  try {
    const seccion = req.body
    const [results, metadata] = await db.query(`
    UPDATE public.seccion
    SET numero_seccion=${seccion.numero_seccion}, tipo='${seccion.tipo}', url='${seccion.url}', paralax='${seccion.paralax}', estado_cuadro=${seccion.estado_cuadro}, estado_seccion=${seccion.estado_seccion}
    WHERE id_seccion=${seccion.id_seccion};

    UPDATE public.cuadro
    SET numero_cuadro=${seccion.numero_cuadro}, titulo='${seccion.titulo}', subtitulo='${seccion.subtitulo}', descripcion='${seccion.descripcion}', nombre_url='${seccion.nombre_url}'
    WHERE id_cuadro=${seccion.id_cuadro};
    `)
    res.status(200).send({ data: results })
  } catch (error) {
    httpError(res, error)
  }
}

// const getLastCaja = async (req, res) => {
//   try {
//     const [results, metadata] = await db.query(`
//       select * from caja order by id_caja desc limit 1
//     `)
//     res.status(201).send({ data: results })
//   } catch (error) {
//     httpError(res, error)
//   }
// }

// const findCaja = async (req, res) => {
//   try {
//     const fecha = req.params.fecha
//     const [results, metadata] = await db.query(`
//       select * from caja where fecha = '${fecha}'
//     `)
//     res.status(201).send({ data: results })
//   } catch (error) {
//     httpError(res, error)
//   }
// }

// const saveCaja = async (req, res) => {
//   try {
//     const { numero_caja, fecha, hora_inicial, hora_final, caja_inicial, total_ingresos, total_gastos, total_ventas, total_caja, estado, id_tienda } = req.body
//     const [results, metadata] = await db.query(`
//       INSERT INTO public.caja(
//       numero_caja, fecha, hora_inicial, hora_final, caja_inicial, total_ingresos, total_gastos, total_ventas, total_caja, estado, id_tienda)
//       VALUES (${numero_caja}, '${fecha}', '${hora_inicial}', '${hora_final}', ${caja_inicial}, ${total_ingresos}, ${total_gastos}, ${total_ventas}, ${total_caja}, ${estado}, ${id_tienda});
//     `)    
//     res.status(200).send({ data: results })

//   } catch (error) {
//     httpError(res, error)
//   }
// }


module.exports = {
  getSeccion, updateSeccion
}