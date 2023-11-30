/********** Autor: Rudolf Felipez Mancilla *************
				   BASES DE DATOS                                                                                            
						bd_reservas_hotel
				Sistema de Reservas en Hoteles
*****************************************************/

/*CREACIÓN DE LA BASE DE DATOS 'bd_reservas_hotel' */

-- drop database if exists bd_reservas_hotel;

-- create database bd_reservas_hotel;

CREATE TABLE CARGO (
ID_CARGO SERIAL NOT NULL,
POSICION varchar(30) NOT NULL UNIQUE,
NIVEL integer default 0,
CONSTRAINT PK_CARGO PRIMARY KEY (ID_CARGO));

CREATE TABLE USUARIO (
ID_USUARIO SERIAL NOT NULL,
USERNAME varchar(70) NOT NULL UNIQUE,
CELLPHONE varchar(70) NOT NULL UNIQUE,
PASSWORD varchar(250) NOT NULL,
ID_CARGO INTEGER NOT NULL,
CONSTRAINT PK_USUARIO PRIMARY KEY (ID_USUARIO),
CONSTRAINT FK_ID_CARGO FOREIGN KEY (ID_CARGO)	
	REFERENCES CARGO (ID_CARGO) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS USUARIO_CARGO(	
ID_USUARIO_CARGO SERIAL NOT NULL,
ID_USUARIO integer NOT NULL,
ID_CARGO integer NOT NULL,	    
CONSTRAINT PK_USUARIO_CARGO PRIMARY KEY (ID_USUARIO_CARGO));

ALTER TABLE USUARIO_CARGO
ADD CONSTRAINT FK_USUARIO_CARGO_USUARIO FOREIGN KEY(ID_USUARIO)
REFERENCES USUARIO (ID_USUARIO)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE USUARIO_CARGO
ADD CONSTRAINT FK_USUARIO_CARGO_CARGO FOREIGN KEY(ID_CARGO)
REFERENCES CARGO (ID_CARGO)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS EMPLEADO (
	ID_EMPLEADO SERIAL NOT NULL,
	NOMBRES VARCHAR(30) NOT NULL,
	APELLIDO_P VARCHAR(30) NOT NULL,
	APELLIDO_M VARCHAR(30),
	DOCUMENTO VARCHAR(20) NOT NULL,
	FECHA_NACIMIENTO DATE NOT NULL,
	ESTADO INTEGER,
	URL TEXT, 
	ID_USUARIO INTEGER NOT NULL,
	CONSTRAINT PK_EMPLEADO PRIMARY KEY (ID_EMPLEADO),
	CONSTRAINT FK_ID_USUARIO FOREIGN KEY (ID_USUARIO)	
	REFERENCES USUARIO (ID_USUARIO) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE
);


INSERT INTO public.cargo(posicion, nivel)
	VALUES ('Administrador', 1);
INSERT INTO public.cargo(posicion, nivel)
	VALUES ('Huesped', 2);

CREATE TABLE ICONO (
	ID_ICONO SERIAL NOT NULL,
	NOMBRE varchar(50) NOT NULL,
	TIPO TEXT,
	CONSTRAINT PK_ICONO PRIMARY KEY (ID_ICONO)
);

CREATE TABLE ARCHIVO (
	ID_ARCHIVO SERIAL NOT NULL,
	NOMBRE varchar(100) NOT NULL,
	URL TEXT,
	LINK TEXT,
	CONSTRAINT PK_ARCHIVO PRIMARY KEY (ID_ARCHIVO)
);

CREATE TABLE CUADRO (
	ID_CUADRO SERIAL NOT NULL,
	NUMERO_CUADRO INTEGER NOT NULL UNIQUE,
	TITULO varchar(100),
	SUBTITULO varchar(100),
	DESCRIPCION TEXT,
	NOMBRE_URL VARCHAR(100),
	URL TEXT,
	CONSTRAINT PK_CUADRO PRIMARY KEY (ID_CUADRO)
);

CREATE TABLE PANEL (
ID_PANEL SERIAL NOT NULL,
NUMERO_PANEL INTEGER NOT NULL UNIQUE,
TIPO varchar(100),
PARALAX TEXT,
ESTADO_PANEL INTEGER,
NUMERO_CUADRO INTEGER NOT NULL,
NUMERO_SECCION INTEGER NOT NULL,
CONSTRAINT PK_PANEL PRIMARY KEY (ID_PANEL),
CONSTRAINT FK_NUMERO_CUADRO FOREIGN KEY (NUMERO_CUADRO)	
	REFERENCES CUADRO (NUMERO_CUADRO) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE,
CONSTRAINT FK_NUMERO_SECCION FOREIGN KEY (NUMERO_SECCION)	
	REFERENCES SECCION (NUMERO_SECCION) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE GALERIA (
ID_GALERIA SERIAL NOT NULL,
NUMERO_GALERIA INTEGER NOT NULL UNIQUE,
TIPO varchar(100),
ESTADO_GALERIA INTEGER,
NUMERO_CUADRO INTEGER NOT NULL,
NUMERO_SECCION INTEGER NOT NULL,
CONSTRAINT PK_GALERIA PRIMARY KEY (ID_GALERIA),
CONSTRAINT FK_NUMERO_CUADRO FOREIGN KEY (NUMERO_CUADRO)	
	REFERENCES CUADRO (NUMERO_CUADRO) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE,
CONSTRAINT FK_NUMERO_SECCION FOREIGN KEY (NUMERO_SECCION)	
	REFERENCES SECCION (NUMERO_SECCION) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE HUESPED (
ID_HUESPED SERIAL NOT NULL,
URL TEXT,
NOMBRE varchar(100),
APELLIDOS VARCHAR(200),
NUMERO_DOCUMENTO VARCHAR(30),
FECHA_NACIMIENTO DATE,
ESTADO_CIVIL VARCHAR(50),
PROFESION VARCHAR(50),
PAIS VARCHAR(100),
CIUDAD VARCHAR(100),
DIRECCION VARCHAR(500),
TELEFONO VARCHAR(50),
NIVEL_PERSONALIDAD INTEGER,
ESTADO_HUESPED INTEGER,
ID_USUARIO INTEGER,
CONSTRAINT PK_HUESPED PRIMARY KEY (ID_HUESPED)
);


CREATE TABLE TESTIMONIO (
ID_TESTIMONIO SERIAL NOT NULL,
NUMERO_TESTIMONIO INTEGER NOT NULL UNIQUE,
TIPO varchar(100),
VALORACION INTEGER,
ESTADO_TESTIMONIO INTEGER,
ID_HUESPED INTEGER NOT NULL,
NUMERO_CUADRO INTEGER NOT NULL,
NUMERO_SECCION INTEGER NOT NULL,
CONSTRAINT PK_TESTIMONIO PRIMARY KEY (ID_TESTIMONIO),
CONSTRAINT FK_ID_HUESPED FOREIGN KEY (ID_HUESPED)	
	REFERENCES HUESPED (ID_HUESPED) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE,
CONSTRAINT FK_NUMERO_CUADRO FOREIGN KEY (NUMERO_CUADRO)	
	REFERENCES CUADRO (NUMERO_CUADRO) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE,
CONSTRAINT FK_NUMERO_SECCION FOREIGN KEY (NUMERO_SECCION)	
	REFERENCES SECCION (NUMERO_SECCION) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE
);


CREATE TABLE MENU (
	ID_MENU SERIAL NOT NULL,
	NUMERO_MENU INTEGER NOT NULL UNIQUE,
	NOMBRE varchar(100),
	NIVEL INTEGER DEFAULT 0,
	ESTADO INTEGER DEFAULT 1,
	ID_ICONO INTEGER NOT NULL,
	CONSTRAINT PK_MENU PRIMARY KEY (ID_MENU),
	CONSTRAINT FK_ID_ICONO FOREIGN KEY (ID_ICONO)
	REFERENCES ICONO (ID_ICONO) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE	
);

CREATE TABLE SECCION (
ID_SECCION SERIAL NOT NULL,
NUMERO_SECCION INTEGER NOT NULL UNIQUE,
TIPO varchar(100),
URL TEXT,
PARALAX TEXT,
ESTADO_CUADRO INTEGER,
ESTADO_SECCION INTEGER,
NUMERO_CUADRO INTEGER NOT NULL,
NUMERO_MENU INTEGER NOT NULL,
CONSTRAINT PK_SECCION PRIMARY KEY (ID_SECCION),
CONSTRAINT FK_NUMERO_CUADRO FOREIGN KEY (NUMERO_CUADRO)	
	REFERENCES CUADRO (NUMERO_CUADRO) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE,
CONSTRAINT FK_NUMERO_MENU FOREIGN KEY (NUMERO_MENU)	
	REFERENCES MENU (NUMERO_MENU) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE PIE (
ID_PIE SERIAL NOT NULL,
NUMERO_PIE INTEGER NOT NULL UNIQUE,
TIPO varchar(100),
URL_MAPA TEXT,
DIRECCION VARCHAR(500),
TELEFONOS VARCHAR(200),
LUGAR VARCHAR(200),
ESTADO_PIE INTEGER,
NUMERO_CUADRO INTEGER NOT NULL,
NUMERO_SECCION INTEGER NOT NULL,
CONSTRAINT PK_PIE PRIMARY KEY (ID_PIE),
CONSTRAINT FK_NUMERO_CUADRO FOREIGN KEY (NUMERO_CUADRO)	
	REFERENCES CUADRO (NUMERO_CUADRO) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE,
CONSTRAINT FK_NUMERO_SECCION FOREIGN KEY (NUMERO_SECCION)	
	REFERENCES SECCION (NUMERO_SECCION) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE CATEGORIA (
ID_CATEGORIA SERIAL NOT NULL,
NUMERO_CATEGORIA INTEGER NOT NULL UNIQUE,
NOMBRE varchar(200),
TIPO varchar(100),
ESTADO_CATEGORIA INTEGER,
CONSTRAINT PK_CATEGORIA PRIMARY KEY (ID_CATEGORIA)
);

CREATE TABLE MONEDA (
ID_MONEDA SERIAL NOT NULL,
NOMBRE_MONEDA varchar(300),
UNIDAD_MONEDA varchar(50),
CONSTRAINT PK_MONEDA PRIMARY KEY (ID_MONEDA)
);

CREATE TABLE PRECIO (
ID_PRECIO SERIAL NOT NULL,
NUMERO_PRECIO INTEGER NOT NULL UNIQUE,
NOMBRE_PRECIO varchar(300),
VALOR_PRECIO numeric(8,1),
ESTADO_PRECIO INTEGER,
ID_MONEDA INTEGER,
CONSTRAINT PK_PRECIO PRIMARY KEY (ID_PRECIO),
CONSTRAINT FK_ID_MONEDA FOREIGN KEY (ID_MONEDA)	
	REFERENCES MONEDA (ID_MONEDA) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE HABITACION (
ID_HABITACION SERIAL NOT NULL,
NUMERO VARCHAR(70),
TITULO VARCHAR(70),
NOMBRE varchar(200),
CAP_ADULTOS INTEGER,
CAP_NINOS INTEGER,
DIMENSION VARCHAR(50),
PISO VARCHAR(50),
TELEFONO VARCHAR(50),
CHECK_IN VARCHAR(50),
CHECK_OUT VARCHAR(50),
SOFA_CAMA INTEGER,
DETALLE_CAMA VARCHAR(500),
ESTADO INTEGER,
PUBLICAR INTEGER,
NOCHE_BODA INTEGER,
DETALLE_NOCHE_BODA VARCHAR(500),
DETALLE_CORTO TEXT,
DESCRIPCION TEXT,
IMAGEN_PRINCIPAL TEXT,
URL_VIDEO TEXT,
VALORACION INTEGER,
NUMERO_PRECIO INTEGER NOT NULL,
NUMERO_CATEGORIA INTEGER NOT NULL,
CONSTRAINT PK_HABITACION PRIMARY KEY (ID_HABITACION),
CONSTRAINT FK_NUMERO_PRECIO FOREIGN KEY (NUMERO_PRECIO)	
	REFERENCES PRECIO (NUMERO_PRECIO) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE,
CONSTRAINT FK_NUMERO_CATEGORIA FOREIGN KEY (NUMERO_CATEGORIA)	
	REFERENCES CATEGORIA (NUMERO_CATEGORIA) MATCH SIMPLE
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

////////////////////////////////////////////////////////////np
CREATE TABLE IF NOT EXISTS HABITACION_ARCHIVO(
ID_HABITACION_ARCHIVO SERIAL NOT NULL,
ID_HABITACION integer NOT NULL,
ID_ARCHIVO integer NOT NULL,	    
CONSTRAINT PK_HABITACION_ARCHIVO PRIMARY KEY (ID_HABITACION_ARCHIVO));

ALTER TABLE HABITACION_ARCHIVO
ADD CONSTRAINT FK_HABITACION_HABITACION_ARCHIVO FOREIGN KEY(ID_HABITACION)
REFERENCES HABITACION (ID_HABITACION)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE HABITACION_ARCHIVO
ADD CONSTRAINT FK_ARCHIVO_HABITACION_ARCHIVO FOREIGN KEY(ID_ARCHIVO)
REFERENCES ARCHIVO (ID_ARCHIVO)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

////////////////////////////////////////////////////////////
CREATE TABLE IF NOT EXISTS HABITACION_ICONO(
ID_HABITACION_ICONO SERIAL NOT NULL,
ID_HABITACION integer NOT NULL,
ID_ICONO integer NOT NULL,	    
CONSTRAINT PK_HABITACION_ICONO PRIMARY KEY (ID_HABITACION_ICONO));

ALTER TABLE HABITACION_ICONO
ADD CONSTRAINT FK_HABITACION_HABITACION_ICONO FOREIGN KEY(ID_HABITACION)
REFERENCES HABITACION (ID_HABITACION)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE HABITACION_ICONO
ADD CONSTRAINT FK_ICONO_HABITACION_ICONO FOREIGN KEY(ID_ICONO)
REFERENCES ICONO (ID_ICONO)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

////////////////////////////////////////////////////////////np
CREATE TABLE IF NOT EXISTS PANEL_ARCHIVO(
ID_PANEL_ARCHIVO SERIAL NOT NULL,
ID_PANEL integer NOT NULL,
ID_ARCHIVO integer NOT NULL,	    
CONSTRAINT PK_PANEL_ARCHIVO PRIMARY KEY (ID_PANEL_ARCHIVO));

ALTER TABLE PANEL_ARCHIVO
ADD CONSTRAINT FK_PANEL_PANEL_ARCHIVO FOREIGN KEY(ID_PANEL)
REFERENCES PANEL (ID_PANEL)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE PANEL_ARCHIVO
ADD CONSTRAINT FK_ARCHIVO_PANEL_ARCHIVO FOREIGN KEY(ID_ARCHIVO)
REFERENCES ARCHIVO (ID_ARCHIVO)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;


////////////////////////////////////////////////////////////
CREATE TABLE IF NOT EXISTS PANEL_ICONO(
ID_PANEL_ICONO SERIAL NOT NULL,
ID_PANEL integer NOT NULL,
ID_ICONO integer NOT NULL,	    
CONSTRAINT PK_PANEL_ICONO PRIMARY KEY (ID_PANEL_ICONO));

ALTER TABLE PANEL_ICONO
ADD CONSTRAINT FK_PANEL_PANEL_ICONO FOREIGN KEY(ID_PANEL)
REFERENCES PANEL (ID_PANEL)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE PANEL_ICONO
ADD CONSTRAINT FK_ICONO_PANEL_ICONO FOREIGN KEY(ID_ICONO)
REFERENCES ICONO (ID_ICONO)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

////////////////////////////////////////////////////////////
CREATE TABLE IF NOT EXISTS GALERIA_ARCHIVO(
ID_GALERIA_ARCHIVO SERIAL NOT NULL,
ID_GALERIA integer NOT NULL,
ID_ARCHIVO integer NOT NULL,	    
CONSTRAINT PK_GALERIA_ARCHIVO PRIMARY KEY (ID_GALERIA_ARCHIVO));

ALTER TABLE GALERIA_ARCHIVO
ADD CONSTRAINT FK_GALERIA_GALERIA_ARCHIVO FOREIGN KEY(ID_GALERIA)
REFERENCES GALERIA (ID_GALERIA)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE GALERIA_ARCHIVO
ADD CONSTRAINT FK_ARCHIVO_GALERIA_ARCHIVO FOREIGN KEY(ID_ARCHIVO)
REFERENCES ARCHIVO (ID_ARCHIVO)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

///////////////////////////////////////////////
CREATE TABLE IF NOT EXISTS PIE_ICONO(
ID_PIE_ICONO SERIAL NOT NULL,
ID_PIE integer NOT NULL,
ID_ICONO integer NOT NULL,	    
CONSTRAINT PK_PIE_ICONO PRIMARY KEY (ID_PIE_ICONO));

ALTER TABLE PIE_ICONO
ADD CONSTRAINT FK_PIE_PIE_ICONO FOREIGN KEY(ID_PIE)
REFERENCES PIE (ID_PIE)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE PIE_ICONO
ADD CONSTRAINT FK_ICONO_PIE_ICONO FOREIGN KEY(ID_ICONO)
REFERENCES ICONO (ID_ICONO)
MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;	
/////////////////////////////////////////////////

INSERT INTO public.moneda(nombre_moneda, unidad_moneda)
	VALUES ('Bolivianos', 'Bs.-');
INSERT INTO public.moneda(nombre_moneda, unidad_moneda)
	VALUES ('Dolares', '$us.-');

INSERT INTO public.icono(nombre, tipo) VALUES ('HOTEL', 'mdi-home-city');
INSERT INTO public.icono(nombre, tipo) VALUES ('HABITACIONES', 'mdi-sofa-single');
INSERT INTO public.icono(nombre, tipo) VALUES ('SERVICIOS', 'mdi-room-service');
INSERT INTO public.icono(nombre, tipo) VALUES ('RESERVAS', 'mdi-folder-edit');
INSERT INTO public.icono(nombre, tipo) VALUES ('LOGIN', 'mdi-account-arrow-right');
INSERT INTO public.icono(nombre, tipo) VALUES ('Merienda a media mañana', 'mdi-food');
INSERT INTO public.icono(nombre, tipo) VALUES ('Almuerzo a medio dia', 'mdi-food-variant');
INSERT INTO public.icono(nombre, tipo) VALUES ('Caja fuerte en habitaciones', 'mdi-safe-square');
INSERT INTO public.icono(nombre, tipo) VALUES ('Ascensor a todos los pisos', 'mdi-elevator-passenger');
INSERT INTO public.icono(nombre, tipo) VALUES ('Despertador las 24/7', 'mdi-account-clock');
INSERT INTO public.icono(nombre, tipo) VALUES ('Facebook', 'mdi-facebook');
INSERT INTO public.icono(nombre, tipo) VALUES ('Twitter', 'mdi-twitter');
INSERT INTO public.icono(nombre, tipo) VALUES ('felipezhotel@gmail.com', 'mdi-gmail');
INSERT INTO public.icono(nombre, tipo) VALUES ('4-4510773', 'mdi-phone-classic');
INSERT INTO public.icono(nombre, tipo) VALUES ('(+591) 70369766', 'mdi-whatsapp');

INSERT INTO public.archivo(nombre, url, link)
	VALUES ('a1', 'https://hoteldelizia.com/wp-content/uploads/2019/10/HD-Camere-2.jpg', '');
INSERT INTO public.archivo(nombre, url, link)
	VALUES ('a2', 'https://p4.wallpaperbetter.com/wallpaper/837/534/538/bedroom-bed-architecture-interior-design-high-resolution-images-wallpaper-preview.jpg', '');
INSERT INTO public.archivo(nombre, url, link)
	VALUES ('a3', 'https://urbanlarcohotel.com/wp-content/uploads/2017/07/superior-queenUrban-Larco-Hotel-Habitaciones-v4-13.jpg', '');
INSERT INTO public.archivo(nombre, url, link)
	VALUES ('a4', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/77/c3/f1/hotel-hd.jpg?w=700&h=-1&s=1', '');
INSERT INTO public.archivo(nombre, url, link)
	VALUES ('a5', 'https://www.mobiliariohd.com/wp-content/uploads/2020/12/dormitorio-moderno-madeira-600x400.jpg', '');
INSERT INTO public.archivo(nombre, url, link)
	VALUES ('a6', 'https://dormitorios.top/wp-content/uploads/decorar-dormitorio-matrimonio-1024x548.jpg', '');
INSERT INTO public.archivo(nombre, url, link)
	VALUES ('a7', 'https://www.zasmobel.com/wp-content/uploads/2020/03/CATALOGO-CRETA-TOP-2019-111.jpg', '');
INSERT INTO public.archivo(nombre, url, link)
	VALUES ('a8', 'https://www.zasmobel.com/wp-content/uploads/2020/03/CATALOGO-CRETA-TOP-2019-79-600x600.jpg', '');
INSERT INTO public.archivo(nombre, url, link)
	VALUES ('a9', 'https://i.pinimg.com/564x/2d/0f/69/2d0f69f344d3936c30f1df6e88453b63.jpg', '');
INSERT INTO public.archivo(nombre, url, link)
	VALUES ('a10', 'https://i.pinimg.com/564x/2d/0f/69/2d0f69f344d3936c30f1df6e88453b63.jpg', '');

INSERT INTO public.menu(numero_menu, nombre, nivel, estado, id_icono)VALUES (1, 'HOTEL', 1, 1, 1);
INSERT INTO public.menu(numero_menu, nombre, nivel, estado, id_icono)VALUES (2, 'HABITACIONES', 2, 1, 2);
INSERT INTO public.menu(numero_menu, nombre, nivel, estado, id_icono)VALUES (3, 'SERVICIOS', 3, 1, 3);
INSERT INTO public.menu(numero_menu, nombre, nivel, estado, id_icono)VALUES (4, 'RESERVAS', 4, 1, 4);
INSERT INTO public.menu(numero_menu, nombre, nivel, estado, id_icono)VALUES (5, 'LOGIN', 5, 1, 5);

INSERT INTO public.panel_archivo(id_panel, id_archivo) VALUES (1, 1);
INSERT INTO public.panel_archivo(id_panel, id_archivo) VALUES (1, 2);
INSERT INTO public.panel_archivo(id_panel, id_archivo) VALUES (1, 3);
INSERT INTO public.panel_archivo(id_panel, id_archivo) VALUES (1, 4);
INSERT INTO public.panel_archivo(id_panel, id_archivo) VALUES (1, 5);
INSERT INTO public.panel_archivo(id_panel, id_archivo) VALUES (1, 6);
INSERT INTO public.panel_archivo(id_panel, id_archivo) VALUES (1, 7);
INSERT INTO public.panel_archivo(id_panel, id_archivo) VALUES (1, 8);
INSERT INTO public.panel_archivo(id_panel, id_archivo) VALUES (1, 9);

INSERT INTO public.panel_icono(id_panel, id_icono) VALUES (1, 6);
INSERT INTO public.panel_icono(id_panel, id_icono) VALUES (1, 7);
INSERT INTO public.panel_icono(id_panel, id_icono) VALUES (1, 8);
INSERT INTO public.panel_icono(id_panel, id_icono) VALUES (1, 9);
INSERT INTO public.panel_icono(id_panel, id_icono) VALUES (1, 10);

INSERT INTO public.cuadro( numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (1, 'Hotel Felipez', 'Su Amigo de Siempre...', '', '', '');
INSERT INTO public.cuadro( numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (2, 'Servicios del Hotel', '', 'Descubra la magia de Barcelona como nunca antes, deje que le guiemos con un tour privado por los lugares más icónicos de la ciudad condal y disfrute de un menú especial Picasso en el restaurante Informal de nuestro chef con estrella michelín Marc Gascons.', 'Mas Informacion', '');
INSERT INTO public.cuadro(numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (3, 'Galeria de Fotos', 'Todas las Habitaciones', '', 'MAS INFORMACION', '');
INSERT INTO public.cuadro(numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (4, 'Habitaciones Limpias', '', 'They understood our brand and created a stunning website design. Professional, responsive, and on-time delivery. Highly recommended!', '', '');
INSERT INTO public.cuadro(numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (5, 'Cafeteria', '', 'They understood our brand and created a stunning website design. Professional, responsive, and on-time delivery. Highly recommended!', '', '');
INSERT INTO public.cuadro(numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (6, 'Pie', '', '', '', '');
INSERT INTO public.cuadro(numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (7, 'Servicio del Hotel', '', '', 'Mas Informacion', '');
INSERT INTO public.cuadro(numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (8, 'Cafeteria del Hotel', 'Lo mas destacado para ti...', '', 'Mas Informacion', '');
INSERT INTO public.cuadro(numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (9, '', '', '', '', '');
INSERT INTO public.cuadro(numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (10, 'Salon de Eventos', 'para nuestros clientes..', 'They understood our brand and created a stunning website design. Professional, responsive, and on-time delivery. Highly recommended!', '', '');
INSERT INTO public.cuadro(numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (11, 'Galeria del Salon', 'las 24/7 para ustedes', '', '', '');
INSERT INTO public.cuadro(numero_cuadro, titulo, subtitulo, descripcion, nombre_url, url)
	VALUES (12, 'Habitaciones del Hotel', 'un placer en estadia...', '', '', '');

INSERT INTO public.seccion( numero_seccion, tipo, url, paralax, estado_cuadro, estado_seccion, numero_cuadro, numero_menu)
	VALUES (1, 'principal', 'https://images7.alphacoders.com/463/463342.jpg', 'https://images2.alphacoders.com/650/650971.jpg', 0, 1, 1, 1);	
INSERT INTO public.panel( numero_panel, tipo, paralax, estado_panel, numero_cuadro, numero_seccion)
	VALUES (1, 'servicios', 'https://w0.peakpx.com/wallpaper/999/97/HD-wallpaper-man-made-room-bed-bedroom-furniture.jpg', 1, 2, 1);
INSERT INTO public.galeria(numero_galeria, tipo, estado_galeria, numero_cuadro, numero_seccion)
	VALUES (1, 'galeria', 1, 3, 1);

INSERT INTO public.seccion( numero_seccion, tipo, url, paralax, estado_cuadro, estado_seccion, numero_cuadro, numero_menu)
	VALUES (2, 'servicios', 'https://images7.alphacoders.com/463/463342.jpg', 'https://images2.alphacoders.com/650/650971.jpg', 0, 1, 7, 3);
INSERT INTO public.panel( numero_panel, tipo, paralax, estado_panel, numero_cuadro, numero_seccion)
	VALUES (2, 'cafeteria', 'https://w0.peakpx.com/wallpaper/999/97/HD-wallpaper-man-made-room-bed-bedroom-furniture.jpg', 1, 8, 2);
INSERT INTO public.galeria(numero_galeria, tipo, estado_galeria, numero_cuadro, numero_seccion)
	VALUES (2, 'galeria cafeteria', 1, 9, 2);

INSERT INTO public.panel( numero_panel, tipo, paralax, estado_panel, numero_cuadro, numero_seccion)
	VALUES (3, 'salon eventos', 'https://w0.peakpx.com/wallpaper/999/97/HD-wallpaper-man-made-room-bed-bedroom-furniture.jpg', 1, 10, 2);
INSERT INTO public.galeria(numero_galeria, tipo, estado_galeria, numero_cuadro, numero_seccion)
	VALUES (3, 'galeria salon', 1, 11, 2);

INSERT INTO public.seccion( numero_seccion, tipo, url, paralax, estado_cuadro, estado_seccion, numero_cuadro, numero_menu)
	VALUES (3, 'habitaciones', 'https://images7.alphacoders.com/463/463342.jpg', 'https://images2.alphacoders.com/650/650971.jpg', 1, 1, 12, 2);


INSERT INTO public.galeria_archivo(id_galeria, id_archivo) VALUES (1, 1);
INSERT INTO public.galeria_archivo(id_galeria, id_archivo) VALUES (1, 2);
INSERT INTO public.galeria_archivo(id_galeria, id_archivo) VALUES (1, 3);
INSERT INTO public.galeria_archivo(id_galeria, id_archivo) VALUES (1, 4);
INSERT INTO public.galeria_archivo(id_galeria, id_archivo) VALUES (1, 5);
INSERT INTO public.galeria_archivo(id_galeria, id_archivo) VALUES (1, 6);

INSERT INTO public.galeria_archivo(id_galeria, id_archivo) VALUES (2, 7);
INSERT INTO public.galeria_archivo(id_galeria, id_archivo) VALUES (2, 8);

INSERT INTO public.galeria_archivo(id_galeria, id_archivo) VALUES (3, 9);
INSERT INTO public.galeria_archivo(id_galeria, id_archivo) VALUES (3, 10);

INSERT INTO public.testimonio(
	numero_testimonio, tipo, valoracion, estado_testimonio, id_huesped, numero_cuadro, numero_seccion)
	VALUES (1, 'testimonio', 3, 1, 1, 4, 1);
INSERT INTO public.testimonio(
	numero_testimonio, tipo, valoracion, estado_testimonio, id_huesped, numero_cuadro, numero_seccion)
	VALUES (2, 'testimonio', 5, 1, 2, 5, 1);


INSERT INTO public.pie(
	numero_pie, tipo, url_mapa, direccion, telefonos, lugar, estado_pie, numero_cuadro, numero_seccion)
	VALUES (1, 'pie', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d565.9766040694188!2d-66.15635216193661!3d-17.391544473628585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373f62e1181c5%3A0x47bc3b6db48c0a00!2sFelipez%20Hotel!5e0!3m2!1ses-419!2sbo!4v1694928029676!5m2!1ses-419!2sbo', 'Direccion: Calle España #172 entre Av. Heroinas y C. Colombia', 'Telefonos: 4-4210773 - (+591) 77409001', 'Cochabamba - Bolivia', 1, 6, 1);

INSERT INTO public.pie_icono(id_pie, id_icono)VALUES (1, 11);
INSERT INTO public.pie_icono(id_pie, id_icono)VALUES (1, 12);
INSERT INTO public.pie_icono(id_pie, id_icono)VALUES (1, 13);
INSERT INTO public.pie_icono(id_pie, id_icono)VALUES (1, 14);
INSERT INTO public.pie_icono(id_pie, id_icono)VALUES (1, 15);
	