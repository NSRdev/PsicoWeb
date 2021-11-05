const publicationService = require('../service/publication.service');

class PublicationController {
    async createPublication(req, res) {
        try {
            const id = await publicationService.createPublication(req.body);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async getPublication(req, res) {
        try {
            const publication = await publicationService.getPublication(req.params);
            res.status(200).json(publication);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async getPublications(req, res) {
        try {
            const publications = await publicationService.getPublications();
            res.status(200).json(publications);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async deletePublication(req, res) {
        try {
            const id = await publicationService.deletePublication(req.params);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }

    async updatePublication(req, res) {
        try {
            const id = await publicationService.updatePublication(req.body);
            res.status(200).json(id);
        } catch (err) {
            res.status(500).json('Something went wrong!');
        }
    }
}

module.exports = new PublicationController();