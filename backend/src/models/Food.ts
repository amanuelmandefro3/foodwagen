import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  food_name: { type: String, required: true },
  food_price: { type: Number, required: true },
  food_rating: { type: Number, min: 0, max: 5 },
  food_image: { type: String, required: true },
  restaurant_name: { type: String, required: true },
  restaurant_logo: { type: String, required: true },
  restaurant_status: { type: String, enum: ["Open Now", "Closed"], required: true },
}, {
  timestamps: true
});

export default mongoose.model('Food', foodSchema);
