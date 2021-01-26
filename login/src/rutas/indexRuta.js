const {Router}=require('express');
const ruta=Router();

const {mostrarIndex,mostrarAcerca}=require('../controlador/indexControlador')

ruta.get('/',mostrarIndex);

ruta.get('/acerca',mostrarAcerca);

module.exports=ruta;
