import Joi from 'joi'
import ResponseBuilder from '../helpers/validation.helpers.js'
import User from '../models/user.models.js'
import nodemailer from 'nodemailer'
import ENVIROMENT from '../config/environment.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
        const { error, value } = schema.validate(req.body)

        const hashedPassword = await bcrypt.hash(value.password, 10, (err, hash) => {
            if (err) {
                console.log(err)
            }
            value.password = hash
        })

        jwt.sign({
            name: value.name,
        },
    
        ENVIROMENT.JWT_SECRET,
        {
            expiresIn: '1d'
        },
        (err, token) => {
            if (err) {
                console.log(err)
            }
            value.token = token
        })

        const user = new User({name: value.name,
            email: value.email,
            password: hashedPassword || value.password,
            emailVerified: false,
            verificationToken: '' })
        await user.save()


        if (error) {
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(500)
            .setMessage(`Internal server error`)
            .setPayload({
                error
            })
            .build()
            return response
        }
        
        res.json({ status: 'OK', data: value })
        const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(200)
            .setMessage(`OK`)
            .setPayload({
                value
            })
            .build()
        return response
    } catch (error) {
        console.log("The error trpped by the catch: ")
        console.log(error)
    }
}

const redirectURL = `http://localhost:${ENVIROMENT.PORT}/api/auth/verify-email`

await transportEmail({
    subject: 'Email verification',
    to: value.email,
    html: `
    <h1>Esto es un email de verificación</h1>
    <p>Para activar tu cuenta haz click en el siguiente enlace</p>
    <a href="${redirectURL}/api/auth/verify-email?token=${value.verificationToken}">Activar cuenta</a>
    `
})