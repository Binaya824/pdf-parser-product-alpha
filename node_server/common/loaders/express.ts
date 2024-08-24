import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import getLogger from '../logger';
import morganMiddleware from '../logger/morgan';
import isAuthenticated from '../middlewares/isAuthenticated';
import CoreRoutes from './../../core/routes/index';



/**
 * Extends the Express Request interface to include custom properties for authentication.
 * 
 * This declaration adds an `auth` property to the Express `Request` object to hold
 * authentication-related data. This can include user identifiers and other custom
 * properties related to authentication.
 * 
 * @interface Request
 * @property {Object} auth - Optional object containing authentication details.
 * @property {string} [auth.id] - Optional user identifier from the authentication process.
 * 
 * Example usage:
 * ```typescript
 *    const userId: Types.ObjectId = new Types.ObjectId(req.auth.id);
 * ```
 */
declare module 'express' {
    export interface Request {
        auth?: {
            id?: string;
            // Add other custom properties as needed
        };
    }
}

const log = getLogger(module);

class ExpressLoader {
	private app: Express;

	constructor(app: Express) {
		this.app = app;
	}

	private handleStatusRequests(req: Request, res: Response): void {
		res.status(200).end();
	}

	public async load(): Promise<void> {
		this.app.enable('trust proxy');
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(compression());
		this.app.use(morganMiddleware);

		const coreRoutes = new CoreRoutes();
		// const walletRoutes = new WalletRoutes();
		// const paymentRoutes = new PaymentRoutes();
		// const kycRoutes = new KycRoutes();
		// const uploadRoutes = new UploadRoutes();

		// this.app.use('/api/external', paymentRoutes.getRouter());
		// this.app.use('/api/internal/wallet', walletRoutes.getRouter());
		// this.app.use('/api/internal', coreRoutes.getRouter());

		this.app.use(isAuthenticated);

		this.app.use('/api/core', coreRoutes.getRouter());
		// this.app.use('/api/wallet', walletRoutes.getRouter());
		// this.app.use('/api/payment', paymentRoutes.getRouter());
		// this.app.use('/api/player', kycRoutes.getRouter());
		// this.app.use('/api/upload', uploadRoutes.getRouter());

		// this.app.use(ErrorHandler.errorHandler);

		this.app.use((err, req, res, next) => {
			// Check if err.details exists
			if (err.isOperational) {
				res.status(err.statusCode || 500).json({
					status_code: err.customErrorCode || 500,
					message: err.message || 'Internal Server Error',
					status: err.status || 'error',
				});
			}
			if (err.details) {
				// Handle Celebrate validation errors
				const validationError = err.details.get('body');
				console.log(err);
				const errorMessage = validationError
					? validationError.message
					: 'Validation error';
				res.status(422).json({ error: errorMessage });
			} else {
				// Handle other errors
				const statusCode = err.status || 500;
				res.status(statusCode).json({ error: err.message });
			}
		});

		// this.app.use(this.handleNotFound);
		// this.app.use(this.handleUnauthorizedError);
		// this.app.use(this.handleCelebrateErrors);
		// this.app.use(this.handleGeneralErrors);
	}
}

export { ExpressLoader };
