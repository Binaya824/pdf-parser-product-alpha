import { Router } from 'express';
import authRoutes from './auth.route';
import userRoute from './user.route';
import fileRoute from './file.route';
import dataRoute from './data.route';

class Routes {
	private router: Router;

	constructor() {
		this.router = Router();
		this.initializeRoutes();
	}

	private initializeRoutes(): void {
		/* -------- Auth route ---------- */
		authRoutes(this.router);
		/*-------- User Route --------- */
		userRoute(this.router);
		/*-------- File Uploading Route --------- */
		fileRoute(this.router); 
		/* -------- data route ---------- */
        dataRoute(this.router);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default Routes;
