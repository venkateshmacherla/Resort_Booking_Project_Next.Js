
'use server';

import DBConnection from "../utils/config/db";

export async function productAction(resortData) {
    await DBConnection()

    console.log("Resort Details", resortData)
}