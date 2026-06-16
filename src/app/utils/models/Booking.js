
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    totalGuests: {
      type: Number,
      default: 1,
    },

    bookingStatus: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Confirmed",
        "Cancelled",
        "Completed"
      ],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default BookingModel;