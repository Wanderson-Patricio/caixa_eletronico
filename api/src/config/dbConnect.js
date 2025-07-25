import mongoose from "mongoose";

const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
const MONGO_DB_PORT = process.env.MONGO_DB_PORT;
const MONGO_DB_DIRECT_CONNECTION = process.env.MONGO_DB_DIRECT_CONNECTION;
const MONGO_DB_SERVER_SELECTION_TIMEOUT_MS = process.env.MONGO_DB_SERVER_SELECTION_TIMEOUT_MS;
const MONGO_DB_APP_NAME = process.env.MONGO_DB_APP_NAME;

const MONGO_DB_CONNECTION_STRING = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/caixaEletronico?directConnection=${MONGO_DB_DIRECT_CONNECTION}&serverSelectionTimeoutMS=${MONGO_DB_SERVER_SELECTION_TIMEOUT_MS}&appName=${encodeURIComponent(MONGO_DB_APP_NAME)}`;

mongoose.connect(MONGO_DB_CONNECTION_STRING);

const db = mongoose.connection;

export default db;
