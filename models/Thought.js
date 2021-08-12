const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please enter a reaction!',
            maxLength: [280, 'You cannot enter more than 280 characters!']
        },
        username: {
            type: String,
            required: 'Please enter a username'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please enter a thought!',
            maxLength: [280, 'Your post cannot exceed 280 characters!']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeVal => dateFormat(timeVal)
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
        virtuals: true,
        getters: true
        },
        id: false
    }
)

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;