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

    const saltBuffer = user.salt.saltBuffer;

    crypto.pbkdf2(password, saltBuffer, 310000, 16, 'sha256', (err, hashedPassword) => {
        if (err) {
            return callback(null, false);
        }

        const userPasswordBuffer = Buffer.from(user.password.Buffer);

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
                text: "Email já cadastrado"
            
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
                    text: "Usuário criado com sucesso",
                    token,
                    user,
                    loggedIn: true
                }
            });
        }
    });
    
});

export default authRouter;