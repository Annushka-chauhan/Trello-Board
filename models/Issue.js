const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ""
    },

    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "boards",
        required: true
    },

    status: {
        type: String,
        enum: [
            "TODO",
            "IN_PROGRESS",
            "REVIEW",
            "DONE"
        ],
        default: "TODO"
    },

    priority: {
        type: String,
        enum: [
            "LOW",
            "MEDIUM",
            "HIGH"
        ],
        default: "MEDIUM"
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }

}, {
    timestamps: true
});

const issueModel = mongoose.model(
    "issues",
    issueSchema
);

module.exports = issueModel;