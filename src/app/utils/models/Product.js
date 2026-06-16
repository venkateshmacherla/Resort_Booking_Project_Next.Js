import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    pricePerNight: {
        type: Number,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
        enum: [
            "Beach Resort",
            "Mountain Resort",
            "Luxury Villa",
            "Lake View Resort",
            "Adventure Resort"
        ]
    },

    maxGuests: {
        type: Number,
        required: true,
    },

    amenities: {
        type: [String],
        default: ['Ac', 'Greyser', 'Tv', 'Wi-Fi', 'Elevator', 'Break-fast'],
        set: function (amenities) {
            const defaultValues = [
                'Ac',
                'Greyser',
                'Tv',
                'Wi-Fi',
                'Elevator',
                'Break-fast'
            ];

            if (!amenities) {
                return defaultValues;
            }

            if (typeof amenities === 'string') {
                amenities = amenities
                    .split(',')
                    .map(item => item.trim());
            }

            return [...new Set([...defaultValues, ...amenities])];
        }
    },

    availability: {
        type: Boolean,
        default: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
);

const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default ProductModel;
