import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";
import crypto from "crypto";


const collectionName = "users";

export default class UserDataAccess {
    async getUsers() {
        const result = await Mongo.db
            .collection(collectionName)
            .find()
            .toArray();
        return result;
    }
    async deleteUser(userId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(userId) });
        return result;
    }
    async updateUser(userId, user) {
        if (user.password) {
            const salt = crypto.randomBytes(16);
            crypto.pbkdf2(user.password, salt, 310000, 16, 'sha256', async (err, hashedPassword) => {
                if (err) {
                   throw new  Error("Erro ao ao gerar senha");

                        }
                        user = {...user,password: hashedPassword, salt}
                const result = await Mongo.db
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(userId) },
                    { $set: user }
                );
            return result;
            });

        } else {
            const result = await Mongo.db
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(userId) },
                    { $set: user }
                );
            return result;
        }


    }

}