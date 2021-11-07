const db = require('../database');

class LikeDAO {
    async createLike(user, publication) {
        return db('likes')
            .insert({
                user,
                publication
            })
            .returning('id');
    }

    async getLikes(publication) {
        return db('likes')
            .where('publication', '=', publication)
            .where('deleted', false);
    }

    async getUserLike(user, publication) {
        return db('likes')
            .where('publication', '=', publication)
            .where('user', '=', user)
            .where('deleted', false);
    }

    async deleteLike(user, publication) {
        return db('likes')
            .update('deleted', true)
            .where('publication', '=', publication)
            .where('user', '=', user)
            .returning('id');
    }

    async addLike(publication, user) {
        return db('likes')
            .update('deleted', false)
            .where('publication', '=', publication)
            .where('user', '=', user)
            .returning('id');
    }

    async countLikes(publication) {
        return db('likes')
            .count()
            .where('publication', '=', publication)
            .where('deleted', false)
            .returning('id');
    }
}

module.exports = new LikeDAO();