import mongoose, { Schema, Document } from 'mongoose';

export interface IOTP extends Document {
  _id: mongoose.Types.ObjectId; 
  otp: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
}

const OTPSchema: Schema<IOTP> = new Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '5m', // OTP will expire after 5 minutes
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const OTPModel = mongoose.model<IOTP>('OTP', OTPSchema);

export default OTPModel;
