import { Logger } from "winston";
import getLogger from "../../common/logger";
import { CreditDao } from "../daos/creditDao";
import { ICredit } from "../models/credit.model";
import { Types } from "mongoose";

class CreditService {
    private logger: Logger;

    constructor() {
        this.logger = getLogger(module);
    }

    public async initializeCredits(userId: Types.ObjectId): Promise<ICredit> {
        try {
            const creditDao = new CreditDao();
            // Create an initial credit entry for the user with 100 credits
            const credit = await creditDao.createCredit(userId, 100);
            return credit;
        } catch (error) {
            this.logger.error(`Error initializing credits: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    public async increaseCredits(userId: Types.ObjectId, amount: number): Promise<ICredit> {
        try {
            const creditDao = new CreditDao();
            // Increase the user's credits
            const credit = await creditDao.updateCredits(userId, amount, true);
            return credit;
        } catch (error) {
            this.logger.error(`Error increasing credits: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    public async decreaseCredits(userId: Types.ObjectId, amount: number): Promise<ICredit> {
        try {
            const creditDao = new CreditDao();
            // Decrease the user's credits
            const credit = await creditDao.updateCredits(userId, amount, false);
            return credit;
        } catch (error) {
            this.logger.error(`Error decreasing credits: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    public async resetCredits(userId: Types.ObjectId, newBalance: number): Promise<ICredit | null> {
        try {
            const creditDao = new CreditDao();
            // Reset the user's credits to the specified new balance
            const credit = await creditDao.resetCredits(userId, newBalance);
            return credit;
        } catch (error) {
            this.logger.error(`Error resetting credits: ${JSON.stringify(error)}`);
            throw error;
        }
    }

    public async getCredits(userId: Types.ObjectId): Promise<ICredit | null> {
        try {
            const creditDao = new CreditDao();
            // Retrieve the user's current credit balance
            const credit = await creditDao.findCreditByUserId(userId);
            return credit;
        } catch (error) {
            this.logger.error(`Error retrieving credits: ${JSON.stringify(error)}`);
            throw error;
        }
    }
}

export { CreditService };
