const router = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

// /api/users
router.route('/')
.get(getAllUsers)
.post(addUser)

// /api/users/:id
router.route('/:id')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;
