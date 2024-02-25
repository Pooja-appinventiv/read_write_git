"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Post' }],
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)('user', userSchema);
