import mongoose, { Model } from 'mongoose';
import OTPModel, { IOTP } from '../models/otp.model'; // Import the OTP model and interface

export class OTPDao {
    private otpModel: Model<IOTP>;

    constructor() {
        this.otpModel = OTPModel; // Initialize with the OTP model
    }

    public async createOTP(otpData: Partial<IOTP>): Promise<IOTP> {
        const otp = new this.otpModel(otpData);
        return otp.save();
    }

    public async findOTPByEmail(email: string): Promise<IOTP | null> {
        return this.otpModel.findOne({ email }).exec();
    }

    public async deleteOTPById(otpId: mongoose.Types.ObjectId): Promise<IOTP | null> {
        return this.otpModel.findByIdAndDelete(otpId).exec();
    }

    public async findOTPById(otpId: mongoose.Types.ObjectId): Promise<IOTP | null> {
        return this.otpModel.findById(otpId).exec();
    }
}
