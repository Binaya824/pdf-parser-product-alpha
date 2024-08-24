import express, { Express } from 'express';
import AppLoader from './common/loaders';
import config from './common/config';
import getLogger from './common/logger';
import Database from './common/db/db';

const logger = getLogger(module);
const database = new Database(`${config.mongo.URL}/${config.mongo.dbName}`);

class Server {
	private app: Express;

	constructor() {
		this.app = express();
	}

	private async start(): Promise<void> {
		const appLoader = new AppLoader(this.app);
		await database.connect();
		await appLoader.load();

		this.app
			.listen(config.port, () => {
				logger.info(`Server is running at http://localhost:${config.port}`);
			})
			.on('error', (error) => {
				logger.error(error);
				process.exit(1);
			});
	}

	public async initialize(): Promise<void> {
		try {
			await this.start();
		} catch (error) {
			logger.error('Error starting server:', error);
			process.exit(1);
		}
	}
}

const server = new Server();

server.initialize();
