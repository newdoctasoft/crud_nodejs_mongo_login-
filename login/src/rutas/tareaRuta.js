const { Router } = require('express');
const ruta = Router();
const {autenticar}=require('../helpers/autenticacion')
const {
    mostrarFormulario,
    crearTarea,
    listarTarea,
    eliminarTarea,
    mostarFormularioEditar,
    editar
} = require('../controlador/tareaControlador');



ruta.get('/formulario',autenticar, mostrarFormulario);
ruta.post('/crear', autenticar,crearTarea);
ruta.get('/listar',autenticar, listarTarea);
ruta.delete('/eliminar/:id', autenticar,eliminarTarea);
ruta.get('/buscar/:id', autenticar,mostarFormularioEditar);
ruta.put('/editar/:id',autenticar, editar);
 

module.exports = ruta;

