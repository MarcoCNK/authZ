import nodemailer from 'nodemailer'
import ENVIRONMENT from '../config/environment.js'

const transportEmail = nodemailer.createTestAccount({
    service: 'gmail',
    secure: true,
    logger: true,
    debug: true,
    secureConnection: false,
    host: "127.0.0.1",
    port: 587,
    tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
    },
    auth: {
        user: ENVIRONMENT.EMAIL_USER,
        pass: ENVIRONMENT.EMAIL_PASSWORD
    }
})

export default transportEmail   