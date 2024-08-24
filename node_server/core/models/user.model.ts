import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

// Define the User interface with all the necessary fields
export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  company: string;
  userType: 'student' | 'developer' | string; // Adjust types as needed
  region: string;
  isVerified: boolean; 
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
    trim: true,
  },
  userType: {
    type: String,
    default: 'user',
  },
  region : {
     type: String,
     required: false,
     trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false, // Default value set to false
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create and export the User model
const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
