const tareaControlador={};

const Tarea=require('../modelo/Tarea');

tareaControlador.mostrarFormulario=(req,res)=>{
    res.render('tarea/formularioTarea')
}

tareaControlador.crearTarea= async (req,res)=>{
   
    console.log(req.body);
    const {titulo,descripcion}=req.body;
    const usuarioSesion =req.session.usuario;
    console.log('usuario',usuarioSesion); 
    const nuevaTarea=new Tarea({titulo:titulo , descripcion:descripcion,usuarioId:usuarioSesion._id});
    
    
    await nuevaTarea.save();
   // res.send('NUEVA TAREA INSERTADA');
   req.flash('mensaje_exito','TAREA INSERTADA');
   
   res.redirect('/tarea/listar');
}
 
tareaControlador.listarTarea=async (req,res)=>{
   
 console.log(req.session.usuario);
//const tareas1=await Tarea.find();
const usuarioSesion =req.session.usuario;
    console.log('usuario',usuarioSesion); 
    const tareas = await Tarea.find({ usuarioId:usuarioSesion._id} )
    .sort({ date: "desc" })
    .lean();
    res.render('tarea/listar',{tareas});
    
}

tareaControlador.eliminarTarea=async (req,res)=>{
  
    const tarea=await Tarea.findById(req.params.id).lean();
    console.log(tarea); 
    const usuarioSesion =req.session.usuario;
    console.log('usuario',usuarioSesion); 

    if (tarea.usuarioId != usuarioSesion._id) {
        req.flash("mensaje_error", "NO ESTA AUTORIZADO");
        res.redirect('/tarea/listar');
      }else{
        console.log('id',req.params.id)
        await Tarea.findByIdAndDelete(req.params.id); 
        req.flash('mensaje_exito','TAREA ELIMINADA'); 
        res.redirect('/tarea/listar');
      }
 
   
}
 
 

 tareaControlador.mostarFormularioEditar= async(req,res)=>{
  
    const tarea=await Tarea.findById(req.params.id).lean();
    console.log(tarea); 
    const usuarioSesion =req.session.usuario;
    console.log('usuario',usuarioSesion); 

    if (tarea.usuarioId != usuarioSesion._id) {
        req.flash("mensaje_error", "NO ESTA AUTORIZADO");
        res.redirect('/tarea/listar');
      }
    res.render('tarea/editar',{tarea:tarea});
 

 }


 tareaControlador.editar=async (req,res)=>{
   
     console.log(req.body);
    const {titulo, descripcion}=req.body;
    await Tarea.findByIdAndUpdate(req.params.id,{titulo:titulo,descripcion:descripcion});
    console.log(req.body);
    req.flash('mensaje_exito','TAREA EDITADA');
   
    res.redirect('/tarea/listar');
}

 




module.exports=tareaControlador;