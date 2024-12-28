import nodemailer from 'nodemailer'
const transportEmail = nodemailer.createTestAccount({
    service: 'gmial',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: ENVIROMENT.EMAIL_USER,
        pass: ENVIROMENT.EMAIL_PASSWORD
    }
})

export default transportEmail