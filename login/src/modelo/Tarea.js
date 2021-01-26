const { Schema, model } = require("mongoose");

const TareaSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        }, usuarioId: {
            type: String ,
            required: true
          } 

    },
    {
        timestamps: true
    }
);

module.exports = model("Tarea", TareaSchema);
