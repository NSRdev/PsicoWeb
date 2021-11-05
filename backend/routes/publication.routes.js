const express = require('express');
const router = express.Router();

const publicationController = require('../controllers/publication.controller');
const likeController = require('../controllers/like.controller')
const commentController = require('../controllers/comment.controller');

// PUBLICACIÓN
router.get('/', publicationController.getPublications);

router.get('/:id', publicationController.getPublication);

router.post('/create', publicationController.createPublication);

router.put('/:id', publicationController.updatePublication);

router.delete('/:id', publicationController.deletePublication);



// LIKES
router.get('/:publication/likes', likeController.getLikes);

router.get('/:publication/likes/:user', likeController.getUserLike);

router.post('/:publication/likes/:user', likeController.createLike);

router.delete('/:publication/likes/:user', likeController.deleteLike);



// COMENTARIOS
router.get('/:publication/comments', commentController.getComments);

router.post('/:publication/comments', commentController.createComment);

router.delete('/:publication/comments/:id', commentController.deleteComment);


module.exports = router;