const httpError = require('../helpers/handleError')
const db = require('../../config/db')

const getMenu = async (req, res) => {
  try {
    const [results, metadata] = await db.query(`
        select * from menu m, icono i where estado = 1 and m.id_icono = i.id_icono
    `)
    res.status(201).send({ data: results })
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
// const modifyCaja = async (req, res) => {
//   try {
//     const {id_caja, numero_caja, fecha, hora_inicial, hora_final, caja_inicial, total_ingresos, total_gastos, total_ventas, total_caja, estado } = req.body
//     const [results, metadata] = await db.query(`
//     UPDATE public.caja
//     SET numero_caja=${numero_caja}, fecha='${fecha}', hora_inicial='${hora_inicial}', hora_final='${hora_final}', caja_inicial=${caja_inicial}, total_ingresos=${total_ingresos}, total_gastos=${total_gastos}, total_ventas=${total_ventas}, total_caja=${total_caja}, estado=${estado}
//     WHERE id_caja = ${id_caja};
//     `)
//     res.status(200).send({ data: results })
//   } catch (error) {
//     httpError(res, error)
//   }
// }

module.exports = {
  getMenu
}