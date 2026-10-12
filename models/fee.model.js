const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },
    dueDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Fee', feeSchema);
