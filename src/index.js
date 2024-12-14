import { app } from "./app.js";
import connectDB from "./database/database.js";

import 'dotenv/config'

connectDB().then(()=>{
    console.log("Database connected successfully")
    app.listen(process.env.PORT || 8000, ()=>{
        console.log("Listening on port ", process.env.PORT || 8000)
    })
})
.catch((err)=>{
    console.log("Error in connecting Database", err.message)
})