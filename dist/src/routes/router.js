"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const update_controller_1 = require("../controller/update.controller");
exports.router = (0, express_1.default)();
console.log("========================++++++++++++++++++++++");
exports.router.post('/update', update_controller_1.getdata.updateUser);
