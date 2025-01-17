import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema({
    fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
    },
    admin: {
        type: Boolean, 
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true

    },
    password: {
        // becrypt encrypted
        type: String,
        required: [true, "password is required"]

    },
    refreshToken: {
        type: String
    }
},
{
    timestamps:true
}
)

userSchema.pre("save", async function (next) {
    // if password is modifed then return 
    if(!this.isModified("password")) return next();
    // if not then encrypt it using bcrypt
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken =  function(){
    
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)


