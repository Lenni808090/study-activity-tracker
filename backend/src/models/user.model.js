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

    sbjects: [{
        name:{
            type: String,
            required: true
        },
        studyDuration:{
            type: Number,
            default: 0
        },
    }]

},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;

