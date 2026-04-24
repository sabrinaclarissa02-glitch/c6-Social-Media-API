const DmConversation = require('../../../models/dm-conversation-schema');
const DmMessage = require('../../../models/dm-message-schema');
const Settings = require('../../../models/settings-schema');
const { errorTypes, errorResponder } = require('../../../core/errors');

const userProjection = 'name username email';

const findConversationByMembers = async (userId1, userId2) => {
  try {
    return await DmConversation.findOne({ members: { $all: [userId1, userId2], $size: 2 } });
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const createConversation = async (members) => {
  try {
    return await DmConversation.create({ members, archivedBy: [] });
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const attachUnreadCounts = async (conversations, userId) => Promise.all(
  conversations.map(async (conversation) => {
    const unreadCount = await DmMessage.countDocuments({
      conversationId: conversation._id,
      receiverId: userId,
      isRead: false,
    });
    return { ...conversation, unreadCount };
  })
);

const getUserConversations = async (userId) => {
  try {
    const conversations = await DmConversation.find({ members: userId, archivedBy: { $ne: userId } })
      .populate('members', userProjection)
      .sort({ lastMessageAt: -1 })
      .lean();
    return attachUnreadCounts(conversations, userId);
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const getArchivedConversations = async (userId) => {
  try {
    const conversations = await DmConversation.find({ members: userId, archivedBy: userId })
      .populate('members', userProjection)
      .sort({ lastMessageAt: -1 })
      .lean();
    return attachUnreadCounts(conversations, userId);
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const getConversationById = async (conversationId) => {
  try {
    return await DmConversation.findById(conversationId).populate('members', userProjection);
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const createMessage = async (payload) => {
  try {
    return await DmMessage.create(payload);
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const getMessagesByConversation = async (conversationId) => {
  try {
    return await DmMessage.find({ conversationId })
      .populate('senderId', userProjection)
      .populate('receiverId', userProjection)
      .sort({ createdAt: 1 });
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const updateConversationLastMessage = async (conversationId, text) => {
  try {
    return await DmConversation.findByIdAndUpdate(
      conversationId,
      { lastMessage: text, lastMessageAt: new Date(), archivedBy: [] },
      { new: true }
    );
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const markMessagesAsRead = async (conversationId, userId) => {
  try {
    return await DmMessage.updateMany(
      { conversationId, receiverId: userId, isRead: false },
      { isRead: true, readAt: new Date() }
    );
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const getUserSettings = async (userId) => {
  try {
    return await Settings.findOne({ userId });
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const isBlockedByReceiver = async (receiverId, senderId) => {
  try {
    const settings = await Settings.findOne({ userId: receiverId, blockedUsers: senderId });
    return !!settings;
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const archiveConversation = async (conversationId, userId) => {
  try {
    return await DmConversation.findByIdAndUpdate(
      conversationId,
      { $addToSet: { archivedBy: userId } },
      { new: true }
    );
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const unarchiveConversation = async (conversationId, userId) => {
  try {
    return await DmConversation.findByIdAndUpdate(
      conversationId,
      { $pull: { archivedBy: userId } },
      { new: true }
    );
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

const searchMessages = async (userId, keyword) => {
  try {
    const conversations = await DmConversation.find({ members: userId }).select('_id');
    const conversationIds = conversations.map((item) => item._id);
    return await DmMessage.find({
      conversationId: { $in: conversationIds },
      text: { $regex: keyword, $options: 'i' },
    })
      .populate('senderId', userProjection)
      .populate('receiverId', userProjection)
      .sort({ createdAt: -1 });
  } catch (error) {
    throw errorResponder(errorTypes.DB_ERROR, error.message);
  }
};

module.exports = {
  findConversationByMembers,
  createConversation,
  getUserConversations,
  getArchivedConversations,
  getConversationById,
  createMessage,
  getMessagesByConversation,
  updateConversationLastMessage,
  markMessagesAsRead,
  getUserSettings,
  isBlockedByReceiver,
  archiveConversation,
  unarchiveConversation,
  searchMessages,
};
