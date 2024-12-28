import dotenv from 'dotenv'

// EXECUTE THIS SHIT
// node ./src/config/environment.js
dotenv.config()

process.env.EMAIL_PASSWORD

console.log(process.env.EMAIL_PASSWORD)

const ENVIRONMENT = {
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',
    EMAIL_USER: process.env.EMAIL_USER || '',
}

export default ENVIRONMENT

// npm install nodemailer
// npm install dotenv
// npm install jsonwebtoken