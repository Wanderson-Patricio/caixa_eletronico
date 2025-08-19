import mongoose from "mongoose";

const transacaoSchema = new mongoose.Schema(
  {
    contaOrigemId: {
      type: mongoose.Types.ObjectId,
      required: [true, "O id da conta de origem é obrigatório"],
    },
    contaDestinoId: {
      type: mongoose.Types.ObjectId,
      required: [true, "O id da conta de destino é obrigatório"],
    },
    tipoTransacao: {
      type: String,
      enum: ["saque", "depósito", "transferência"],
      required: [true,"É necessário informar o tipo de transação."],
    },
    valor: {
        type: Number,
        validate: {
            validator: (num) => !isNaN(num) && num > 0,
            message: "O valor da transação deve ser um número maior que zero."
        },
        required: [true, "É necessário informar o valor da transação."]
    },
    DataTransacao: {
        type: Date,
        required: [true, "É necessário informar a data da transação."]
    },
    status: {
        type: String,
        enum: ['concluída', 'em processamento', 'falha']
    }
  },
  { versionKey: false }
);

const transacoes = mongoose.model("transacoes", transacaoSchema);

export default transacoes;
