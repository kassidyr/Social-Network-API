const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    addUsers,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend,
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

// /api/users/:id/friends/:friendid
router
.route('/:id/friends/:friendid')
.post(addNewFriend)
.delete(deleteFriend);


module.exports = router;