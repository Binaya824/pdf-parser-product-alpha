import { Logger } from "winston";
import getLogger from "../../common/logger";
import { UserDao } from "../daos/userDao";
import { Types } from "mongoose";
import { IUser } from "../models/user.model";

class UserService {
    private logger: Logger
    private userId: Types.ObjectId;

    constructor(userId: Types.ObjectId) {
        this.logger = getLogger(module);
        this.userId = userId;
    }

    public async getProfile(): Promise<any> {
        try {
            const userDao = new UserDao();
            const user = await userDao.findUserById(this.userId);
            return {
                status: 200,
                message: "User profile details sent.",
                data: user
            }
        } catch (error) {
            this.logger.error(`Error encountered ${JSON.stringify(error)}`)
            throw error
        }
    }

    public async editProfile(updateData: Partial<IUser>): Promise<any> {
        try {
            const userDao = new UserDao();
            const updateUser = await userDao.updateUser(this.userId, updateData);
            return {
                status: 200,
                message: "Profile updated successfully.",
                data:updateUser
            };
        } catch (error) {
            this.logger.error(`Error encountered ${JSON.stringify(error)}`)
            throw error
        }
    }
}

export { UserService }