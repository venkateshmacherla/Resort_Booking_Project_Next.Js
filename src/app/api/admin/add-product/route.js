
import DBConnection from "@/app/utils/config/db";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import path from 'path';
import ProductModel from "@/app/utils/models/Product";

export async function GET() {
    await DBConnection()

    const records = await ProductModel.find({})

    return NextResponse.json({ data: records })
}

export async function POST(request) {
    await DBConnection();

    const data = await request.formData();
    const title = data.get("title"); 
    const description = data.get("description"); 
    const pricePerNight = data.get("pricePerNight"); 
    const imageFile = data.get("imageFile");
    const location = data.get("location"); 
    const category = data.get("category"); 
    const maxGuests = data.get("maxGuests"); 
    const amenities = data.get("amenities"); 
    const availability = data.get("availability");

    const fileBufferData = await imageFile.arrayBuffer();
    const buffer = Buffer.from(fileBufferData);
    const imagePath = path.join(process.cwd(), 'public', 'uploads', imageFile.name);

    try {
        await writeFile(imagePath, buffer);
        const newProduct = new ProductModel({ 
            title: title,
            description: description,
            pricePerNight: pricePerNight,
            image: `/uploads/${imageFile.name}`,
            location: location,
            category: category,
            maxGuests: maxGuests,
            amenities: amenities,
            availability: availability === "true"
        })
        await newProduct.save()
        return NextResponse.json({Response: 'Successfully Uplpaded', success: true},
            { status: 200 }
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false}, {status: 500})
    }
}