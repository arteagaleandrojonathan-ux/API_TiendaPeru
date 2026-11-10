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