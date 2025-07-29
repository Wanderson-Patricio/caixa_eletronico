import mongoose from "mongoose";

const contaSchema = new mongoose.Schema(
  {
    clienteId: {
      type: mongoose.Types.ObjectId,
      required: [true, "O id do cliente é obrigatório"],
    },
    tipoConta: {
      type: String,
      enum: ["poupanca", "corrente"],
      required: true,
    },
    numeroConta: {
      type: String,
      validate: {
        validator: (number) => /\d{5}-\d{1}/.test(number),
        message: "O número da conta deve estar no formato XXXXX-X",
      },
      required: [true, "O id do cliente é obrigatório"],
    },
    saldo: { type: Number },
    ativa: { type: Boolean },
  },
  { versionKey: false }
);

const contas = mongoose.model("contas", contaSchema);

export default contas;
