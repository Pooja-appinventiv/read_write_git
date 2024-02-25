"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserandbio = exports.generateUsersAndPosts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./src/model/user.model");
const post_model_1 = require("./src/model/post.model");
const userbio_1 = require("./src/model/userbio");
function generateRandomObjectId() {
    return new mongoose_1.default.Types.ObjectId();
}
function generateRandomPostContent() {
    const posts = ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5"];
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
}
function generateRandomComment() {
    const comments = ["Comment 1", "Comment 2", "Comment 3", "Comment 4", "Comment 5"];
    const randomIndex = Math.floor(Math.random() * comments.length);
    return comments[randomIndex];
}
function generateRandomBio() {
    const bios = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];
    const randomIndex = Math.floor(Math.random() * bios.length);
    return bios[randomIndex];
}
function generateUsersAndPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let i = 0; i < 10; i++) {
                console.log(`Creating user ${i + 1}`);
                const userId = generateRandomObjectId();
                const user = new user_model_1.User({
                    _id: userId,
                    name: `User${i + 1}`,
                    mobileNumber: `123456789${i.toString().padStart(4, '0')}`,
                    address: `Address of User${i + 1}`,
                    posts: [],
                });
                yield user.save();
                for (let j = 0; j < Math.random() * 10; j++) {
                    console.log(`Creating post ${j + 1} for user ${i + 1}`);
                    const postId = generateRandomObjectId();
                    const post = new post_model_1.Post({
                        _id: postId,
                        content: generateRandomPostContent(),
                        likes: [userId],
                        comments: [],
                    });
                    yield post.save();
                    const numLikes = Math.floor(Math.random() * 11);
                    for (let k = 0; k < numLikes; k++) {
                        const likeId = generateRandomObjectId();
                        post.likes.push(likeId);
                    }
                    const numComments = Math.floor(Math.random() * 6);
                    for (let l = 0; l < numComments; l++) {
                        const comment = generateRandomComment();
                        post.comments.push(comment);
                    }
                    yield post.save();
                    yield user_model_1.User.findByIdAndUpdate(userId, { $push: { posts: postId } });
                }
            }
            console.log("User and post generation completed.");
        }
        catch (error) {
            console.error("Error generating users and posts:", error);
        }
    });
}
exports.generateUsersAndPosts = generateUsersAndPosts;
function generateUserandbio() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let i = 0; i < 100000; i++) {
                console.log(`Creating user ${i + 1}`);
                const userId = generateRandomObjectId();
                const user = new userbio_1.Userbio({
                    _id: userId,
                    name: `User${i + 1}`,
                    bio: generateRandomBio(),
                });
                yield user.save();
            }
            console.log("User and post generation completed.");
        }
        catch (error) {
            console.error("Error generating users and posts:", error);
        }
    });
}
exports.generateUserandbio = generateUserandbio;
