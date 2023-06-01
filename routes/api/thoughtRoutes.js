const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThought,
    updateThoughtById,
    createReaction,
    deleteReaction,
    
} = require('../../controllers/thoughtController');

// /api/thoughts
// Define the routes for GET and POST all Thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
// Define the routes for GET, PUT and DELETE Thoughts
router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtById).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
// Define the route for POST Reaction to a Thought
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoghts/:thoughtId/reactions/:reactionId
// Define the route for DELETE Reaction to a Thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export the router
module.exports = router;