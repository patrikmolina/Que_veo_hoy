//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); 
var controladorPeliculas = require('./controladores/que_veo_hoy_controlador.js');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.get('/peliculas', controladorPeliculas.buscarPeliculas);
app.get('/generos', controladorPeliculas.listarGenero);
app.get('/peliculas/recomendacion', controladorPeliculas.buscarPeliculasRecomendadas);
app.get('/peliculas/:id', controladorPeliculas.buscarPeliculaPorID);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

