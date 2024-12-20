import express from 'express'
import statusRouter from './routes/status.route.js'
import authRouter from './routes/auth.route.js'
import mongoDB from './config/db.config.js'

const port = 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/status', statusRouter)
app.use('/api/auth', authRouter)

app.post('/', (req, res) => {
    console.log("Request of post method has the body: ",req.body)
    res.json(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on local host  http://localhost:${port}`)
})
