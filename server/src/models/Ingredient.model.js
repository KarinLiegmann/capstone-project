import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ingredientSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    ingredientName: { type: String, required: true },
    id: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export default Ingredient;