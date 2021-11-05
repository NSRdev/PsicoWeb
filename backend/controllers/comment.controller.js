const commentService = require('../service/comment.service');

class CommentController {
    async createComment(req, res) {
        try {
            const id = await commentService.createComment(req.body);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async getComments(req, res) {
        try {
            const publications = await commentService.getComments(req.params);
            res.status(200).json(publications);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async deleteComment(req, res) {
        try {
            const id = await commentService.deleteComment(req.params);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }
}

module.exports = new CommentController();