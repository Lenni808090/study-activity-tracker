import User from "../models/user.model.js";


export const createSubject = async (req,res) => {
    const { name, color } = req.body;

    try {
        const existingSubject = await User.findOne({
            "_id": req.user._id,
            "subjects.name": name
        });

        if (existingSubject) {
            return res.status(400).json({
                message: "Subject already exists"
            });
        }

        const updateUser = await User.findOneAndUpdate(
            {"_id": req.user._id},
            {
                "$push": {
                    "subjects": {
                        "name": name,
                        "studyDuration": 0,
                        "color": color
                    }
                }
            },
            {new: true}
        )

        res.status(200).json({
            message: "Subject created successfully",
            subjects: updateUser.subjects
        });

    } catch (error) {
        console.error("Error in Create Subject Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const deleteSubject = async (req,res) => {
    const { subjectId } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { "_id": req.user._id },
            {
                "$pull": {
                    "subjects": { "_id": subjectId }
                }
            },
            { new: true }
        );

        if(!updatedUser) {
            return res.status(404).json({
                message: "User or Subject not found"
            });
        }

        res.status(200).json({
            message: "Subject deleted successfully",
            subjects: updatedUser.subjects,
        });

    } catch (error) {
        console.error("Error in Delete Subject Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


export const getSubjects = async (req,res) => {

    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(400).json({
                message: "No User found"
            });
        }

        const subjects = user.subjects;

        res.status(200).json({message: "Subjects successfully fetched", subjects: subjects})

    }catch (error) {
        console.error("Error in Get Subjects Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const updateStudyDuration = async (req,res) => {
    const { subjectId, duration } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            {
                "_id": req.user._id,
                "subjects._id": subjectId,
            },
            {
                "$inc" : {
                    "subjects.$.studyDuration": parseInt(duration)
                }
            },
            {new: true}
        );

        if(!updatedUser){
            return res.status(404).json({
                message: "User or Subject not found"
            });
        }

        res.status(200).json({
            message: "Study Duration successfully updated",
            subjects: updatedUser.subjects
        });

    } catch (error) {
        console.error("Error in Update Study Duration Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const editSubject = async (req, res) => {
    const { name, color, subjectId } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            {
                "_id": req.user._id,
                "subjects._id": subjectId
            },
            {
                "$set": {
                    "subjects.$.name": name,
                    "subjects.$.color": color
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User or Subject not found"
            });
        }

        res.status(200).json({
            message: "Subject updated successfully",
            subjects: updatedUser.subjects
        });

    } catch (error) {
        console.error("Error in Edit Subject Controller:", error.message);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};