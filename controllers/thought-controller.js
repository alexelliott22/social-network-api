const {User, Thought} = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
        .then(thoughtsData => res.json(thoughtsData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    },

    getSingleThought({params}, res) {
        Thought.findById(params.id)
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    },

    addThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findByIdAndUpdate(
                params.userId,
                {$addToSet: {thoughts: _id}},
                {new: true, runValidators: true}
            )
        })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
    },

    updateThought({params, body}, res) {
        Thought.findByIdAndUpdate(
            params.id,
            body,
            {new: true, runValidators: true}
        )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
    },

    deleteThought({params}, res) {
        Thought.findByIdAndDelete(params.thoughtId)
        .then(thoughtData => {
           if(!thoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
           }
           return User.findByIdAndUpdate(
                params.userId,
                {$pull: {thoughts: params.id}},
                {new: true}
            )
        })
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData)
        })
        .catch(err => res.json(err));
    },

    addReaction({params, body}, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        });
    },

    deleteReaction({params, body}, res) {
        Thought.findByIdAndUpdate(
            params.thoughtId,
            {$pull: {reactions: body.reactionId}},
            {new: true}
        )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;