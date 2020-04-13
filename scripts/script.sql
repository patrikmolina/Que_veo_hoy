CREATE DATABASE que_veo_hoy;

use que_veo_hoy;

CREATE TABLE pelicula (
    id int(10) NOT NULL, 
    titulo varchar(100), 
    anio int(5), 
    duracion int(5), 
    director varchar(400), 
    fecha_lanzamiento date, 
    puntuacion int(2), 
    poster varchar(300), 
    trama varchar(700),
    PRIMARY KEY (id)
    );

CREATE TABLE genero (
    id int(10) NOT NULL auto_increment, 
    nombre varchar(30), 
    PRIMARY KEY (id)
    );



ALTER TABLE `que_veo_hoy`.`pelicula` 
 ADD COLUMN `genero_id` INT NULL;

ALTER TABLE pelicula 
ADD CONSTRAINT `id`
  FOREIGN KEY (`genero_id`)
  REFERENCES `que_veo_hoy`.`genero` (`id`);


CREATE TABLE  actor(
    id int(10) NOT NULL auto_increment,
    nombre varchar(70),
    PRIMARY KEY (id)
);


CREATE TABLE  actor_pelicula(
    id int(10) NOT NULL auto_increment,
    actor_id int (10),
    pelicula_id int(10),
    PRIMARY KEY (id)
    FOREIGN KEY (actor_id) REFERENCES actor(id),
    FOREIGN KEY (pelicula_id) REFERENCES pelicula(id);
);




