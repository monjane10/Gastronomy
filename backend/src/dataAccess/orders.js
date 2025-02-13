import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";


const collectionName = "orders";

export default class orderDataAccess {

    async getOrders() {
        const result = await Mongo.db
            .collection(collectionName)
            .aggregate([
                {
                    $lookup: {
                        from: "orderItems",       
                        localField: "_id",          
                        foreignField: "orderId",    
                        as: "orderItems"            
                    }
                },
                {
                    $lookup: {
                        from: "users",        
                        localField: "userId",         
                        foreignField: "_id",    
                        as: "userDetails"
                    }
                },
                {
                   $project: {
                    "userDetails.password": 0,
                    "userDetails.salt": 0
                   }
                },
                {
                    $unwind: "$orderItems"
                },
                {
                    $lookup: {
                        from: "plates",
                        localField: "orderItems.plateId",
                        foreignField: "_id",
                        as: "orderItems.itemDetails"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        userDetails: { $first: '$userDetails' },
                        orderItems: { $push: '$orderItems' },
                        pickupStatus: { $first: '$pickupStatus' },
                        pickupTime: { $first: '$pickupTime' }
                    }
                }
            ])
            .toArray();
        return result;
    }

    async getOrdersByUserId(userId) {
        const result = await Mongo.db
            .collection(collectionName)
            .aggregate([
                {
                    $match: {
                        userId: new ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: "orderItems",       
                        localField: "_id",          
                        foreignField: "orderId",    
                        as: "orderItems"            
                    }
                },
                {
                    $lookup: {
                        from: "users",        
                        localField: "userId",         
                        foreignField: "_id",    
                        as: "userDetails"
                    }
                },
                {
                   $project: {
                    "userDetails.password": 0,
                    "userDetails.salt": 0
                   }
                },
                {
                    $unwind: "$orderItems"
                },
                {
                    $lookup: {
                        from: "plates",
                        localField: "orderItems.plateId",
                        foreignField: "_id",
                        as: "orderItems.itemDetails"
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        userDetails: { $first: '$userDetails' },
                        orderItems: { $push: '$orderItems' },
                        pickupStatus: { $first: '$pickupStatus' },
                        pickupTime: { $first: '$pickupTime' }
                    }
                }
            ])
            .toArray();
        return result;
    }
    async addOrder(order) {
        const {items, ...orderRest} = order;

        orderRest.createdAt = new Date();
        orderRest.pickupStatus = "Pendente";
        orderRest.userId = new ObjectId(orderRest.userId);

        const newOrder = await Mongo.db
            .collection(collectionName)
            .insertOne(orderRest);

            if(!newOrder.insertedId) {
                throw new Error("Não foi possível adicionar o pedido");
            }
            items.map((item) => {
                item.plateId = new ObjectId(item.plateId);
                item.orderId = new ObjectId(newOrder.insertedId);
            });
        const result = await Mongo.db
            .collection('orderItems')
            .insertMany(items);
        return result;
    }

    
    async deleteOrder(orderId) {
        const itemsToDelete = await Mongo.db
            .collection('orderItems')
            .deleteMany({ orderId: new ObjectId(orderId) });

        const orderToDelete = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(orderId) });
        
            const result = {
                itemsToDelete,
                orderToDelete
            };
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

