import User from "../models/user.model.js";


export const saveTimetable = async (req, res) => {
    try {
        const userId = req.user._id;
        const { timetable } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            {_id: userId },
            { timetable },
            {new: true}
        );

        res.status(200).json(updatedUser.timetable);
    } catch (error) {
        console.error("Error in save Timetable Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });      
    }
};

export const getTimetable = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if(!user.timetable){
            user.timetable = {
                monday: Array(6).fill(""),
                tuesday: Array(6).fill(""),
                wednesday: Array(6).fill(""),
                thursday: Array(6).fill(""),
                friday: Array(6).fill("")
            };

            await user.save();
        }

        res.status(200).json(user.timetable);


    } catch (error) {
        console.error("Error in get Timetable Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });  
    }
};  