import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';
import { Mongo } from '../database/mongo.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { text } from 'stream/consumers';

const colletionName = "users";

passport.use(new LocalStrategy({ usernameField: 'email'}, async (email, password, callback) => {
    const user = await Mongo.db.collection(colletionName).findOne({ email: email });
    if (!user) {
        return callback(null, false);
    }

    const saltBuffer = user.salt.buffer;

    crypto.pbkdf2(password, saltBuffer, 310000, 16, 'sha256', (err, hashedPassword) => {
        if (err) {
            return callback(null, false);
        }

        const userPasswordBuffer = Buffer.from(user.password.buffer);

        if(!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
            return callback(null, false);
        }

        const {password, salt, ...rest} = user;
        return callback(null, rest);
        
    });
}
));

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
    const checkUser = await Mongo.db.collection(colletionName).findOne({ email: req.body.email });
    if (checkUser) {
        return res.status(500).json({
            success: false,
            status: 500,
            body: {
                text: "Utilizador já cadastrado"
            
            }
        });
    }

    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 16, 'sha256', async (err, hashedPassword) => {
        if(err){
            return res.status(500).json({
                success: false,
                status: 500,
                body: {
                    text: "Erro ao cryptografar a senha",
                    error: err
                
                }
            });
        }
        const result = await Mongo.db.collection(colletionName).insertOne({
            email: req.body.email,
            password: hashedPassword,
            salt
        });
        
        if(result.insertedId) {
            const user = await Mongo.db.collection(colletionName).findOne({ _id: result.insertedId });

            const token = jwt.sign(user, 'secret');

            return res.send({
                success: true,
                status: 200,
                body: {
                    text: "Utilizador criado com sucesso",
                    token,
                    user,
                    loggedIn: true
                }
            });
        }
    });
    
});

authRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user) => {
        if (error) {
            return res.status(500).json({
                success: false,
                status: 500,
                body: {
                    text: "Erro ao autenticar o utilizador",
                    error
                }
            });
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                status: 400,
                body: {
                    text: "Utilizador não encontrado",
                    error: "Invalid credentials"
                }
            });
        }

        // Gerar o token após autenticar com sucesso
        const token = jwt.sign(user, 'secret');
        return res.status(200).json({
            success: true,
            status: 200,
            body: {
                text: "Utilizador logado com sucesso!",
                user,
                token
            }
        });
    })(req, res, next);
});


export default authRouter;