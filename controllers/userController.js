const { User } = require('../models');

  module.exports = {

  // Get all users
  async getAllUsers(req, res) {
    try {
      const userData = await User.find({});
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get one user by ID
  async getUserById(req, res) {
    try {
      const userData = await User.findById(req.params.userId);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  
  // Update user by ID
  async updateUserById(req, res) {
    try {
      const userData = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  

  // Delete user
  async deleteUserById(req, res) {
    try {
      const userData = await User.findByIdAndDelete(req.params.userId);
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  

  // Add friend to user's friend list
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove friend from user's friend list
  async removeFriend({ params }, res) {
    try {
      const dbUserData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id' });
      }
      const removed = !dbUserData.friends.includes(params.friendId);
      if (removed) {
        res.json({ message: 'Friend successfully removed', dbUserData });
      } else {
        res.json(dbUserData);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },
};