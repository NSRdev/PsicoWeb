const db = require('../database');

class UserDAO {
    async createUser(email, password, name, lastname, phone) {
        const [id] = await db('users')
            .insert({
                email,
                password,
                name,
                lastname,
                phone
            })
            .returning('id');

        return id;
    }

    async getUser(id) {
        return db('users')
            .where('id', '=', id)
            .where('deleted', false);
    }

    async getUsers() {
        return db('users')
            .where('deleted', false);
    }

    async deleteUser(id) {
        return db('users')
            .update('deleted', true)
            .where('id', '=', id)
            .returning('id');
    }

    async updateUser(id, email, password, name, lastname, phone) {
        return db('users')
            .update('email', email)
            .update('password', password)
            .update('name', name)
            .update('lastname', lastname)
            .update('phone', phone)
            .where('id', '=', id)
            .returning('id');
    }
}

module.exports = new UserDAO();