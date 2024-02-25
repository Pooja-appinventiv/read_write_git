import { NextFunction, Request, Response } from "express";
import { updateUserBios } from "../service/update.service";


class updatedata{
        async updateUser(){
            console.log("============================,usercontroller")
        try {
            await updateUserBios();
           console.log("User bios updated successfully");
        } catch (error) {
            console.error("Error updating user bios:", error);
        }        
    }
 }
export const getdata=new updatedata();