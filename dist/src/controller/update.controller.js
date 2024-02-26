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
exports.getdata = void 0;
const update_service_1 = require("../service/update.service");
const fs_1 = __importDefault(require("fs"));
class updatedata {
    updateUser() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("============================,usercontroller");
            try {
                yield (0, update_service_1.updateUserBios)();
                console.log("User bios updated successfully");
            }
            catch (error) {
                console.error("Error updating user bios:", error);
            }
        });
    }
    uploadExcel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                return res.status(400).send('No file uploaded');
            }
            let xlsx = require("xlsx");
            const workbook = xlsx.readFile(req.file.path);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(sheet);
            const jsonFilename = req.file.filename.replace(/\.[^/.]+$/, ".json");
            const jsonFilePath = `./uploads/${jsonFilename}`;
            fs_1.default.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
            fs_1.default.unlinkSync(req.file.path);
            res.send('File uploaded successfully');
        });
    }
    uploadchunks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    return res.status(400).send('No file uploaded.');
                }
                const xlsx = require("xlsx");
                const workbook = xlsx.readFile(req.file.path);
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const range = xlsx.utils.decode_range(sheet['!ref']);
                console.log("range===================", range);
                console.log("-----------------------", range.e.r);
                const rowCount = range.e.r + 1;
                const chunkSize = 5000;
                // Extract headers
                const headers = [];
                for (let c = range.s.c; c <= range.e.c; c++) {
                    const cellAddress = xlsx.utils.encode_cell({ r: range.s.r, c: c });
                    const cell = sheet[cellAddress];
                    headers.push(cell ? cell.v : undefined);
                }
                const consolidatedData = [];
                for (let i = 0; i < rowCount; i += chunkSize) {
                    console.log("=====================>");
                    const rangeStart = i + 1;
                    console.log("rangeStart================", rangeStart);
                    const rangeEnd = Math.min(i + chunkSize, rowCount);
                    console.log("rangeEnd------------------->", rangeEnd);
                    // Extract data for the chunk
                    const data = [];
                    for (let r = rangeStart; r <= rangeEnd; r++) {
                        const row = {};
                        for (let c = range.s.c; c <= range.e.c; c++) {
                            const cellAddress = xlsx.utils.encode_cell({ r: r, c: c });
                            const cell = sheet[cellAddress];
                            row[headers[c]] = cell ? cell.v : undefined;
                        }
                        data.push(row);
                    }
                    consolidatedData.push(...data);
                }
                const jsonData = JSON.stringify(consolidatedData);
                const fileName = `uploads/consolidated_data.json`;
                // Write data to JSON file
                // const jsonData = JSON.stringify(data);
                // const fileName = `uploads/data_${rangeStart}_${rangeEnd}.json`;
                fs_1.default.writeFileSync(fileName, jsonData);
                fs_1.default.unlinkSync(req.file.path);
                res.send('file uploaded and read successfully!');
            }
            catch (error) {
                console.error('Error uploading file:', error);
                res.status(500).send('Error uploading file.');
            }
        });
    }
}
exports.getdata = new updatedata();
