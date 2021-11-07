const likeDAO = require('../dao/like.dao');

class LikeService {
    async createLike(reqParams) {
        const {publication, user} = reqParams;
        return likeDAO.createLike(user, publication);
    }

    async getLikes(reqParams) {
        const {publication} = reqParams;
        return likeDAO.getLikes(publication);
    }

    async getUserLike(reqParams) {
        const {user, publication} = reqParams;
        return likeDAO.getUserLike(user, publication);
    }

    async deleteLike(reqParams) {
        const {user, publication} = reqParams;
        return likeDAO.deleteLike(user, publication);
    }

    async addLike(reqBody) {
        const {publication, user} = reqBody;
        return likeDAO.addLike(publication, user);
    }

    async countLike(reqParams) {
        const {publication} = reqParams;
        return likeDAO.countLikes(publication);
    }
}

module.exports = new LikeService();