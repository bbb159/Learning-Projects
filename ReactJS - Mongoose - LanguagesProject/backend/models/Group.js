const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const Comments = new Schema({
    authorId: {
        type: Schema.Types.ObjectId
    },
    authorName: {
        type: String
    },
    commentBody: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//Create schema
const GroupSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    maxUsersAmount:{
        type: Number,
        required: true
    },
    currentAmoutOfUsers:{
        type: Number,
        required: false
    },
    owner: {
         type: Schema.Types.ObjectId,
         ref: 'user' 
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user' 
        }
    ],  
    mainPhoto:{
        type: String,
        required: false
    },
    comments: [Comments]
});

GroupSchema.pre('remove', function(next) {
    var group = this;
    this.model('user').update(
        { groups: group._id },
        { $pull: { groups: group._id } },
        { multi: true },
        next
    );
});

module.exports = Group = mongoose.model('group', GroupSchema);