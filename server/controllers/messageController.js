import Message from "../models/Message.js";
import User from "../models/User.js";

// get all user axcept loggedin user
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filtered = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    // count number of unseen massages
    const unseen = {};
    const promises = filtered.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });

      if (messages.length > 0) {
        unseen[user._id] = messages.length;
      }
    });

    await Promise.all(promises);

    res.json({ success: true, users: filtered, unseen });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

