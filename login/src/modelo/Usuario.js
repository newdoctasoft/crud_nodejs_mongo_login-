const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const UsuarioSchema = new Schema({
    nombre: { type: String },
    email: { type: String, required: true, unique: true },
    clave: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
});

UsuarioSchema.methods.ecriptarClave = async (clave) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(clave, salt);
};

UsuarioSchema.methods.compararClave = async function (clave) {
    return await bcrypt.compare(clave, this.clave);
};

module.exports = model("Usuario", UsuarioSchema);
