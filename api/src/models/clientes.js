import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({

}, {versionKey: false})

const clientes = mongoose.model("clientes", clienteSchema);

export default clientes