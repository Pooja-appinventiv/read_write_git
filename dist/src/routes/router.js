"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const update_controller_1 = require("../controller/update.controller");
const multer_config_1 = require("../../multer.config");
exports.router = (0, express_1.default)();
console.log("========================++++++++++++++++++++++");
exports.router.post('/update', update_controller_1.getdata.updateUser);
exports.router.post('/upload', multer_config_1.upload.single('excelFile'), update_controller_1.getdata.uploadExcel);
exports.router.post('/upload/chunk', multer_config_1.upload.single('file'), update_controller_1.getdata.uploadchunks);
