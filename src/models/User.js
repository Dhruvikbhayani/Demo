import mongoose, { now } from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })


const User = mongoose.model('User', userSchema)
export default User