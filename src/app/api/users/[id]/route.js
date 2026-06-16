import DBConnection from "@/app/utils/config/db";
import UserModel from "@/app/utils/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    await DBConnection();

    const { id } = await params;

    console.log("Dynamic Id:", id);

    try {
        const user = await UserModel.findById(id).populate('bookings');

        console.log("User:", user);

        if (!user) {
            return NextResponse.json({success: false, message: "No user found"}, { status: 404 });
        }

        return NextResponse.json({success: true, data: user}, { status: 200 });

    } catch (error) {
        console.log(error);

        return NextResponse.json({success: false, message: "Invalid User ID"}, { status: 500 });
    }
}