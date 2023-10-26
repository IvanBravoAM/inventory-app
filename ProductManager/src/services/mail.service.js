import mailer from "nodemailer";
import config from "../config/config.js";

    export const transporter = mailer.createTransport({
        host: process.env.MAILING_SERVICE,
        port: 2525,
        auth: {
            user:process.env.MAILING_USER,
            pass: process.env.MAILING_PASSWORD,
        },
    });


      export default { transporter}
