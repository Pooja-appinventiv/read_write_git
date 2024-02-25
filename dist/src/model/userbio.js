"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userbio = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Userbio = (0, mongoose_1.model)('Userbio', userSchema);
