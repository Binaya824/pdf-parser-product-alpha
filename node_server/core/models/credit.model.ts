import mongoose, { Schema, Document } from 'mongoose';

// Define the Credit interface
export interface ICredit extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the user
  credits: number; // Number of credits
  updatedAt: Date; // Timestamp for when credits were last updated
}

// Define the Credit schema
const CreditSchema: Schema<ICredit> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  credits: {
    type: Number,
    default: 100, // Initial credit amount
    min: 0, // Credits cannot be negative
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create and export the Credit model
const CreditModel = mongoose.model<ICredit>('Credit', CreditSchema);

export default CreditModel;
