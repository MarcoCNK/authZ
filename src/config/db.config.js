import mongoDB from 'mongoose'

const MONGO_URL = 'mongodb://localhost:27017'

mongoDB.connect(MONGO_URL, {})
.then (() => {
    console.log('Database connected')
})
.catch((err) => {
    console.log(err)
})

export default mongoDB