const userService = require('../service/user.service');

class UserController {
    async createUser(req, res) {
        try {
            const id = await userService.createUser(req.body);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async getUser(req, res) {
        try {
            const user = await userService.getUser(req.params);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async getUsers(req, res) {
        try {
            const users = await userService.getUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async deleteUser(req, res) {
        try {
            const id = await userService.deleteUser(req.params);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async updateUser(req, res) {
        try {
            const id = await userService.updateUser(req.body);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }
}

module.exports = new UserController();