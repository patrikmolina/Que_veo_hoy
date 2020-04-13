var con = require('../lib/conexionbd.js');

function buscarPeliculas(req, res) {
  var sql = "select * from pelicula";
  var consulta = "select * from pelicula";
  var totalResultados = 0;
  var filters = [];
  let pagina = req.query.pagina;
  let cantidad = req.query.cantidad;
  // var genero = req.query.genero;
  // var titulo = req.query.titulo;
  // var anio = req.query.anio;
  // var orden = req.query.orden;
  // var tipoOrden = req.query.tipo_orden;
  // var sqlCount = "select count (*) from pelicula";

  if (req.query.anio != null) {
    filters.push(`anio = ${req.query.anio}`);
  }

  if (req.query.titulo != null) {
    filters.push(`titulo like '%${req.query.titulo}'`);
  }

  if (req.query.genero != null) {
    filters.push(`genero_id=  ${req.query.genero}`);
  }

  if (filters.length > 0) {
    sql += " where " + filters.join(" and ");
  }

  if (req.query.columna_orden != null) {
    sql += ` order by ${req.query.columna_orden} ${req.query.tipo_orden}`;
  }

  sql += ` limit ${(pagina - 1) * cantidad}, ${cantidad}`;


  con.query(consulta, function (error, resultado, fields) {
    if (error) {
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
    }
    totalResultados = resultado.length;
  });

  con.query(sql, function (error, resultado, fields) {

    if (error) {
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
    }
    var respuesta = {
      peliculas: resultado,
      total: totalResultados

    };
    res.send(JSON.stringify(respuesta));
  });
};

function listarGenero(req, res) {
  var sql = "select * from genero";
  con.query(sql, function (error, resultado, field) {
    if (error) {
      console.log("Hubo un error en la consulta", error.message);
      return res.status(404).send("Hubo un error en la consulta");
    }
    var respuesta = {
      generos: resultado
    };
    res.send(JSON.stringify(respuesta));
  });
}

function buscarPeliculaPorID (req, res) {
 var id = req.params.id
 var sql = "select p.titulo, p.duracion, p.trama, p.director, p.anio, p.fecha_lanzamiento, p.puntuación where p.genero_id = g.id and p.id = ap.pelicula_id and ap.actor_id = a.id";
 con.query(sql, function (error, resultado, fields){
   if(error){
    console.log("Hubo un error en la consulta", error.message);
    return res.status(404).send("Hubo un error en la consulta");
   }
   else {
     var respuesta = {
       'pelicula': resultado[0],
       'actores': resultado, 
       'genero': resultado[0]
     };
     res.send(JSON.stringify(respuesta));
   }
 })   
};

function buscarPeliculasRecomendadas (req, res){
  var genero = req.query.genero;
  var anioI = req.query.anio_inicio;
  var anioF = req.query.anio_fin;
  var puntuacion = req.query.puntuacion;
  var filter = [];
  var sql = "select * from pelicula p";

  if(genero){
    sql += " join genero g on p.genero_id = g.id";
    filter.push(`g.nombre =  "${genero}" `);
  }

  if (anioI && anioF){
    filter.push(`p.anio between ${anioI} and ${anioF}`)
  }

  if (puntuacion){
    filter.push(`p.puntuacion= ${puntuacion}`)
  }

  if (filter.length > 0 ){
  sql += " where " + filter.join(" and ");
}

  con.query(sql, function(error, resultado, field){
    if(error){
      console.log("hubo un error en la consulta", error.message);
    }
    var respuesta = {
      peliculas: resultado
    };
    res.send(JSON.stringify(respuesta))
  });
}

module.exports = {
  buscarPeliculas: buscarPeliculas,
  listarGenero: listarGenero,
  buscarPeliculaPorID: buscarPeliculaPorID,
  buscarPeliculasRecomendadas: buscarPeliculasRecomendadas
};
