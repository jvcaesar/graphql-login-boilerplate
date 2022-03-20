const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    token: {
        type: String,
    },
    role: {
        type: Number,
        default: 0,
    },
    tokenExp: {
        type: Number,
    }
})

module.exports = model('User', userSchema)