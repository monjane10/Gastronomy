import ordersDataAccess from "../dataAccess/orders.js";
import {ok, serverError} from '../helpers/httpResponse.js';

export default class OrdersControllers {
    constructor() {
        this.dataAccess = new ordersDataAccess();
    }

    async addOrder(order) {
        try {
            const users = await this.dataAccess.addOrder(order);
            return ok(users);
        } catch (error) {
            return serverError(error);
        }
    }

    async getOrders() {
        try {
            const users = await this.dataAccess.getOrders();
            return ok(users);
        } catch (error) {
            return serverError(error);
        }
    }

    async getOrdersByUserId(userId) {
        try {
            const users = await this.dataAccess.getOrdersByUserId(userId);
            return ok(users);
        } catch (error) {
            return serverError(error);
        }
    }

    async deleteOrder(orderId) {
        try {
            const result = await this.dataAccess.deleteOrder(orderId);
            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async updateOrder(orderId, order) {
        try {
            const result = await this.dataAccess.updateOrder(orderId, order);
            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }
}