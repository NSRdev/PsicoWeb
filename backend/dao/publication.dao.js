const db = require('../database');

class PublicationDAO {
    async createPublication(title, subtitle, heading, content, user) {
        const [id] = await db('publications')
            .insert({
                title,
                subtitle,
                heading,
                content,
                user
            })
            .returning('id');

        return id;
    }

    async getPublication(id) {
        return db('publications')
            .where('id', '=', id)
            .where('deleted', false);
    }

    async getPublications() {
        return db('publications')
            .where('deleted', false);
    }

    async deletePublication(id) {
        return db('publications')
            .update('deleted', true)
            .where('id', '=', id)
            .returning('id');
    }

    async updatePublication(id, title, subtitle, heading, content) {
        return db('publications')
            .update('title', title)
            .update('subtitle', subtitle)
            .update('heading', heading)
            .update('content', content)
            .where('id', '=', id)
            .returning('id');
    }
}

module.exports = new PublicationDAO();