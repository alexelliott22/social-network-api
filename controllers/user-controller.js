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
            {id: params.id}, 
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
        User.findByIdAndDelete({id: params.id})
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;