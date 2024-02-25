"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const post = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: String,
        },
    ],
}, {
    timestamps: true,
});
exports.Post = (0, mongoose_1.model)("Post", post);
