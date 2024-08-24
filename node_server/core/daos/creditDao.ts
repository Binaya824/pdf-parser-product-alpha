import { Types } from 'mongoose';
import CreditModel, {ICredit } from '../models/credit.model';

export class CreditDao {
    // Create a new credit entry for a user
    public async createCredit(userId: Types.ObjectId, initialCredits: number): Promise<ICredit> {
        const credit = new CreditModel({
            userId: userId,
            credits: initialCredits
        });
        return credit.save();
    }

    // Find credit entry by user ID
    public async findCreditByUserId(userId: Types.ObjectId): Promise<ICredit | null> {
        return CreditModel.findOne({ userId: userId }).exec();
    }

    // Update credits (increase or decrease based on the `increase` flag)
    public async updateCredits(userId: Types.ObjectId, amount: number, increase: boolean): Promise<ICredit | null> {
        const update = increase ? { $inc: { credits: amount } } : { $inc: { credits: -amount } };

        // Find the credit document and update it
        return CreditModel.findOneAndUpdate({ userId: userId }, update, { new: true }).exec();
    }

    // Reset credits to a specific value
    public async resetCredits(userId: Types.ObjectId, newBalance: number): Promise<ICredit | null> {
        return CreditModel.findOneAndUpdate({ userId: userId }, { credits: newBalance }, { new: true }).exec();
    }
}