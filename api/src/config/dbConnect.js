import mongoose from "mongoose";

const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
const MONGO_DB_PORT = process.env.MONGO_DB_PORT;

const MONGO_DB_CONNECTION_STRING = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/caixaEletronico`;

mongoose.connect(MONGO_DB_CONNECTION_STRING);

const db = mongoose.connection;

export default db;
