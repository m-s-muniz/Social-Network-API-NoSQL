const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

module.exports = {
  
 // Get all thoughts
    async getAllThoughts(req, res) {
        try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
        } catch (err) {
        res.status(500).json(err);
        }
    },

    // Get thought by Id
    async getThoughtsById(req, res) {
        try {
        const thought = await Thought.findOne({_id:req.params.thoughtId});
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        } else {
            res.json(thought);
        }
        } catch (err) {
        res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
        const thought = await Thought.create(req.body);
        res.status(201).json(thought);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    
    // Delete a thought
    async deleteThought(req,res) {
        try {
            const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};