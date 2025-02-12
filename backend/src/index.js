import express from 'express';
import cors from 'cors';
import { Mongo } from './database/mongo.js';
import {config} from 'dotenv';
import authRouter from './auth/auth.js';
import usersRouter from './routes/users.js';

config();

async function main() {
    const hostname = "localhost";
    const porta = 3000;

    const app = express();
    const mongoConection = await Mongo.connect({
        mongoConectionString: process.env.MONGO_CS,
        mongoDbName: process.env.MONGO_DB_NAME
    });
    console.log(mongoConection.text);

    app.use(express.json());
    app.use(cors());

    app.get("/", (req, res) => {
        res.send(
            {
                success: true,
                status: 200,
                body: "Bem Vindo ao Gastronomy!"
            }
        );
    });

    app.use("/auth", authRouter);
    app.use("/users", usersRouter);
    app.listen(porta, hostname, () => {
        console.log(`Servidor rodando em http://${hostname}:${porta}`);
    })
}

main();