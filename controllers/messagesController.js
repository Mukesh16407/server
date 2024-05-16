const Chat = require("../models/chatModal");
const Message = require("../models/messageModel");

exports.newMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    // update last message of chat
    await Chat.findOneAndUpdate(
      { _id: req.body.chat },
      {
        lastMessage: savedMessage._id,
        $inc: { unreadMessages: 1 },
      }
    );
    res.send({
      success: true,
      message: "Message sent successfully",
      data: savedMessage,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};
