import dotenv from 'dotenv';

// Load environment variables from .env file
const envFound = dotenv.config();

if (!envFound) {
	// This error should crash whole process if .env file is missing
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// Define the required environment variables
const requiredEnvs = [
	//   'PORT',
	//   'IS_DEV',
	//   'LOG_LEVEL',
	'emailPass',
	'emailUser',
	'MONGO_URL',
	//   'MONGO_USERNAME',
	//   'MONGO_PASSWORD',
	'MONGO_DB',
	'JWT_SECRET',
	'ML_SERVER_BASE_URL',
	//   'GOOGLE_AUTH_CLIENT_ID',
	//   'GOOGLE_AUTH_CLIENT_SECRET'

];



// Function to check and ensure all required environment variables are present
function checkRequiredEnvs() {
	const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);

	if (missingEnvs.length > 0) {
		console.error('⚠️  Missing the following environment variables:');
		missingEnvs.forEach((env) => console.error(`- ${env}`));
		process.exit(1); // Exit the process with failure
	}
}

// Validate environment variables
checkRequiredEnvs();

// Export configuration


export default {
	port: parseInt(process.env.PORT || '8080', 10),
	isDev: process.env.IS_DEV === 'true',
	logs: {
		level: process.env.LOG_LEVEL || 'silly',
	},
	mongo: {
		URL: process.env.MONGO_URL as string,
		user: process.env.MONGO_USERNAME as string,
		pass: process.env.MONGO_PASSWORD as string,
		dbName: process.env.MONGO_DB as string,
	},

	emailUser: process.env.EMAIL_USER as string,
	emailPass: process.env.EMAIL_PASS as string,
	jwtExpiresIn: '2592000s',
	jwtSecret: process.env.JWT_SECRET as string,
	googleAuthClientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
	googleAuthClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
	ml_server_url: process.env.ML_SERVER_BASE_URL as string

};
