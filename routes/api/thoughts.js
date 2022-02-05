const router = require('express').Router();
const{
    getThoughts,
    getOneThought,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought-controller');

//api/thoughts
router
.route('/')
.get(getThoughts)
.post(addThought);

//api/thoughts/:thoughtid
router
.route('/:thoughtid')
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtid/reactions
router
.route('/:thoughtid/reactions')
.post(addReaction);

// /api/thoughts/:thoughtid/reactions/reactionid
router
.route('/:thoughtid/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;
