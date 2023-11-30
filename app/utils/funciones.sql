///////////////////// 1. crear una funcion en postgresql que atualize la columna updated_at ////////////////////////////////////

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

////////////////////////////// 2. ejecutar el disparador despues de crear la funcion en postgresql ////////////////////////

CREATE TRIGGER actualizar_updated_at_usuario
BEFORE UPDATE ON usuario
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();

///////////////////////////// 3. ejecutar el disparador despues de crear la funcion en postgresql ////////////////////////

CREATE TRIGGER actualizar_updated_at_cargo
BEFORE UPDATE ON cargo
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();

///////////////////////////// 4. ejecutar el disparador despues de crear la funcion en postgresql ////////////////////////

CREATE TRIGGER actualizar_updated_at_tienda
BEFORE UPDATE ON tienda
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();

///////////////////////////// 5. ejecutar el disparador despues de crear la funcion en postgresql ////////////////////////

CREATE TRIGGER actualizar_updated_at_producto
BEFORE UPDATE ON producto
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();

///////////////////////////// 6. ejecutar el disparador despues de crear la funcion en postgresql ////////////////////////

CREATE TRIGGER actualizar_updated_at_kardex
BEFORE UPDATE ON kardex
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();

///////////////////////////// 7. ejecutar el disparador despues de crear la funcion en postgresql ////////////////////////

CREATE TRIGGER actualizar_updated_at_detalle_kardex
BEFORE UPDATE ON detalle_kardex
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();

//////////////////////////////////////////// fin ////////////////////////////////////////////////////




//////////////////////////// FUNCIONES Y TRIGGER ////////////////////////////
select * from kardex

CREATE OR REPLACE FUNCTION inventario_inicial()
  RETURNS trigger AS
$BODY$
DECLARE
	numero integer = 0;
	numero_e integer = 0;
	id integer = 0;
	cant_e integer = 0;
	costo_e numeric(8,1) = 0;
	total_e numeric(8,1) = 0;
BEGIN
	select numero_kardex into numero from kardex order by id_kardex desc limit 1;
	select id_tienda into id from tienda order by id_tienda desc limit 1;	
	
	IF numero isnull THEN
		numero := 1;
	ELSE
		numero := numero + 1;
	END IF;
	
	select numero_etiqueta into numero_e from etiqueta order by id_etiqueta desc limit 1;
	
	IF numero_e isnull THEN
		numero_e := 1;
	ELSE
		numero_e := numero_e + 1;
	END IF;
		
    IF TG_OP = 'INSERT' AND id NOTNULL THEN
        INSERT INTO public.kardex(			
			numero_kardex, 
			nombre_producto, 
			ubicacion, 
			numero_proveedor,
			nombre_proveedor,
			cantidad_minima, 
			cantidad_maxima, 			
			id_producto, 
			id_tienda
		)
			VALUES (numero, NEW.nombre, NEW.ubicacion, 0, '', 0, 0, NEW.id_producto, id);
			
		cant_e := 0;
		costo_e := NEW.costo_unitario;
		total_e := cant_e * costo_e;
		INSERT INTO public.detalle_kardex(
			fecha, 
			concepto, 
			numero_documento, 
			cantidad_entrada, 
			costo_entrada, 
			total_entrada, 
			cantidad_salida, 
			costo_salida, 
			total_salida, 
			cantidad_saldo, 
			costo_saldo, 
			total_saldo, 
			numero_kardex
		)
		VALUES ((SELECT CURRENT_DATE), 'Inventario Inicial', NEW.codigo, 0, NEW.costo_unitario, total_e, '', '', '', cant_e, costo_e, total_e, numero);	
		
		INSERT INTO public.etiqueta(numero_etiqueta, url, codigo, cantidad, nombre, estado, id_producto)
		VALUES (numero_e, NEW.imagen, NEW.codigo, 0, NEW.nombre, NEW.estado_imprimir_codigo, NEW.id_producto);
		
    END IF;
    RETURN NEW;
END;
$BODY$
language plpgsql;



CREATE TRIGGER trigger_inventario_inicial
  AFTER INSERT
  ON producto
  FOR EACH ROW
  EXECUTE PROCEDURE inventario_inicial();



-- select * from producto order by id_producto limit 10 offset 0
--funcion que recibe el numero de paginas y el tamaño de paginas para mostrar los productos paginados
CREATE OR REPLACE FUNCTION paginacion_productos(
 IdCategoria INTEGER = NULL,
 PageNumber INTEGER = NULL,
 PageSize INTEGER = NULL
 )
 RETURNS SETOF public.producto AS
 $BODY$
 BEGIN
  RETURN QUERY
   SELECT p.*, c.nombre_categoria
   FROM producto p, categoria c 
   WHERE  p.id_categoria = c.id_categoria and p.id_categoria = IdCategoria
   ORDER BY id_producto
   LIMIT PageSize
   OFFSET ((PageNumber-1) * PageSize);
END;
$BODY$
LANGUAGE plpgsql;


-- crea un funcion de triggers para el inventario en el kardex de una venta
CREATE OR REPLACE FUNCTION inventario_ventas()
  RETURNS trigger AS
$BODY$
DECLARE
	id integer = 0;
	
	numero_k integer = 0;	
	codigo_p text = 0;
	costo_s numeric(8,1) = 0;
	total_s numeric(8,1) = 0;
	
	cant_f integer = 0;
	costo_f numeric(8,1) = 0;
	total_f numeric(8,1) = 0;
	
	cant integer = 0;
	total numeric(8,1) = 0;	
BEGIN
	id := NEW.id_producto;
	select numero_kardex into numero_k from kardex where id_producto = id;
	select codigo into codigo_p from producto where id_producto = id;
	select costo_saldo into costo_s from kardex k, detalle_kardex dk where  k.id_producto = id and dk.numero_kardex = k.numero_kardex order by id_detalle_kardex desc limit 1;
	select cantidad_saldo into cant from kardex k, detalle_kardex dk where  k.id_producto = id and dk.numero_kardex = k.numero_kardex order by id_detalle_kardex desc limit 1;	
	select total_saldo into total from kardex k, detalle_kardex dk where  k.id_producto = id and dk.numero_kardex = k.numero_kardex order by id_detalle_kardex desc limit 1;
	
	total_s := NEW.cantidad * costo_s;
	cant_f := cant - NEW.cantidad;
	total_f := total - total_s;
	
	IF cant_f > 0 THEN
		costo_f := total_f / cant_f;
	ELSE
		costo_f = costo_s;
	END IF;
	
				
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.detalle_kardex(
			fecha, 
			concepto, 
			numero_documento, 
			cantidad_entrada, 
			costo_entrada, 
			total_entrada, 
			cantidad_salida, 
			costo_salida, 
			total_salida, 
			cantidad_saldo, 
			costo_saldo, 
			total_saldo, 
			numero_kardex
		)
		VALUES ((SELECT CURRENT_DATE), 'Venta de producto', codigo_p, '', '', '', NEW.cantidad, costo_s, total_s, cant_f, costo_f, total_f, numero_k);
		
		UPDATE public.producto SET cantidad = cant_f WHERE id_producto = id;
		
    END IF;
    RETURN NEW;
COMMIT;
END;
$BODY$
language plpgsql;




CREATE TRIGGER trigger_inventario_ventas
  AFTER INSERT
  ON detalle_recibo
  FOR EACH ROW
  EXECUTE PROCEDURE inventario_ventas();
  


-- cada vez que se modifique el dato de impresion en el producto se modiicara el dato estado de etiqueta
CREATE OR REPLACE FUNCTION modificar_estado_impresion()
  RETURNS trigger AS
$BODY$
BEGIN
			
    IF TG_OP = 'UPDATE' THEN
		UPDATE public.etiqueta
		SET estado=NEW.estado_imprimir_codigo, cantidad = 1
		WHERE id_producto = NEW.id_producto;
		
    END IF;
    RETURN NEW;
END;
$BODY$
language plpgsql;


CREATE TRIGGER trigger_modificar_estado_impresion
  AFTER UPDATE
  ON producto
  FOR EACH ROW
  EXECUTE PROCEDURE modificar_estado_impresion();




/////////////////ACTUALIZAR CANTIDAD INVENTARIO INICIAL PRODUCTO ////////////////////////
CREATE OR REPLACE FUNCTION actualizar_inventario_inicial()
  RETURNS trigger AS
$BODY$
DECLARE
	numero integer = 0;
	id_detalle integer = 0;
	longitud integer = 0;
	id integer = 0;
	cant_e integer = 0;
	costo_e numeric(8,1) = 0;
	total_e numeric(8,1) = 0;
BEGIN
	select numero_kardex into numero from kardex where id_producto = NEW.id_producto;
	select count(*) into longitud from detalle_kardex where numero_kardex = numero;
	select id_detalle_kardex into id_detalle from detalle_kardex where numero_kardex = numero and concepto = 'Inventario Inicial';
			
    IF TG_OP = 'UPDATE' AND id_detalle NOTNULL AND longitud = 1 THEN
		cant_e := NEW.cantidad;
		costo_e := NEW.costo_unitario;
		total_e := cant_e * costo_e;
		
        UPDATE public.detalle_kardex
		SET fecha=(SELECT CURRENT_DATE), 
			concepto='Inventario Inicial', 
			numero_documento=NEW.codigo,
			cantidad_entrada=cant_e, 
			costo_entrada=costo_e, 
			total_entrada=total_e, 			
			cantidad_saldo=cant_e, 
			costo_saldo=costo_e, 
			total_saldo=total_e
		WHERE id_detalle_kardex = id_detalle;
		
    END IF;
    RETURN NEW;
END;
$BODY$
language plpgsql;


CREATE TRIGGER trigger_actualizar_inventario_inicial
  AFTER UPDATE
  ON producto
  FOR EACH ROW
  EXECUTE PROCEDURE actualizar_inventario_inicial();
///////////////////////////////////////////// FIN ////////////////////////////////////////