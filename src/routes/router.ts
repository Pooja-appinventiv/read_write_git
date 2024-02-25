import express from "express";
import { getdata } from "../controller/update.controller";

export const router= express();
console.log("========================++++++++++++++++++++++")
router.post('/update',getdata.updateUser)