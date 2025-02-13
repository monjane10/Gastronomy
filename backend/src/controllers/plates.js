import platesDataAccess from "../dataAccess/plates.js";
import {ok, serverError} from '../helpers/httpResponse.js';

export default class PlatesControllers {
    constructor() {
        this.dataAccess = new platesDataAccess();
    }

    async addPlate(plate) {
        try {
            const users = await this.dataAccess.addPlate(plate);
            return ok(users);
        } catch (error) {
            return serverError(error);
        }
    }

    async getPlates() {
        try {
            const users = await this.dataAccess.getPlates();
            return ok(users);
        } catch (error) {
            return serverError(error);
        }
    }

    async getAvailablePlates() {
        try {
            const users = await this.dataAccess.getAvailablePlates();
            return ok(users);
        } catch (error) {
            return serverError(error);
        }
    }

    async deletePlate(plateId) {
        try {
            const result = await this.dataAccess.deletePlate(plateId);
            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async updatePlate(plateId, plate) {
        try {
            const result = await this.dataAccess.updateUser(plateId, plate);
            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }
}