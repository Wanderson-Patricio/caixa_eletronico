import mongoose from "mongoose";
import validateCPF from "../utils/validateCpf.js";

const clienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome do cliente é obrigatório"]
    },
    cpf: {
        type: String,
        required: [true, "É necessário informar o CPF do cliente."],
        validate: {
            validator: validateCPF,
            message: "Informe um CPF válido."
        }
    },
    dataNascimento: {
        type: Date,
        required: [true, "A data de nascimento do cliente é obrigatória"]
    },
    telefone: {
        type: String,
        required: [true, "O telefone do cliente é obrigatório"],
        validate: {
            validator: (number) => /\(\d{2}\) \d{4,5}-\d{4}/.test(number),
            message: "O telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX"
        }
    },
    email: {
        type: String,
        required: [true, "O e-mail do cliente é obrigatório"],
        validate: {
            validator: (em) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em),
            message: "Informe um e-mail válido."
        }
    },
}, {versionKey: false})

const clientes = mongoose.model("clientes", clienteSchema);

export default clientes