const dmService = require('./dm-service');

const getConversations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await dmService.getConversations(userId);

    res.status(200).json({
      status: 'success',
      message: 'Conversations fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getArchivedConversations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = await dmService.getArchivedConversations(userId);

    res.status(200).json({
      status: 'success',
      message: 'Archived conversations fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const data = await dmService.getMessages(conversationId);

    res.status(200).json({
      status: 'success',
      message: 'Messages fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { senderId, receiverId, text } = req.body;

    const data = await dmService.sendMessage({
      senderId,
      receiverId,
      text,
    });

    res.status(201).json({
      status: 'success',
      message: 'Message sent successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const { conversationId, userId } = req.body;

    const data = await dmService.markAsRead({
      conversationId,
      userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'Messages marked as read',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const archiveConversation = async (req, res, next) => {
  try {
    const { conversationId, userId } = req.body;

    const data = await dmService.archiveConversation({
      conversationId,
      userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'Conversation archived successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const unarchiveConversation = async (req, res, next) => {
  try {
    const { conversationId, userId } = req.body;

    const data = await dmService.unarchiveConversation({
      conversationId,
      userId,
    });

    res.status(200).json({
      status: 'success',
      message: 'Conversation unarchived successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const searchMessages = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { keyword } = req.query;

    const data = await dmService.searchMessages(userId, keyword);

    res.status(200).json({
      status: 'success',
      message: 'Messages search fetched successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConversations,
  getArchivedConversations,
  getMessages,
  sendMessage,
  markAsRead,
  archiveConversation,
  unarchiveConversation,
  searchMessages,
};