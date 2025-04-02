import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        requried: true,
    },

    password:{
        type: String,
        required: true,
        minlenght: 6,
    },



},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;

