const db = require('../database');

class CommentDAO {
    async createComment(comment, user, publication) {
        const [id] = await db('comments')
            .insert({
                comment,
                user,
                publication
            })
            .returning('id');

        return id;
    }

    async getComments(publication) {
        return db('comments')
            .where('publication', '=', publication)
            .where('deleted', false);
    }

    async deleteComment(id) {
        return db('comments')
            .update('deleted', true)
            .where('id', '=', id)
            .returning('id');
    }
}

module.exports = new CommentDAO();