const mongoose = require('mongoose');
const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true, },
    email: {
        type: String,
        required: true, // This makes the email field mandatory
        unique: true
    },
    product: { type: String, required: true }
});

const Lead = mongoose.model('Lead', LeadSchema);

module.exports = Lead;