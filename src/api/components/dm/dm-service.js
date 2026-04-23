const mongoose = require('mongoose');
const dmRepository = require('./dm-repository');
const { errorTypes, errorResponder } = require('../../../core/errors');

const createConversationIfNotExists = async (senderId, receiverId) => {
  let conversation = await dmRepository.findConversationByMembers(
    senderId,
    receiverId
  );

  if (!conversation) {
    conversation = await dmRepository.createConversation([senderId, receiverId]);
  }

  return conversation;
};

const getConversations = async (userId) => {
  if (!userId) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'userId is required');
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid userId');
  }

  return await dmRepository.getUserConversations(userId);
};

const getArchivedConversations = async (userId) => {
  if (!userId) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'userId is required');
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid userId');
  }

  return await dmRepository.getArchivedConversations(userId);
};

const getMessages = async (conversationId) => {
  if (!conversationId) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'conversationId is required');
  }

  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid conversationId');
  }

  const conversation = await dmRepository.getConversationById(conversationId);

  if (!conversation) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Conversation not found');
  }

  return await dmRepository.getMessagesByConversation(conversationId);
};

const sendMessage = async ({ senderId, receiverId, text }) => {
  if (!senderId || !receiverId || !text) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'senderId, receiverId, and text are required'
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(senderId) ||
    !mongoose.Types.ObjectId.isValid(receiverId)
  ) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid senderId or receiverId');
  }

  if (String(senderId) === String(receiverId)) {
    throw errorResponder(errorTypes.BAD_REQUEST, 'Cannot send DM to yourself');
  }

  if (!String(text).trim()) {
    throw errorResponder(errorTypes.VALIDATION, 'Message text cannot be empty');
  }

  const receiverSettings = await dmRepository.getUserSettings(receiverId);

  if (receiverSettings && receiverSettings.allowDmFrom === 'none') {
    throw errorResponder(
      errorTypes.FORBIDDEN,
      'This user does not accept direct messages'
    );
  }

  const isBlocked = await dmRepository.isBlockedByReceiver(receiverId, senderId);

  if (isBlocked) {
    throw errorResponder(
      errorTypes.FORBIDDEN,
      'You cannot send message to this user because you are blocked'
    );
  }

  const conversation = await createConversationIfNotExists(senderId, receiverId);
  const cleanText = String(text).trim();

  const message = await dmRepository.createMessage({
    conversationId: conversation._id,
    senderId,
    receiverId,
    text: cleanText,
  });

  await dmRepository.updateConversationLastMessage(conversation._id, cleanText);

  return message;
};

const markAsRead = async ({ conversationId, userId }) => {
  if (!conversationId || !userId) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'conversationId and userId are required'
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(conversationId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid conversationId or userId');
  }

  const conversation = await dmRepository.getConversationById(conversationId);

  if (!conversation) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Conversation not found');
  }

  return await dmRepository.markMessagesAsRead(conversationId, userId);
};

const archiveConversation = async ({ conversationId, userId }) => {
  if (!conversationId || !userId) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'conversationId and userId are required'
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(conversationId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid conversationId or userId');
  }

  const conversation = await dmRepository.getConversationById(conversationId);

  if (!conversation) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Conversation not found');
  }

  return await dmRepository.archiveConversation(conversationId, userId);
};

const unarchiveConversation = async ({ conversationId, userId }) => {
  if (!conversationId || !userId) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'conversationId and userId are required'
    );
  }

  if (
    !mongoose.Types.ObjectId.isValid(conversationId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid conversationId or userId');
  }

  const conversation = await dmRepository.getConversationById(conversationId);

  if (!conversation) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Conversation not found');
  }

  return await dmRepository.unarchiveConversation(conversationId, userId);
};

const searchMessages = async (userId, keyword) => {
  if (!userId || !keyword) {
    throw errorResponder(
      errorTypes.BAD_REQUEST,
      'userId and keyword are required'
    );
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw errorResponder(errorTypes.VALIDATION, 'Invalid userId');
  }

  return await dmRepository.searchMessages(userId, keyword);
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