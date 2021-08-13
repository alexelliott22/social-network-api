const {User} = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find()
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(allUsers => res.json(allUsers))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    },

    getOneUser({params}, res) {
        User.find({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(singleUser => res.json(singleUser))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    },

    addUser({body}, res) {
        User.create(body)
        .then(userData => {
            if(!userData) {
                console.log('failed to add a new user')
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    },

    updateUser({params, body}, res) {
        User.findByIdAndUpdate(
            params.id, 
            body, 
            {new: true, runValidators: true}
        ).then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err))
    },

    deleteUser({params}, res) {
        User.findByIdAndDelete(params.id)
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({params}, res) {
        User.findByIdAndUpdate(
            params.userId,
            {$addToSet: {friends: params.friendId}},
            {new: true, runValidators: true}
        ).then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err))
    },

    deleteFriend({params}, res) {
        User.findByIdAndUpdate(
            params.UserId,
            {$pull: {friends: params.friendId}},
            {new: true, runValidators: true}
        ).then(userData => {
            //if no pizza is found send 404 error
            if(!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}

module.exports = userController;