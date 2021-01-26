const indexControlador={};

indexControlador.mostrarIndex=(req,res)=>{

    res.render('index');
};

indexControlador.mostrarAcerca=(req,res)=>{

    res.render('acerca');
};
 

module.exports=indexControlador;
