import express from 'express';
import cors from 'cors';

async function main() {
    const hostname = "localhost";
    const porta = 3000;

    const app = express();

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

    app.listen(porta, hostname, () => {
        console.log(`Servidor rodando em http://${hostname}:${porta}`);
    })
}

main();