import Joi from 'joi'
import ResponseBuilder from '../helpers/response.builder.js'
import User from '../models/user.models.js'
// import nodemailer from 'nodemailer'
// import transportEmail from '../helpers/email.transporter.helpers.js'
import ENVIRONMENT from '../config/environment.js'
import bcrypt from 'bcrypt'

export const registerController = async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
        const { error, value } = schema.validate(req.body)
        const hashedPassword = await bcrypt.hash(value.password, 10)
        
        const user = new User({
            name: value.name,
            email: value.email,
            password: hashedPassword,
            emailVerified: false,
            verificationToken: ''
        })
        await user.save()
        
                // jwt.sign({
                //     // name: value.name,
                // },
        
                //     ENVIRONMENT.JWT_SECRET,
                //     {
                //         expiresIn: '1d'
                //     },
                //     (err, token) => {
                //         if (err) {
                //             console.log(err)
                //         }
                //         value.token = token
                //     })

                // const redirectURL = `http://localhost:${ENVIRONMENT.PORT}/api/auth/verify-email`

                // await transportEmail.sendMail({
                //     subject: 'Email verification',
                //     to: value.email,
                //     html: `
                // <h1>Esto es un email de verificación</h1>
                // <p>Para activar tu cuenta haz click en el siguiente enlace</p>
                // `
                // })

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
        console.log("The error trpped by the catch: ", error)
        if (error.code === 11000) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setStatus(400)
                .setMessage(`Email already exists`)
                .setPayload({
                    error
                })
                .build()
            return response
        }
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
}