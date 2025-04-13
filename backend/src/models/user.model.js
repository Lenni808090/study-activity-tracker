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

        color: { 
            type: String, 
            default: '#' + Math.floor(Math.random()*16777215).toString(16) 
        },

        studyDuration:{
            type: Number,
            default: 0
        },
        homework:[{
            text:{
                type: String,
                required: true,
            },
            todo:{
                type: Date,
                default: Date.now
            },
        }],

        grades: {
            written: [{
                value: {
                    type: Number,
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }],
            spoken: [{
                value: {
                    type: Number,
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }]
        },
    }],

    friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],

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

