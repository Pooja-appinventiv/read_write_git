"use strict";
// userBioService.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBios = void 0;
const mongodb_1 = require("mongodb");
const user_model_1 = require("../model/user.model");
const fs = require('fs');
const updateUserBios = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jsonData = JSON.parse(fs.readFileSync('uploads/excelFile-1708418936130-950939131.json', 'utf-8'));
        const uri = 'mongodb://localhost:27017/read_write_poc';
        const client = new mongodb_1.MongoClient(uri);
        yield client.connect();
        const database = client.db();
        // const result = await User.find()
        // console.log("result is---------------->",result)
        // const usersCollection = database.collection('users');
        if (Array.isArray(jsonData)) {
            for (const user of jsonData) {
                console.log(user.bio);
                const dbUser = yield user_model_1.User.findOneAndUpdate({ name: user.name }, { $set: { bio: user.bio } });
            }
        }
        else {
            console.log('jsonData is not an array');
        }
        console.log("User bio update process completed.");
        yield client.close();
    }
    catch (error) {
        console.error("Error updating user bios:", error);
        throw error;
    }
});
exports.updateUserBios = updateUserBios;
