import mongoose from "mongoose";

const credencialSchema = new mongoose.Schema(
  {
    contaId: {
      type: mongoose.Types.ObjectId,
      required: [true, "O id da conta é obrigatório"],
    },
    senhaHash: {
      type: String,
      required: [true, "É necessário informar o hash da senha da conta"],
    },
    
    ultimoLogin: { type: Date },
    tentativasFalhas: { type: Number },
  },
  { versionKey: false }
);

const credenciais = mongoose.model("credenciais", credencialSchema);

export default credenciais;
