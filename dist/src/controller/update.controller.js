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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getdata = void 0;
const update_service_1 = require("../service/update.service");
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
}
exports.getdata = new updatedata();
