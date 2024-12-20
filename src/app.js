import express from 'express'
import cors from "cors";
import cookieParser from 'cookie-parser';
import multer from 'multer';
const app = express()

// this is to configure the incoming JSON to the server 
// we also used the options to set a limit to the amount of JSON
app.use(express.json({
    limit:"16kb"
}))

// the app.use is genreally used to connect the middle wares

// the cross origin resource sharing package
// the cors package can take in some options too in form of an object
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true
}))

// to get the data through the url we have configured using the url encoded meathod
// the extended option just means that we can use nested objects and the limit again is set
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

// using this we create and define a place (basically a folder) to keep our public assets and files etc
app.use(express.static("public"))

// cookie parser middle ware to add .cookies to our request in which we can access the cookies in a users browser
app.use(cookieParser())

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Configure Multer



app.get('/', (req, res)=>{
    res.send("hello")
})

import authRouter from '../src/routes/auth.route.js'
// import courseRouter from '../src/routes/course.route.js'
import programRouter from '../src/routes/program.route.js'
import bodyParser from 'body-parser';
// import multer from 'multer';
app.use('/auth', authRouter )
// app.use('/course', courseRouter )
app.use('/program', programRouter )

export {app}