import dotenv from 'dotenv'

// EXECUTE THIS SHIT
// node ./src/config/environment.js
dotenv.config()

process.env.EMAIL_PASSWORD

const ENVIROMENT = {
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',
    EMAIL_USER: process.env.EMAIL_USER || '',
}

export default ENVIROMENT

// npm install nodemailer
// npm install dotenv
// npm install jsonwebtoken