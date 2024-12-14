import mongoose from "mongoose";


const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/CEOA`)
        // console.log("Database connected with connection instance: ", connectionInstance)
    }
    catch(error){
        console.log("Database connection error: ", error.message)
    }
}

export default connectDB