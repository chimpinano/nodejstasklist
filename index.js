var express = require('express');
var bodyParser = require('body-parser');
var session = require('cookie-session');

// inicializar la aplicacion
var app = express();

// inicializar session, pasamos una palabra clave
app.use(session({secret:'nodejs'}));
// lo q estamos diciendelo a body parser es q la codificacion q estamos esperando es de Este tipo(urlencoded) 
// No es de tipo estendido por esa razon esta en False
app.use(bodyParser.urlencoded({extended:false}));
// nos va ayudar a crear plantillas de una forma mas rapida
app.set('view engine', 'ejs');

var tareas = [];

app.get('/', function(llamado, respuesta){
    respuesta.render('formulario.ejs', {tareas : tareas});
});

app.post('/adicionar', function(llamado, respuesta){
    var tarea = llamado.body.nuevaTarea;
    tareas.push(tarea);
    respuesta.redirect('/');
})

app.get('/borrar/:id', function(llamado, respuesta){
    // en la posicion de ID borrar solo un campo
    tareas.splice(llamado.params.id, 1);
    respuesta.redirect('/');
})

app.listen(3000, function(){
    console.log("Corriendo en el puerto 3000");
})







