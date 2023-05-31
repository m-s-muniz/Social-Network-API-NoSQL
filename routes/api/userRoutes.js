const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,

} = require('../../controllers/userController');

// /api/users
// GET and POST all users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userID
// GET user id, PUT update user id and DELETE user by id
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

// /api/users/:userID/friends/:friendId
// POST add friend
router.route('/:userId/friends/:friendId').post(addFriend);

// /api/users/:userID/friends/:friendId
// DELETE remove Friend
router.route('/:userId/friends/:friendId').delete(removeFriend);

// Export the router
module.exports = router;