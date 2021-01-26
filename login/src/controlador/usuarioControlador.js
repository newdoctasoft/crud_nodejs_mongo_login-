const usuarioControlador = {};

const Usuario = require('../modelo/Usuario');


usuarioControlador.mostrarFormularioRegistrar = (req, res) => {
  res.render('usuario/formularioRegistro');
}




usuarioControlador.registrar = async (req, res) => {
  let errores = [];
  const { nombre, email, clave, confirmacionClave } = req.body;
  console.log(req.body);
  if (clave != confirmacionClave) {
    errores.push({ mensaje: "LA CONTRASEÑA NO COINCIDE" });
  }
  if (clave.length < 4) {
    errores.push({ mensaje: "LA CONTRASEÑA DEBE SE MAYOR A 4 DIGITOS" });
  }
  if (errores.length > 0) {
    res.render("usuario/formularioRegistro", {
      errores,
      nombre,
      email,
      clave,
      confirmacionClave
    });

    console.log(errores);
  } else {
    // Look for email coincidence
    const emailUsuario = await Usuario.findOne({ email: email });
    if (emailUsuario) {
      req.flash("mensaje_error", "EL MAIL YA EXISTE.");
      console.log('CORREO USUARIO ', emailUsuario);
      res.redirect('/tarea/listar');
    } else {
      // Saving a New User
      const nuevoUsuario = new Usuario({ nombre, email, clave });
      nuevoUsuario.clave = await nuevoUsuario.ecriptarClave(clave);
      await nuevoUsuario.save();
      req.flash("mensaje_exito", "YA ESTAS REGISTRADO.");
      res.redirect("/usuario/formularioLogin");
    }
  }
};




usuarioControlador.mostrarFormularioLogin = (req, res) => {
  res.render("usuario/formularioLogin");
};



usuarioControlador.login = async (req, res) => {

  const { email, clave } = req.body;
  
  console.log(req.body);

  const usuarioEncontrado = await Usuario.findOne({ email: email });
  console.log(usuarioEncontrado);
  req.session.usuario=usuarioEncontrado;
  if (!usuarioEncontrado) {
    req.flash("mensaje_error", "EL USUARIO NO EXISTE");
    console.log('el usuario no existe');
    res.redirect("/usuario/formularioLogin");
  } else {
    // Match Password's User

    const resultado = await usuarioEncontrado.compararClave(clave);
    console.log('resultado', resultado);
    if (resultado) {
      req.flash("mensaje_exito", "BIENVENIDO" + "  " + usuarioEncontrado.nombre);
      req.flash("usuario", usuarioEncontrado);
      console.log('Clave bien');
      res.redirect("/tarea/listar");
    } else {
      req.flash("mensaje_error", "LA CLAVES NO COINCIDEN");
      console.log('clave mal');
      res.redirect("/usuario/formularioLogin");
    }
  }
};


usuarioControlador.desloguear = async (req, res) => {
  //req.flash("usuario", null);
  req.session.usuario=null;
  req.flash("mensaje_exito", "USUARIO DESLOGUEADO");
  console.log(req.flash("usuario"));
  res.redirect("/usuario/formularioLogin");
};


module.exports = usuarioControlador;