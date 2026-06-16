
'use server'

import DBConnection from '../utils/config/db';
import { signIn } from "../auth"


export async function loginAction(loginDetails) {
    await DBConnection();

    console.log("Login action called", loginDetails)
    
    try{
        await signIn("credentials", {
            email: loginDetails.email,
            password: loginDetails.password,
            redirect: false,
        });
        return { success: true}
    } catch (error) {
        console.log('Login Error:', error)

        return {
            success: false, 
            message: "Invalid email or password", 
        };
    }
}