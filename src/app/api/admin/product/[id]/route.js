import DBConnection from "@/app/utils/config/db";
import ProductModel from "@/app/utils/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    await DBConnection();

    const { id } = await params;

    console.log("Product Id:", id);

    try {

        const product = await ProductModel.findById(id);

        if (!product) {
            return NextResponse.json({success: false, message: "No product found"});
        }

        return NextResponse.json({success: true, data: product});

    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, message: "Product ID is invalid"});
    }
}