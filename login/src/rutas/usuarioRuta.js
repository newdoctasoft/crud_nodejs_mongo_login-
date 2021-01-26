const ruta = require("express").Router();
 

const {
    mostrarFormularioRegistrar,
    registrar,
    mostrarFormularioLogin,
    login,
    desloguear

} = require('../controlador/usuarioControlador');



ruta.get('/usuario/formularioRegistro', mostrarFormularioRegistrar);
ruta.post('/usuario/registrar', registrar);
ruta.get('/usuario/formularioLogin', mostrarFormularioLogin);
ruta.post("/usuario/login", login);
ruta.get("/usuario/desloguear", desloguear);

module.exports = ruta;
 