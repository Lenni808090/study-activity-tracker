import User from "../models/user.model.js";

export const addHomework = async (req, res) => {
    try {

        const { subjectId, text, todo } = req.body;
        const user = req.user

        const updatedUser = await User.findByIdAndUpdate(
            {
                "_id" : user._id,
                "subjects._id": subjectId,
            },
            {
                "$push": {
                    "subjects.$.homework": {
                        "text": text,
                        "todo": todo ? new Date(todo) : new Date(),
                    }
                }
            },
            {new: true}
        );

        const updatedSubject = updatedUser.subjects.find(
            subject => subject._id.toString() === subjectId
        );

        res.status(200).json(updatedSubject ? updatedSubject.homework : []);
    } catch (error) {
        console.error("Error in Add Homework Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

}

export const getHomework = async (req, res) => {
    
    try{
        const { subjectId } = req.query;
        const userId = req.user._id

        const user = await User.findById(userId);

        const selectedSubject = user.subjects.find(
            subject => subject._id.toString() === subjectId
        );

        res.status(200).json(user.selectedSubject.homework);

    }catch (error){
        console.error("Error in Get Homework Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }

}