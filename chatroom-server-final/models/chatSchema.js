const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    created: {
    	type: String,
    	required: true
    }
});

const chat = module.exports = mongoose.model('chat', chatSchema);
