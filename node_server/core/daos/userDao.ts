// daos/userDao.ts
import mongoose, { Model } from 'mongoose';
import UserModel, { IUser } from '../models/user.model'; // Import the User model and interface

export class UserDao {
    private userModel: Model<IUser>;
    private excludeSensitiveFields(user: IUser): Partial<IUser> {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    }

	constructor() {
		this.userModel = UserModel; // Initialize with the User model
	}

    public async findUserById(userId: mongoose.Types.ObjectId): Promise<IUser | null> {
        return this.userModel.findById(userId, { password: 0, createdAt: 0, updatedAt: 0 }).exec();
    }

	public async findAllUsers(): Promise<IUser[]> {
		return this.userModel.find().exec();
	}

    public async updateUser(userId: mongoose.Types.ObjectId, updateData: Partial<IUser>): Promise<Partial<IUser> | null> {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
        // Return the updated user document with password excluded
        if (updatedUser) {
            return this.excludeSensitiveFields(updatedUser);
        }
        return null;
    }

	public async deleteUser(
		userId: mongoose.Types.ObjectId,
	): Promise<IUser | null> {
		return this.userModel.findByIdAndDelete(userId).exec();
	}

	public async findUserByEmail(email: string): Promise<IUser | null> {
		return this.userModel.findOne({ email }).exec();
	}
	public async createUser(userData: Partial<IUser>): Promise<IUser> {
		const user = new this.userModel(userData);
		return user.save();
	}

	public async updateUserPassword(
		email: string,
		newPassword: string,
	): Promise<any> {
		return this.userModel.updateOne(
			{ email },
			{ $set: { password: newPassword } },
		);
	}
}
