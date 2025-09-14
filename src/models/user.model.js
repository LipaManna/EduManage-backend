import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    auth_id:{
        type: mongoose.Schema.Types.ObjectId,
        default: this._id
    },
    user_name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    full_name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, //Cloudnary URL
    },
    cover_image: {
        type: String, //Cloudnary URL
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refresh_token: {
        type: String,
    },
    is_active:{
        type: Boolean,
        default: false
    },
    phone:{
        type: String,
    },
    dob:{
        type: Date
    },
    gender:{
        type: String,
        enum: ['male','female','other']
    }
},
    {
        timestamps: true,
    })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    jwt.sign({
        payload: {
            _id: this._id,
            user_name: this.user_name,
            email: this.email,
        }
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
}

userSchema.methods.generateRefreshToken = function () {
    jwt.sign({
        payload: {
            _id: this._id,
        }
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_SECRET
    })
}

export const User = mongoose.model('User', userSchema)