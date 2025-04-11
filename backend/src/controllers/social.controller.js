import User from "../models/user.model.js";

export const getSubjectsofUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('fullName subjects');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      fullName: user.fullName,
      subjects: user.subjects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};