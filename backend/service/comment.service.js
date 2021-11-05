const commentDAO = require('../dao/comment.dao');

class CommentService {
    async createComment(reqBody) {
        const {comment, user, publication} = reqBody;
        return commentDAO.createComment(comment, user, publication);
    }

    async getComments(reqParams) {
        const {publication} = reqParams;
        return commentDAO.getComments(publication);
    }

    async deleteComment(reqParams) {
        const {id} = reqParams;
        return commentDAO.deleteComment(id);
    }
}

module.exports = new CommentService();