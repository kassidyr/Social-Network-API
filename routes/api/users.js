const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    addUsers,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');


// /api/users
router
.route('/')
.get(getUsers)
.post(addUsers);

// /api/users/:id
router
.route('/:id')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;