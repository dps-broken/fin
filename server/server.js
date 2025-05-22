// // server/server.js

// // --- DOTENV CONFIGURATION (VERY TOP) ---
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);










// const envConfig = dotenv.config({ path: path.resolve(__dirname, '../.env') });

// if (envConfig.error) {
//   console.error('ERROR loading .env file from project root:'.red.bold, envConfig.error);
//   console.warn('Ensure your .env file exists in the project root directory (fintrack-pro/.env)'.yellow);
// } else {
//   if (Object.keys(envConfig.parsed || {}).length === 0) {
//     console.warn('.env file from project root was found, but it might be empty or incorrectly formatted.'.yellow);
//   } else {
//     console.log('.env file from project root loaded successfully.'.green);
//   }
// }
// if (process.env.JWT_SECRET && process.env.JWT_SECRET.length > 0) {
//     console.log('process.env.JWT_SECRET is: LOADED and HAS A VALUE'.green.bold);
// } else if (process.env.JWT_SECRET === '') {
//     console.error('CRITICAL: process.env.JWT_SECRET is LOADED BUT EMPTY. This is invalid.'.red.bold);
// } else {
//     console.error('CRITICAL: process.env.JWT_SECRET is UNDEFINED. Check .env file and dotenv config path.'.red.bold);
// }
// // --- END DOTENV CONFIGURATION ---

// import express from 'express';
// import colors from 'colors';
// import morgan from 'morgan';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';

// import connectDB from './config/db.js';
// import { initializeScheduler } from './services/scheduler.service.js'; // Keep import for now

// import { errorHandler, notFound } from './middleware/errorHandler.middleware.js';

// import authRoutes from './routes/auth.routes.js';
// import userRoutes from './routes/user.routes.js';
// import transactionRoutes from './routes/transaction.routes.js';
// import categoryRoutes from './routes/category.routes.js';
// import goalRoutes from './routes/goal.routes.js';
// import budgetRoutes from './routes/budget.routes.js';
// import analyticsRoutes from './routes/analytics.routes.js';
// // import cronJobRoutes from './routes/cron.routes.js'; // <-- UNCOMMENT LATER IF YOU CREATE THIS

// connectDB();

// const app = express();

// const clientURL = process.env.CLIENT_URL || 'http://localhost:3000'; // For Vercel, set CLIENT_URL in env vars
// app.use(cors({
//   origin: clientURL,
//   credentials: true,
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// app.get('/api', (req, res) => {
//   res.json({ message: 'Welcome to FinTrack Pro API - Vercel Edition' });
// });
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/transactions', transactionRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/goals', goalRoutes);
// app.use('/api/budgets', budgetRoutes);
// app.use('/api/analytics', analyticsRoutes);
// // app.use('/api/crons', cronJobRoutes); // <-- UNCOMMENT LATER & CREATE THE FILE

// app.use(notFound);
// app.use(errorHandler);

// // --- IMPORTANT FOR CRON JOBS ON VERCEL ---
// // node-cron will NOT work reliably in Vercel's serverless environment.
// // You need to set up Vercel Cron Jobs that call specific API endpoints.
// // For now, we comment out the direct initialization.
// // You can re-enable if you create API endpoints for your cron logic.
// /*
// if (process.env.IS_VERCEL_CRON_SETUP_COMPLETE && process.env.EMAIL_USER) { // Example custom flag
//     console.log("Vercel Cron Job setup assumed complete, not running node-cron scheduler.".blue);
// } else if (process.env.NODE_ENV !== 'production' && process.env.EMAIL_USER) { // Run locally if not in prod and email is set
//     console.log("Running node-cron scheduler for local development.".blue);
//     initializeScheduler();
// } else {
//     console.warn("Scheduler not initialized (either in production without Vercel Cron setup, or email not configured).".yellow);
// }
// */
// // Simpler approach for now:
// if (process.env.NODE_ENV === 'development') { // Only run node-cron locally
//     if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
//         initializeScheduler();
//     } else {
//         console.warn("Local dev: Email credentials not set, node-cron scheduler for email reports might not function.".yellow);
//     }
// } else {
//     console.log("Production (Vercel): node-cron scheduler disabled. Use Vercel Cron Jobs instead.".blue);
// }


// // --- VERCEL DOES NOT USE app.listen() FROM THIS FILE ---
// // const PORT = process.env.PORT || 5001;
// // const serverInstance = app.listen(PORT, () => {
// //     console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold);
// //     if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length === 0) {
// //         console.error("FATAL SERVER STARTUP ERROR: JWT_SECRET is still undefined or empty. Shutting down.".red.inverse);
// //         serverInstance.close(() => { process.exit(1); });
// //     } else {
// //         console.log("JWT_SECRET confirmed available at server listen.".green);
// //     }
// // });

// // process.on('unhandledRejection', (err, promise) => {
// //   console.error(`Unhandled Rejection: ${err.message || err}`.red.bold);
// //   console.error(err.stack);
// // });
// // process.on('uncaughtException', (err) => {
// //     console.error('Uncaught Exception: '.red.bold, err.message);
// //     console.error(err.stack);
// //     if (serverInstance) {
// //         serverInstance.close(() => { process.exit(1); });
// //     } else {
// //         process.exit(1);
// //     }
// // });

// export default app; // <-- THIS IS THE CRUCIAL EXPORT FOR VERCEL

























// server/server.js

// --- HARDCODED CONFIG VALUES (NOT RECOMMENDED - EXTREME SECURITY RISK) ---
// Replace these placeholders with your actual secret values.
global.process = global.process || {};
global.process.env = global.process.env || {}; // Ensure process.env exists

process.env.MONGO_URI = "mongodb+srv://fintechUser:fintechPassword@cluster0.5qsjjyd.mongodb.net/fintechDB?retryWrites=true&w=majority";
process.env.JWT_SECRET = "a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f83453uh453";
process.env.JWT_EXPIRES_IN = "7d"; // Or your desired expiration
process.env.EMAIL_HOST = "smtp.gmail.com"; // Or your email provider's SMTP host
process.env.EMAIL_PORT = "587"; // Or your email provider's port (as string)
process.env.EMAIL_SECURE = "false"; // "true" for SSL (e.g., port 465), "false" for TLS (e.g., port 587)
process.env.EMAIL_USER = "dwivedipranjal1234567@gmail.com"; // Your actual email address
process.env.EMAIL_PASS = "sqzqjofmjpdgmljo"; // Your actual email password
process.env.EMAIL_FROM_NAME = "FinTrack Pro";
process.env.EMAIL_FROM_ADDRESS = "dwivedipranjal1234567@gmail.com"; // Can be the same as EMAIL_USER
process.env.CLIENT_URL = "https://your-fintrack-prod-url.vercel.app"; // **** REPLACE with your Vercel production URL after first deployment ****
process.env.NODE_ENV = "production"; // For Vercel deployment
process.env.CRON_SECRET = "YOUR_STRONG_CRON_TRIGGER_SECRET_HERE_IF_USING_CRONS"; // For securing cron endpoints

// Basic check for absolutely critical hardcoded values
if (!process.env.MONGO_URI || process.env.MONGO_URI.includes("YOUR_ATLAS_USER")) {
    console.error("FATAL ERROR: Hardcoded MONGO_URI is missing or still has placeholders!".red.bold);
    process.exit(1);
}
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes("YOUR_VERY_VERY_STRONG")) {
    console.error("FATAL ERROR: Hardcoded JWT_SECRET is missing or still has placeholders!".red.bold);
    process.exit(1);
}
console.log("SERVER CONFIG: Using hardcoded environment variables (SECURITY RISK!).".yellow.bold);
// --- END HARDCODED CONFIG VALUES ---

import express from 'express';
import colors from 'colors'; // Make sure this is imported if you use .red, .green etc. in other files.
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './config/db.js';
import { initializeScheduler } from './services/scheduler.service.js';

import { errorHandler, notFound } from './middleware/errorHandler.middleware.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import categoryRoutes from './routes/category.routes.js';
import goalRoutes from './routes/goal.routes.js';
import budgetRoutes from './routes/budget.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import cronJobRoutes from './routes/cron.routes.js'; // Make sure this file exists and routes are defined

connectDB(); // Uses process.env.MONGO_URI defined above

const app = express();

// CORS uses process.env.CLIENT_URL defined above
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// NODE_ENV is hardcoded to "production", so morgan 'dev' logging won't run here.
// If you need dev logging on Vercel for some reason, change NODE_ENV or this condition.
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to FinTrack Pro API - Vercel Edition (Hardcoded Config)' });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/crons', cronJobRoutes);

app.use(notFound);
app.use(errorHandler);

// Scheduler: node-cron won't run reliably on Vercel serverless.
// Vercel Cron Jobs should call endpoints defined in cron.routes.js.
// The initializeScheduler() for node-cron is mainly for local development.
if (process.env.NODE_ENV === 'development') {
    // Check if hardcoded email user/pass exist before initializing scheduler
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && !process.env.EMAIL_USER.includes("your_email") && !process.env.EMAIL_PASS.includes("YOUR_EMAIL_APP_PASSWORD")) {
        initializeScheduler();
    } else {
        console.warn("Local dev: Email credentials placeholders still present or missing, node-cron scheduler for email reports disabled.".yellow);
    }
} else {
    console.log("Production (Vercel): node-cron scheduler disabled. Use Vercel Cron Jobs via /api/crons endpoints.".blue);
}

// Vercel handles listening; app.listen() is not needed.
// Unhandled rejection and exception handlers are still good practice.
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection: ${err.message || err}`.red.bold);
  console.error(err.stack);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception: '.red.bold, err.message);
    console.error(err.stack);
    process.exit(1); // Exit on uncaught exceptions
});

export default app;