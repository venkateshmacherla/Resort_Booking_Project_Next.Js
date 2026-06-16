import { NextResponse } from 'next/server';
import { auth } from '@/app/auth';
import DBConnection from '@/app/utils/config/db';
import BookingModel from '@/app/utils/models/Booking';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    await DBConnection();

    const bookings = await BookingModel.find({
      email: session.user.email,
    }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      bookings: JSON.parse(JSON.stringify(bookings)),
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch bookings',
      },
      { status: 500 }
    );
  }
}