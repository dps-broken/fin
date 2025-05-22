// server/routes/cron.routes.js
import express from 'express';
import asyncHandler from 'express-async-handler';
// Import the logic functions from your scheduler service
import { runDailyReportJobLogic, runMonthlyReportJobLogic } from '../services/scheduler.service.js';

const router = express.Router();

// Middleware to secure cron endpoints (simple secret key check)
const checkCronSecret = (req, res, next) => {
    const cronSecret = req.headers['x-cron-secret'];
    if (cronSecret && cronSecret === process.env.CRON_SECRET) {
        next();
    } else {
        console.warn('Unauthorized attempt to access cron endpoint.'.yellow);
        res.status(401).json({ message: 'Unauthorized: Invalid or missing cron secret.' });
    }
};

// Endpoint for Vercel Cron to trigger daily report
router.post('/run-daily-report', checkCronSecret, asyncHandler(async (req, res) => {
    console.log('Received Vercel Cron request for daily report.'.blue);
    try {
        await runDailyReportJobLogic();
        res.status(200).json({ message: 'Daily report job execution initiated successfully.' });
    } catch (error) {
        console.error("Error in /run-daily-report endpoint:".red, error);
        res.status(500).json({ message: 'Failed to execute daily report job.', error: error.message });
    }
}));

// Endpoint for Vercel Cron to trigger monthly report
router.post('/run-monthly-report', checkCronSecret, asyncHandler(async (req, res) => {
    console.log('Received Vercel Cron request for monthly report.'.blue);
    try {
        await runMonthlyReportJobLogic();
        res.status(200).json({ message: 'Monthly report job execution initiated successfully.' });
    } catch (error) {
        console.error("Error in /run-monthly-report endpoint:".red, error);
        res.status(500).json({ message: 'Failed to execute monthly report job.', error: error.message });
    }
}));

export default router;