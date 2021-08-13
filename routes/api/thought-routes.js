const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    addReaction,
    addThought,
    deleteReaction,
    deleteThought,
    updateThought
} = require('../../controllers/thought-controller')

// /api/thoughts
router.route('/')
.get(getAllThoughts)

// /api/thoughts/:id
router.route('/:id')
.get(getSingleThought)
.put(updateThought)

// /api/thoughts/:userId
router.route('/:userId')
.post(addThought)

// /api/thoughts/:thoughtId/users/:userId
router.route('/:thoughtId/users/:userId')
.delete(deleteThought)

// /api/thoughts/:thoughtId/reactions
router.route(':thoughtId/reactions')
.post(addReaction)
.delete(deleteReaction)

module.exports = router;