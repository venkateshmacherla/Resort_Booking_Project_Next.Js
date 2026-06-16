
'use server'

import DBConnection from '../utils/config/db';
import { signIn } from "../auth"


export async function loginAction(loginDetails) {
    await DBConnection();

    console.log("Login action called", loginDetails)
    
    try{
        const response = await signIn("credentials", {
            email: loginDetails.email,
            password: loginDetails.password,
            redirect: false
        })
        return { success: true}
    } catch (error) {
        throw new Error("Invalid email or password ")
    }
}