const userDAO = require('../dao/user.dao');

class UserService {
    async createUser(reqBody) {
        const {email, password, name, lastname, phone} = reqBody;
        return userDAO.createUser(email, password, name, lastname, phone);
    }

    async getUser(reqParams) {
        const {id} = reqParams;
        return userDAO.getUser(id);
    }

    async getUsers() {
        return userDAO.getUsers();
    }

    async deleteUser(reqParams) {
        const {id} = reqParams;
        return userDAO.deleteUser(id);
    }

    async updateUser(reqBody) {
        const {id, email, password, name, lastname, phone} = reqBody;
        return userDAO.updateUser(id, email, password, name, lastname, phone);
    }
}

module.exports = new UserService();