export class AppError extends Error {
	public isOperational: boolean;
	public statusCode: number;
	public customErrorCode?: number;
	public status: string;

	constructor(isOperational: boolean, statusCode: number, message: string, status: string, customErrorCode?: number,) {
		super(message);
		this.isOperational = isOperational;
		this.statusCode = statusCode;
		this.customErrorCode = customErrorCode;
		this.status = status;

		Error.captureStackTrace(this, this.constructor);
	}
}