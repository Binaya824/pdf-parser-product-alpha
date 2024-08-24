import mongoose from 'mongoose';
import getLogger from '../logger';

const log = getLogger(module);

class Database {
    private connectionString: string;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.connectionString);
            log.info('Connected to MongoDB');
        } catch (error) {
            log.error('Error connecting to MongoDB:', error);
            process.exit(1); // Exit process with failure
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await mongoose.disconnect();
            log.info('Disconnected from MongoDB');
        } catch (error) {
            log.error('Error disconnecting from MongoDB:', error);
        }
    }
}

export default Database;
