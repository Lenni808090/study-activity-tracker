import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
        minlength: 6,
    },

    subjects: [{
        name:{
            type: String,
            required: true
        },
        studyDuration:{
            type: Number,
            default: 0
        },
    }],

    timetable: {
        monday: [String],
        tuesday: [String],
        wednesday: [String],
        thursday: [String],
        friday: [String],
    }
},
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;

