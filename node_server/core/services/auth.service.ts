import { Service } from 'typedi';
import { Logger } from 'winston';
import getLogger from '../../common/logger';
import { UserDao } from '../daos/userDao';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../common/config';
import { ResponseCodes } from '../../common/response/responseCodes';
import { CreditService } from './credit.service';
import { Types } from 'mongoose';
import { OTPDao } from '../daos/otpDao';
import crypto from 'crypto'; 
import MailService from '../services/mail.service';
import mongoose from 'mongoose';

@Service()
class AuthService {
	private logger: Logger;

	constructor() {
		this.logger = getLogger(module);
	}
	public async login(loginData: {
		email: string;
		password: string;
	}): Promise<any> {
		try {
			// business logic here
			const { email, password } = loginData;
			const userDao = new UserDao();
			const user = await userDao.findUserByEmail(email);
			if (!user) {
				return {
					status: ResponseCodes.USER_NOT_FOUND.code,
					message: ResponseCodes.USER_NOT_FOUND.message,
				};
			}
			// check user password

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return {
					status: ResponseCodes.INVALID_CREDENTIALS.code,
					message: ResponseCodes.INVALID_CREDENTIALS.message,
				};
			}
			//Token Creation

			const token = jwt.sign(
				{ id: user._id, email: user.email },
				config.jwtSecret,
				{
					expiresIn: config.jwtExpiresIn,
				},
			);
			const { password: _, ...userData } = user.toObject();
			return {
				status: ResponseCodes.LOGIN_SUCCESS.code,
				message: ResponseCodes.LOGIN_SUCCESS.message,
				data: { token, user: userData },
			};
		} catch (error) {
			this.logger.error(`Error encountered ${JSON.stringify(error)}`);
			throw error;
		}
	}

	//User registration

	public async register(registerData: {
		name: string;
		email: string;
		password: string;
		phone: string;
		company?: string;
		userType?: string;
		region?: string;
	}): Promise<any> {
		try {
			const { name, email, password, company, userType, region , phone} =
				registerData;
			const userDao = new UserDao();
			const creditService = new CreditService();
			const otpDao = new OTPDao();

			// Check if the user already exists
			const existingUser = await userDao.findUserByEmail(email);
			if (existingUser) {
				return {
					status: ResponseCodes.USER_ALREADY_EXISTS.code,
					message: ResponseCodes.USER_ALREADY_EXISTS.message,
				};
			}
		
			// Hash the password
			const hashedPassword = await bcrypt.hash(password, 10);
			console.log('password--', hashedPassword);

			// Create the user
			const newUser = await userDao.createUser({
				name,
				email,
				phone,
				password: hashedPassword,
				company,
				userType,
				region,
			});
			const userCredit = await creditService.initializeCredits(newUser._id as Types.ObjectId);

			// Generate a token for the new user
			const token = jwt.sign(
				{ id: newUser._id, email: newUser.email },
				config.jwtSecret,
				{ expiresIn: config.jwtExpiresIn },
			);
			const { password: _, ...userData } = newUser.toObject();
			return {
				status: ResponseCodes.REGISTRATION_SUCCESS.code,
				message: ResponseCodes.REGISTRATION_SUCCESS.message,
				data: { token, user: userData, credit: userCredit },
			};
		} catch (error) {
			this.logger.error(`Error encountered ${JSON.stringify(error)}`);
			throw error;
		}
	}


	public async forgetPassword(email: string): Promise<any> {
		try {
			const userDao = new UserDao();
			const otpDao = new OTPDao();

			// Check if the user exists
			const user = await userDao.findUserByEmail(email);
			if (!user) {
				return {
					status: ResponseCodes.USER_NOT_FOUND.code,
					message: ResponseCodes.USER_NOT_FOUND.message,
				};
			}

			// Generate a random 6-digit OTP
			const otp = crypto.randomInt(100000, 999999).toString();
			const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 


			// Create OTP record
			const otpRecord = await otpDao.createOTP({ otp, email, expiresAt });
			// await MailService.sendOTP(email, otp);
			console.log("OTP :: ",otp);
			

			return {
				status: ResponseCodes.OTP_SENT.code,
				message: ResponseCodes.OTP_SENT.message,
				data: { otpId: otpRecord._id.toString() }, 
			};
		} catch (error) {
			this.logger.error(`Error encountered ${JSON.stringify(error)}`);
			throw error;
		}
	}

	// Verify OTP
	public async verifyOTP(
		email: string,
		otpId: string,
		otp: string, 
		newPassword: string
	): Promise<any> {
		try {
			const otpDao = new OTPDao();
			const userDao = new UserDao();

			// Convert otpId from string to mongoose.Types.ObjectId
			const otpObjectId = new mongoose.Types.ObjectId(otpId);

			// Find OTP by ID
			const otpRecord = await otpDao.findOTPById(otpObjectId);
			if (!otpRecord || otpRecord.email !== email || otpRecord.expiresAt < new Date()) {
				return {
					status: ResponseCodes.INVALID_OTP.code,
					message: ResponseCodes.INVALID_OTP.message,
				};
			}

			// Check if the provided OTP matches the stored OTP
			if (otpRecord.otp !== otp) {
				return {
					status: ResponseCodes.INVALID_OTP.code,
					message: "The OTP provided does not match.",
				};
			}

			// OTP is valid, proceed with password update
			await otpDao.deleteOTPById(otpRecord._id);

			// Find user by email
			const user = await userDao.findUserByEmail(email);
			if (!user) {
				return {
					status: ResponseCodes.USER_NOT_FOUND.code,
					message: ResponseCodes.USER_NOT_FOUND.message,
				};
			}

			// Hash the new password
			const hashedPassword = await bcrypt.hash(newPassword, 10);

			// Update the user's password
			await userDao.updateUserPassword(email, hashedPassword);

			return {
				status: ResponseCodes.PASSWORD_RESET_SUCCESS.code,
				message: ResponseCodes.PASSWORD_RESET_SUCCESS.message,
			};
		} catch (error) {
			this.logger.error(`Error encountered ${JSON.stringify(error)}`);
			throw error;
		}
	}
}

export { AuthService };
