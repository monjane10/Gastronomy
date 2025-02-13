import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";


const collectionName = "orders";

export default class orderDataAccess {
    async getOrders() {
        const result = await Mongo.db
            .collection(collectionName)
            .find()
            .toArray();
        return result;
    }
    
    async addOrder(order) {
        const result = await Mongo.db
            .collection(collectionName)
            .insertOne(order);
        return result;
    }

    
    async deleteOrder(orderId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(orderId) });
        return result;
    }
    async updateOrder(orderId, order) {          
            const result = await Mongo.db
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(orderId) },
                    { $set: order }
                );
            return result;
        


    }
}

