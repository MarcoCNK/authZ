import mongoDB from 'mongoose'
import User from '../models/user.models.js'

const MONGO_URL = 'mongodb://localhost:27017'

mongoDB.connect(MONGO_URL, {})
.then (() => {
    console.log('Database connected')
    new User({name: 'Diego', email: 'b0lXJ@example.com', password: '123456', emailVerified: true, verificationToken: '' }).save()
})
.catch((err) => {
    console.log(err)
})

export default mongoDB