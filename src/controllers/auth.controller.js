import Joi from 'joi'
import ResponseBuilder from '../helpers/validation.helpers.js'
import User from '../models/user.models.js'


export const registerController = async (req, res) => {
    try {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })
    const { error, value } = schema.validate(req.body)

    const user = new User({name: value.name,
         email: value.email,
         password: value.password,
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
