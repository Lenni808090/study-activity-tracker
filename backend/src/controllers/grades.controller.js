import User from "../models/user.model.js"

export const saveWrittenGrade = async (req, res) => {
    try {
        const user = req.user;
        const { subjectId, grade } = req.body;

        if (!grade || !subjectId) {
            return res.status(400).json({ message: "Grade and subject ID are required" });
        }

        // Add grade validation
        if (grade < 1 || grade > 6) {
            return res.status(400).json({ message: "Grade must be between 1 and 6" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { 
                "_id": user._id,
                "subjects._id": subjectId 
            },
            {
                "$push": {
                    "subjects.$.grades.written": {
                        value: grade,
                        date: new Date()
                    }
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User or subject not found" });
        }


        res.status(200).json({ 
            message: "Written grade saved successfully",
        });

    } catch (error) {
        console.error("Error saving written grade:", error);
        res.status(500).json({ 
            message: "Error saving written grade",
            error: error.message 
        });
    }
}

export const saveSpokenGrade = async (req,res) => {

    try {
        const user = req.user;
        const { subjectId, grade } = req.body;

        if (!grade || !subjectId) {
            return res.status(400).json({ message: "Grade and subject ID are required" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { 
                "_id": user._id,
                "subjects._id": subjectId 
            },
            {
                "$push": {
                    "subjects.$.grades.spoken": {
                        value: grade,
                    }
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User or subject not found" });
        }

        res.status(200).json({ 
            message: "Spoken grade saved successfully",
        });

    } catch (error) {
        console.error("Error saving spoken grade:", error);
        res.status(500).json({ 
            message: "Error saving spoken grade",
            error: error.message 
        });
    }

}

export const getGrades = async (req,res) => {
    try {
        const userId = req.user._id;
        const { subjectId } = req.body;

        if (!subjectId) {
            return res.status(400).json({ message: "Subject ID are required" });
        }

        const user = await User.findById(userId);	

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const selectedSubject = user.subjects.find(
            subject => subject._id.toString() === subjectId
        );

        const resGrades = [];

        if (selectedSubject && selectedSubject.grades) {
            selectedSubject.grades.written.forEach(gd => {
                resGrades.push({
                    subjectId: selectedSubject._id,
                    subjectName: selectedSubject.name,
                    value: gd.value,
                    type: 'written',
                    date: gd.date
                });
            });

            selectedSubject.grades.spoken.forEach(gd => {
                resGrades.push({
                    subjectId: selectedSubject._id,
                    subjectName: selectedSubject.name,
                    value: gd.value,
                    type: 'spoken',
                    date: gd.date
                });
            });


            resGrades.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        res.status(200).json(resGrades);

    } catch (error) {
        console.error("Error getting grades:", error);
        res.status(500).json({ 
            message: "Error getting grade",
            error: error.message 
        });
    }
}