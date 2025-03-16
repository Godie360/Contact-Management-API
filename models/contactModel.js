const mongoose = require('mongoose');

const contactSchema =  mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"],
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },

    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
        validate: {
            validator: function(v) {
               
                return /^(\+255|255|0)[67]\d{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Please use format like +255XXXXXXXXX, 255XXXXXXXXX, or 0XXXXXXXXX`
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
    
})

module.exports = mongoose.model("Contact", contactSchema);

