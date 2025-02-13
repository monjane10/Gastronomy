import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";


const collectionName = "plates";

export default class platesDataAccess {
    async getPlates() {
        const result = await Mongo.db
            .collection(collectionName)
            .find()
            .toArray();
        return result;
    }

    async getAvailablePlates() {
        const result = await Mongo.db
            .collection(collectionName)
            .find({available: true})
            .toArray();
        return result;
    }

    async addPlate(plate) {
        const result = await Mongo.db
            .collection(collectionName)
            .insertOne(plate);
        return result;
    }

    
    async deletePlate(plateId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete({ _id: new ObjectId(plateId) });
        return result;
    }
    async updatePlate(plateId, plate) {          
            const result = await Mongo.db
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(plateId) },
                    { $set: plate }
                );
            return result;
        


    }
}

