import UserDataAccess from "../dataAccess/users.js";
import {ok, serverError} from '../helpers/httpResponse.js';

export default class UsersControllers {
    constructor() {
        this.dataAccess = new UserDataAccess();
    }

    async getUsers() {
        try {
            const users = await this.dataAccess.getUsers();
            return ok(users);
        } catch (error) {
            return serverError(error);
        }
    }

    async deleteUser(userId) {
        try {
            const result = await this.dataAccess.deleteUser(userId);
            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async updateUser(userId, user) {
        try {
            const result = await this.dataAccess.updateUser(userId, user);
            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }
}