select fecha, concepto, sum(cantidad_salida::integer) as cantidad_ventas
from detalle_kardex 
where numero_kardex = 17 and
EXTRACT(MONTH FROM fecha) = 7 and
EXTRACT(YEAR FROM fecha) = 2023 and
concepto = 'Venta de producto' 
group by fecha, concepto, cantidad_salida



select fecha, concepto, (cantidad_entrada::integer) as cantidad_compras
from detalle_kardex 
where numero_kardex = 17 and
EXTRACT(MONTH FROM fecha) = 7 and
EXTRACT(YEAR FROM fecha) = 2023 and
concepto = 'Compra de producto'
group by fecha, concepto, cantidad_entrada



select fecha, concepto, sum(cantidad_entrada::integer) as cantidad_inicial
from detalle_kardex 
where numero_kardex = 17 and
EXTRACT(MONTH FROM fecha) = 7 and
EXTRACT(YEAR FROM fecha) = 2023 and
concepto = 'Inventario Inicial' 
group by fecha, concepto, cantidad_entrada



select fecha, 'Inventario Final' as concepto, cantidad_saldo as cantidad_final
from detalle_kardex 
where numero_kardex = 17 and
EXTRACT(MONTH FROM fecha) = 7 and
EXTRACT(YEAR FROM fecha) = 2023
order by id_detalle_kardex desc limit 1