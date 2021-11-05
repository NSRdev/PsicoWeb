const publicationDAO = require('../dao/publication.dao');

class PublicationService {
    async createPublication(reqBody) {
        const {title, subtitle, heading, content, user} = reqBody;
        return publicationDAO.createPublication(title, subtitle, heading, content, user);
    }

    async getPublication(reqParams) {
        const {id} = reqParams;
        return publicationDAO.getPublication(id);
    }

    async getPublications() {
        return publicationDAO.getPublications();
    }

    async deletePublication(reqParams) {
        const {id} = reqParams;
        return publicationDAO.deletePublication(id);
    }

    async updatePublication(reqBody) {
        const {id, title, subtitle, heading, content} = reqBody;
        return publicationDAO.updatePublication(id, title, subtitle, heading, content);
    }
}

module.exports = new PublicationService();