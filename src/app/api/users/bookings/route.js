import DBConnection from "@/app/utils/config/db";
import BookingModel from "@/app/utils/models/Booking";
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await DBConnection();

  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const bookings = await BookingModel.find({
      email: session.user.email,
    }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: bookings,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
      },
      { status: 500 }
    );
  }
}