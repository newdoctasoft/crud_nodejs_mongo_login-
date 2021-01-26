

const helpers = {}

helpers.autenticar = (req, res, next) => {
    const usuario =req.session.usuario;
    console.log('autenticacion',usuario);
    //req.flash('usuario',usuario[0]);
    if (usuario!=null) {
      
        return next();
    } else {

        req.flash("mensaje_error", "ES NECESARIO LOGUEARSE");
        console.log('usuario', req.flash("usuario"))
        res.redirect("/usuario/formularioLogin");
    }
}

module.exports = helpers;