'use server'

import DBConnection from '../utils/config/db';
import UserModel from '../utils/models/User';

export async function registerAction(registerDetails) {
    await DBConnection();

    console.log("Register action called", registerDetails)

    try{
        await UserModel.create({
            username: registerDetails.username,
            email: registerDetails.email,
            password: registerDetails.password
        })
        return { success: true,
            message: "User registered successfully"
        }
    } catch (error) {
        console.error("Error occurred while registering user:", error)
        return { success: false,
            message: "Error occurred while registering user"
        }
    }
}