'use server';

import { auth } from "../auth";
import DBConnection from "../utils/config/db";
import BookingModel from "../utils/models/Booking";
import UserModel from "../utils/models/User";

export async function bookingAction(bookingDetails) {


const session = await auth();

if (!session?.user?.email) {
    return {
        success: false,
        message: "Please login first",
    };
}

const email = session.user.email;

console.log("Email check:", email);

await DBConnection();

try {
    const user = await UserModel.findOne({
        email: email,
    });

    if (!user) {
        return {
            success: false,
            message: "User not found",
        };
    }

    const checkInDate = new Date(bookingDetails.selectedDates.checkIn);
    console.log(
        "CheckIn Type:",
        typeof checkInDate,
        checkInDate
    );

    const checkOutDate = new Date(bookingDetails.selectedDates.checkOut);

    const totalNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    const totalPrice = totalNights * bookingDetails.record.pricePerNight;

    const userBookingDetails =
        await BookingModel.create({
            startDate: checkInDate,
            endDate: checkOutDate,
            email: email,
            productName: bookingDetails.record.title,
            price: bookingDetails.record.pricePerNight,
            totalPrice: totalPrice,
            image: bookingDetails.record.image,
            product: bookingDetails.record._id,
            user: user._id,
        });

    const userId = user._id;

    await UserModel.findByIdAndUpdate(
        userId,
        {
            $push: {
                bookings:
                    userBookingDetails._id,
            },
        },
        {
            returnDocument: "after",
        }
    );

    const updatedUser =
        await UserModel.findById(userId);

    console.log(
        "Updated User Bookings:",
        updatedUser.bookings
    );

    console.log(
        "Booking Created:",
        userBookingDetails
    );

    return {
        success: true,
        message:
            "Booking created successfully",
        booking: JSON.parse(
            JSON.stringify(userBookingDetails)
        ),
    };

} catch (error) {
    console.error(
        "Error creating booking:",
        error
    );

    return {
        success: false,
        message:
            "Failed to create booking",
    };
}


}
