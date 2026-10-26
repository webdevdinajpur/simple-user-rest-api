const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    roll: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    section: {
        type: String,
    },
    admissionId: {
        type: String,
        required: true,
        unique: true
    },
    guardianName: {
        type: String,
    },
    guardianContact: {
        type: String,
    },
    address: {
        type: String,
    },
    photo: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'graduated', 'suspended', 'left'],
        default: 'active'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
