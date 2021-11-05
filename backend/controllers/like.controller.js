const likeService = require('../service/like.service');

class LikeController {
    async createLike(req, res) {
        try {
            const id = await likeService.createLike(req.params);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async getLikes(req, res) {
        try {
            const likes = await likeService.getLikes(req.params);
            res.status(200).json(likes);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async getUserLike(req, res) {
        try {
            const likes = await likeService.getUserLike(req.params);
            res.status(200).json(likes);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async deleteLike(req, res) {
        try {
            const id = await likeService.deleteLike(req.params);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async updateLike(req, res) {
        try {
            const id = await likeService.updateLike(req.body);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async addLike(req, res) {
        try {
            const id = await likeService.addLike(req.body);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }
}

module.exports = new LikeController();