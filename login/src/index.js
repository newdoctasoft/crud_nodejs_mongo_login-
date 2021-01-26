const app=require('./servidor');
require('./bd'); 


app.listen(app.get('port'),()=>{
    console.log('LA APLICACION CORRE EN EL PUERTO ', app.get('port'));
})