const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'group' 
        }
    ]
});

// UserSchema.pre('remove', function(next) {
//     var group = this;
//     mongoose.model('group').update(
//         { members: group._id },
//         { $pull: { groups: group._id } },
//         { multi: true },
//         next);
// });

module.exports = User = mongoose.model('user', UserSchema);