import { Router } from "express";
import { devLogger, prodLogger } from "../utils/logger.js";

const router = Router();

router.get("/", (req, res) => {
    let logger= process.env.ENVIROMENT === "production" ? prodLogger : devLogger;

    logger.debug('This is a debug log message');
    logger.info('This is an info log message');
    logger.warn('This is a warning log message');
    logger.error('This is an error log message');

    res.send('Logs sent to the console and log files.');
});

export default router;