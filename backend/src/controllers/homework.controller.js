import User from "../models/user.model.js";

export const addHomework = async (req, res) => {
    try {
        const { subjectId, text, todo } = req.body;
        const user = req.user;

        const updatedUser = await User.findOneAndUpdate(
            { 
                "_id": user._id,
                "subjects._id": subjectId 
            },
            {
                "$push": {
                    "subjects.$.homework": {
                        "text": text,
                        "todo": todo ? new Date(todo) : new Date(),
                    }
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User or subject not found" });
        }

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
    try {
        const { subjectId } = req.params;
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const selectedSubject = user.subjects.find(
            subject => subject._id.toString() === subjectId
        );

        res.status(200).json(selectedSubject ? selectedSubject.homework : []);
    } catch (error) {
        console.error("Error in Get Homework Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const getEveryHomework = async (req, res) => {
    try{
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const allHomework = [];
        
        user.subjects.forEach(subject => {
            subject.homework.forEach(hw => {
                allHomework.push({
                    subjectId: subject._id,
                    subjectName: subject.name,
                    homeworkId: hw._id,
                    text: hw.text,
                    todo: hw.todo
                });
            });
        });

        allHomework.sort((a, b) => new Date(a.todo) - new Date(b.todo));
        
        res.status(200).json(allHomework);

    } catch(error) {
        console.error("Error in Get Every Homework Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}