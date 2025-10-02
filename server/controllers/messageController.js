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

// get all messages for selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const loggedinUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        // messages of two users
        { senderId: loggedinUserId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: loggedinUserId },
      ],
    });

    await Message.updateMany(
      {
        senderId: selectedUserId,
        receiverId: loggedinUserId,
      },
      { seen: true } // for message seen status
    );

    res.json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// mark message as seen
export const markMessageSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });

    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// send message to selected user
