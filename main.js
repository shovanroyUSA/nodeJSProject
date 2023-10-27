import https from 'https'
import fs from 'fs'
import * as dotenv from 'dotenv'
import express from 'express'
import {orderDetails} from './routes/tracking.js'

const port = 7000
const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

const app = express()
dotenv.config()
const server = https.createServer(httpsOptions, app) 

app.use(express.json())
app.use('/',orderDetails)

server.listen(port, (error)=> {
if(error){
    console.log('error')
}
else{
    console.log('HTTPS Server is listening at port: ',port)
}
}
)


