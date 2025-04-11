import FriendRequest from "../models/friendrequest.model.js";
import User from "../models/user.model.js";

export const sendFriendRequest = async (req, res) => {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    try {
        // Check if users are already friends
        const sender = await User.findById(senderId);
        if (sender.friends.includes(receiverId)) {
            return res.status(400).json({ 
                message: "You are already friends with this user" 
            });
        }

        // Check for existing friend requests
        const pendingFriendRequest = await FriendRequest.findOne({
            $or: [
                { senderId, receiverId, status: { $ne: "rejected" } },
                { senderId: receiverId, receiverId: senderId, status: { $ne: "rejected" } },
            ],
        });

        if (pendingFriendRequest) {
            return res.status(400).json({ 
                message: "A friend request already exists between you and this user" 
            });
        }

        const newFriendRequest = await FriendRequest.create({
            senderId,
            receiverId,
            status: "pending",
        });

        // Populate sender info before sending response
        await newFriendRequest.populate("senderId", "fullName profilePic");

        res.status(201).json(newFriendRequest);
    } catch (error) {
        console.log("Error in sendFriendRequest controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const acceptFriendRequest = async (req, res) => {
  const { id: senderId } = req.params;
  const receiverId = req.user._id;

  try {
    const updatedRequest = await FriendRequest.findOneAndUpdate(
      { senderId: senderId, receiverId: receiverId, status: "pending" },
      { status: "accepted" },
      { new: true }
    ).populate("senderId", "fullName");

    if (!updatedRequest) {
      return res.status(404).json({ message: "Friend Request not Found" });
    }

    // Add Users to Friends
    await User.findByIdAndUpdate(senderId, {
      $addToSet: { friends: receiverId },
    });

    await User.findByIdAndUpdate(receiverId, {
      $addToSet: { friends: senderId },
    });

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.log("error in acceptFriendRequest Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectFriendRequest = async (req, res) => {
  const { id: senderId } = req.params;
  const receiverId = req.user._id;

  try {
    const updatedRequest = await FriendRequest.updateOne(
      { senderId: senderId, receiverId: receiverId, status: "pending" },
      { status: "rejected" },
      { new: true }
    );

    if (!updatedRequest) {
      res.status(404).json({ message: "Friend Request not Found" });
    }
  } catch (error) {
    console.log("error in rejectFriendRequest Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriendRequests = async (req, res) => {
  const myId = req.user._id;
  try {
    const friendRequests = await FriendRequest.find({
      receiverId: myId,
      status: "pending",
    }).populate("senderId", "fullName email");  // Added email field to population

    res.status(200).json(friendRequests);
  } catch (error) {
    console.log("Error in getFriendRequest controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSentFriendRequests = async (req, res) => {
  const myId = req.user._id;
  try {
    const friendRequests = await FriendRequest.find({
      senderId: myId,
      status: "pending",
    }).populate({        
      path: 'receiverId',
      select: 'fullName email' 
    });

    res.status(200).json(friendRequests);
  } catch (error) {
    console.log("Error in  getSentFriendRequest controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAddableUsers = async (req, res) => {
  try {
    const searchTerm = req.query.search || "";
    const userId = req.user._id;

    const currentUser = await User.findById(userId)

    const users = await User.find({
      $and: [
        {
          $or: [
            { fullName: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } }
          ]
        },
        { _id: { $ne: userId } },
        { _id: { $nin: currentUser.friends } }
      ]
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in searchUsers controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const user = await User.findById(userId)
      .populate({
        path: 'friends',
        select: 'fullName email' // Wählen Sie die Felder aus, die Sie benötigen
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in friends controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
