import winston from "winston";

export const devLogger = winston.createLogger({
    transports: [
    new winston.transports.Console({
        level: "debug",
    }),
    ],
});

export const prodLogger = winston.createLogger({
    transports: [
    new winston.transports.Console({
        level: "info",
    }),
    new winston.transports.File({
        filename: "./erros.log",
        level: "error",
    }),
    ],
});

export const addLogger = (req, res, next) => {
    req.logger = process.env.ENVIROMENT === "production" ? devLogger : prodLogger;
    console.log(req.logger);
    let { body } = req;
    let bodyData = { ...body };
    console.log(bodyData);

    if (req.method === "POST" || req.method === "PUT") {
    bodyData = JSON.stringify(bodyData);
    } else {
    bodyData = "";
    }

    req.logger.http(
    `ruta:${req.method} ${
        req.url
    } - ${new Date().toLocaleTimeString()} - data:${bodyData}`
    );
    next();
};