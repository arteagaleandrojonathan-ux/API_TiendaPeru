CREATE DATABASE tiendaperu;
USE tiendaperu;

CREATE TABLE IF NOT exists productos(
	id int unsigned not null auto_increment primary key,
    marca varchar(100) not null,
    descipcion varchar(200) not null,
    precio decimal(10,2) not null,
    stock int unsigned not null default 0,
    create_at datetime not null default NOW(),
    update_at datetime null
    
) ;
INSERT INTO productos (marca, descipcion, precio, stock)
 VALUES ('samsung', 'TV 55',2500,10),
		('LG', 'Lavadora',1200,3),
        ('sony', 'PSJ 5',1200,2);
                            
select *from productos;


CREATE TABLE clientes (
	id int unsigned not null auto_increment primary key,
    nombres varchar(30) not null,
    apellidos varchar(30) not null,
    telefono varchar(9)not null unique,
    /*no le puse que sea un numero, porque el numero de
    telefono no trabaja con calculos, osea que solo uso el tipo de dato numerico 
    cuando hare operaciones como multiplicar, sumar, etc
    */
    direccion varchar(100)not null,
    email varchar(100)not null,
    create_at datetime not null default NOW(),
    update_at datetime null
);
insert into clientes (nombres, apellidos, telefono, direccion, email)
values ('jonathan samir', 'arteaga leandro', '991842738', 'AA.HH Milagros','jonathan@gmail.com'),
		('juan jose', 'torres ramirez', '997882773', 'Av. Milagros 229', 'torresramirez@gmail.com'),
        ('maria luisa', 'mendoza diaz', '928345100', 'Av. Santa anita 192', 'mariamendozadiaz@gmail.com');

select *from clientes;


CREATE TABLE proveedores (
	id int unsigned not null auto_increment primary key,
    razonsocial varchar(100) not null,
    contacto varchar(20) not null,
    ruc char(11) not null unique,
    direccion varchar(100) not null,
    create_at datetime not null default NOW(),
    update_at datetime null
);
INSERT INTO proveedores (razonsocial, contacto, ruc, direccion)
VALUES
('Importaciones Tecnologicas del Peru S.A.C.', '987654321', '20123456781', 'Av. Garcilaso de la Vega 1250, Lima'),
('Distribuidora Global Tech S.R.L.', '986543210', '20234567892', 'Av. Argentina 1850, Lima'),
('CompuImpress  S.R.L', '985432109', '20345678903', 'Jr. Paruro 1420, Lima');

select *from proveedores;
