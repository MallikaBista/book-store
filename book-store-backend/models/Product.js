import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  quantity: Number,
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
